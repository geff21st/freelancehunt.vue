<template>
  <!--suppress JSUnresolvedVariable -->
  <div class="project-nav-pager" v-if="projectsLinks && !areProjectsFiltered">
    <a :href="projectsLinks.prev" v-if="projectsLinks.prev" @click="loadNewItems">Пред.</a>
    <a :href="projectsLinks.next" v-if="projectsLinks.next" @click="loadNewItems">След.</a>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: 'ProjectsListPager',
  data() {
    return {};
  },
  computed: {
    ...mapState(['projectsLinks']),
    ...mapGetters(['areProjectsFiltered']),
  },
  methods: {
    ...mapActions(['loadProjectsList']),
    loadNewItems($event) {
      $event.preventDefault();

      this.loadProjectsList($event.target.href);
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
.project-nav-pager {
  //margin-top: 50px;
  padding: 30px;

  a + a {
    margin-left: 20px;
  }
}
</style>
