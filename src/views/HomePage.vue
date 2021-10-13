<template>
  <div class="home">
    <projects-list />
  </div>
</template>

<script>
import ProjectsList from "../components/ProjectsList.vue";

export default {
  name: 'HomePage',
  components: {
    ProjectsList
  }
}
</script>
