import axios from "axios";

const PROJECTS_LIST_URL = 'https://api.freelancehunt.com/v2/projects';

export default class ApiService {
  apiToken;

  constructor(apiToken) {
    this.apiToken = apiToken;
  }

  sendApiGetRequest({ url }) {
    return axios.get(
      url,
      { headers: { Authorization: 'Bearer ' + this.apiToken } }
    );
  }

  /**
   * Делает запрос к серверу, чтобы получить список проектов,
   * формирует на выходе массив с выбранными ключами объекта
   *
   * @returns {Promise<unknown>}
   */
  loadProjectsList(url) {
    return new Promise((resolve, reject) => {
      this.sendApiGetRequest({ url: url || PROJECTS_LIST_URL })
        .catch(reject)
        .then(
          ({ data = null }) => {
            console.log({ data });

            const projects = [];

            if (!data) reject();

            const responseProjects = data.data || null;
            if (!responseProjects || responseProjects.length <= 0) reject();

            console.log({ responseProjects });

            responseProjects.forEach((project) => {
              // console.log({ project });
              projects.push(this.formatProjectsListItem(project));
            });

            resolve({ projects, links: data.links || null });
          });
    });
  }

  /**
   * Делает запрос к серверу, чтобы получить проект,
   * формирует на выходе массив с выбранными ключами объекта
   *
   * @returns {Promise<unknown>}
   */
  loadProjectItem(id) {
    return new Promise((resolve, reject) => {
      this.sendApiGetRequest({
        url: `${PROJECTS_LIST_URL}/${id}`,
      })
        .catch(reject)
        .then(({ data = null }) => {
          console.log('123');
          resolve(
            {
              project: this.formatProjectsListItem(data.data || null)
            }
          );
        });
    });
  }

  // Конвертирует входящий по API объект в объект с выбранными свойствами.
  // Список свойств можно расширить, если будет необходимо.
  formatProjectsListItem(project) {
    return (
      (
        {
          name = '',
          skills = '',
          budget = null,
          description_html = null,
          published_at = null,
        }
      ) => {
        let formattedAmount = '';

        if (budget && budget.amount > 0) {
          formattedAmount = budget.amount.toLocaleString('ru');

          // todo: доработать форматирование цен
          switch (budget.currency) {
            case "RUB":
              formattedAmount += " ₽";
              break;
            case "UAH":
              formattedAmount += " ₴";
              break;
          }
        }

        let url = null;
        if (project.links && project.links.self && project.links.self.web) {
          url = project.links.self.web;
        }

        return {
          id: project.id,
          descriptionHtml: description_html,
          publishedAt: published_at,
          url,
          name,
          skills,
          budget,
          formattedAmount
        };
      }
    )(project.attributes || {});
  }
}
