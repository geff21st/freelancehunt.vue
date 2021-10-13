<template>
  <div class="project-page">
    <project-item />
  </div>
</template>

<script>
import ProjectItem from "../components/ProjectItem.vue";

export default {
  name: 'ProjectPage',
  components: {
    ProjectItem
  }
}
</script>
