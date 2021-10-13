<template>
  <img alt="Vue logo" class="logo" src="https://freelancehunt.com/static/images/logo/freelancehunt-ru.svg?v3">

  <div id="nav">
    <router-link to="/">Список проектов</router-link>
    |
    <router-link to="/help">Помощь</router-link>
  </div>

  <div class="">
    <p>Введите API-токен</p>
    <input type="text" class="token input" v-model="apiToken">
  </div>


  <router-view />
</template>

<script>
export default {
  computed: {
    apiToken: {
      get() {
        return this.$store.state.apiToken;
      },
      set(newValue) {
        this.$store.dispatch('updateApiToken', newValue);
      }
    }
  },
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #F8B306FF;
    }
  }
}

/*
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
*/
a {
  color: #F8B306FF;
  font-weight: bold;
}

.logo {
  margin: 40px auto 20px;
  height: 80px;
  max-width: 500px;
}

.input {
  max-width: 95%;
  width: 400px;
  height: 32px;
  border: 1px solid #ccc;
  border-radius: 0;
  padding: 0 10px;
  margin-bottom: 60px;
}
</style>

