import { createStore } from 'vuex'
import ApiService from "../lib/ApiService";

export default createStore({
  state: {
    // todo: доработать хранение токена
    //       (он не должен быть зашит во фронтенде, присутствует только для удобства демонстрации)
    apiToken: '3d7a8aee3acdf26b92770754c3b2780606cdd157',
    // todo: выделить работу с проектами в отдельный модуль
    projectsList: [],
    projectsOriginalList: [],
    projectsLinks: [],
  },
  mutations: {
    updateApiToken(state, newValue) {
      // todo: доработать сохранение токена
      state.apiToken = newValue;
    },
    updateProjectsList(state, newValue) {
      state.projectsList = newValue;
    },
    updateProjectsOriginalList(state, newValue) {
      state.projectsOriginalList = newValue;
    },
    updateProjectsLinks(state, newValue) {
      state.projectsLinks = newValue;
    }
  },
  getters: {
    apiService(state) {
      return state.apiToken
        ? new ApiService(state.apiToken)
        : null;
    },
    areProjectsFiltered(state) {
      return state.projectsList !== state.projectsOriginalList;
    }
  },
  actions: {
    updateApiToken({ commit, dispatch }, newValue) {
      commit('updateApiToken', newValue);
      dispatch('loadProjectsList');
    },
    loadProjectsList({ state, commit, getters }, url = null) {
      if (!state.apiToken || !getters.apiService) return;

      getters
        .apiService
        .loadProjectsList(url)
        // todo: обрабатывать ошибки ответа
        .then(({ projects, links }) => {
          commit('updateProjectsList', projects);
          commit('updateProjectsOriginalList', projects);
          commit('updateProjectsLinks', links);
        });
    },
    searchProjects({ state, commit }, query) {
      let filteredProjects = [];

      if (query) {
        filteredProjects =
          state.projectsOriginalList
            ? state.projectsOriginalList.filter((project) => {
              const regExp = new RegExp(query, 'iug');

              console.log(project, project.name.match(regExp));

              return project.name.match(regExp) || project.descriptionHtml.match(regExp);
            })
            : [];
      } else {
        filteredProjects = state.projectsOriginalList;
      }

      commit('updateProjectsList', filteredProjects);
    },
    filterProjectsByMinPrice({ state, commit }, { minPrice, priceCurrency }) {
      let filteredProjects = [];

      console.log({ minPrice, priceCurrency });

      if (minPrice) {
        filteredProjects =
          state.projectsOriginalList
            ? state.projectsOriginalList.filter((project) => {
              console.log(project.budget, minPrice, priceCurrency);

              return project.budget
                && project.budget.currency === priceCurrency
                && project.budget.amount <= minPrice;
            })
            : [];
      } else {
        filteredProjects = state.projectsOriginalList;
      }

      commit('updateProjectsList', filteredProjects);
    }
  },
  modules: {}
})
