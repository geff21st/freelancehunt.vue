<template>
  <div class="project-item" v-if="project && project.id">
    <h1>{{ project.name }}</h1>

    <p class="date" v-text="project.publishedAt" />

    <div class="description" v-html="project.descriptionHtml" />


    <p class="links"><a :href="project.url" class="link">Ссылка на проект на Freelancehunt ></a></p>
    <p>
      <router-link class="link"
                   :to="{name: 'Home'}"
      >Список проектов ></router-link>
    </p>
  </div>

  <div class="project-item" v-else>
    <p>Загрузка проекта...</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'ProjectItem',
  data() {
    return {
      project: {}
    };
  },
  computed: {
    ...mapGetters(['apiService'])
  },
  methods: {
    loadProjectItem(id) {
      console.log({ id });

      this.apiService &&
      this
        .apiService
        .loadProjectItem(id)
        .then(({ project }) => {
          console.log({ project });

          this.project = project;
        });
    }
  },
  mounted() {
    const id = this.$route.params.id;
    if (id) {
      this.loadProjectItem(id);
    }
  }
}
</script>

<style scoped lang="scss">
.project-item {
  cursor: pointer;
  width: 800px;
  max-width: 100%;
  text-align: left;
  padding: 20px 50px;
  border: 1px solid #ccc;
  margin: auto;

  h1 {
    font-size: 22px;
  }

  .date {
    text-align: right;
  }

  .description {
    margin-top: 50px;
  }

  .links {
    margin-top: 40px;
  }

  .link {
    display: block;
    margin-top: 10px;
  }
}
</style>
