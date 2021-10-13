<template>
  <div class="hello">
    <h3>Список проектов</h3>

    <projects-list-filter />

    <!--suppress JSUnresolvedVariable -->
    <div class="projects-list" v-if="projectsList && projectsList.length">
      <projects-list-pager />

      <ul>
        <!--suppress JSUnresolvedVariable -->
        <li v-for="(project, i) in projectsList"
            :key="i"
            class="projects-item"
            @click="openProject(project)"
        >
          <p>
            <strong v-text="project.name" />
          </p>
          <p>
            <span v-if="project.formattedAmount">
              Бюджет: <strong>{{ project.formattedAmount }}</strong>
            </span>
          </p>
          <p v-if="project.skills">
            Необходимые навыки:
            <strong v-for="(skill, j) in project.skills" :key="j" v-html="'<br>&mdash; ' + skill.name" />
          </p>
        </li>
      </ul>

      <projects-list-pager />
    </div>

    <div class="projects-list projects-list--loading" v-else>
      Загрузка списка проектов <span>...</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import router from "../router";
import ProjectsListPager from "./ProjectsListPager"
import ProjectsListFilter from "./ProjectsListFilter";

export default {
  name: 'ProjectsList',
  components: {
    ProjectsListFilter,
    ProjectsListPager,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(['loadProjectsList']),
    openProject({ id }) {
      router.push({ name: 'ProjectPage', params: { id } })
    }
  },
  computed: {
    ...mapState(['projectsList'])
  },
  mounted() {
    this.loadProjectsList();
  }
}
</script>

<style scoped lang="scss">
.projects-list {
  text-align: left;
}

.projects-item {
  cursor: pointer;

  + & {
    margin-top: 30px;
  }

  &:hover {
    background-color: rgba(blue, .2);
  }
}
</style>
