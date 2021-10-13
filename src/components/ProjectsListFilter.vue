<template>
  <div class="projects-filter">
    <label>
      <span>Поиск по тексту в названии или описании проекта</span>
      <input class="input" type="text" v-model="query">
    </label>

    <label>
      <span>Поиск минимальному бюджету</span>
      <span class="input input-row">
        <input type="number" v-model="minPrice">
        <select v-model="priceCurrency">
          <option value="RUB">Рубль</option>
          <option value="UAH">Гривна</option>
        </select>
      </span>
    </label>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'ProjectsListFilter',
  data() {
    return {
      query: '',
      minPrice: '',
      priceCurrency: 'RUB',
    };
  },
  computed: {},
  methods: {
    ...mapActions(['searchProjects', 'filterProjectsByMinPrice'])
  },
  mounted() {
  },
  watch: {
    query(newValue) {
      // todo: добавить троттлинг
      this.searchProjects(newValue);
    },
    minPrice(newValue) {
      // todo: добавить троттлинг
      this.filterProjectsByMinPrice(
        {
          minPrice: newValue,
          priceCurrency: this.priceCurrency
        });
    }
  }
}
</script>

<style scoped lang="scss">
.projects-filter {
  label {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: 30px 0 30px auto;
    padding-right: 100px;

    span {
      display: block;
    }

    .input {
      //width: 400px;
      margin-top: 10px;
      margin-bottom: 0;
      margin-right: 0;
      width: 100%;
      display: flex;
      flex-grow: 1;
      max-width: unset;
    }

    .input-row {
      input {
        border: 1px solid transparent;
        height: 30px;
        padding: 0;
        width: 60%;
      }

      select {
        width: 40%;
        height: 30px;
        padding: 0 10px;
        border: 1px solid transparent;
        border-left-color: #ccc;
      }
    }
  }
}
</style>
