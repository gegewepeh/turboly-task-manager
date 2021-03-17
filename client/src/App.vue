<template>
  <div id="app">
    <div class="container-fluid customNavbar py-2">
      <div class="row">
        <div class="col-8 d-flex justify-content-start">
          <h4 class="text-white">Turboly Task Manager</h4>
        </div>
        <div class="col d-flex justify-content-end">
          <button type="button" class="btn btn-danger" @click="handleLogout" v-if="isLoggedIn">Logout</button>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    }
  },
  methods: {
    handleLogout () {
      localStorage.clear()
      this.$store.commit('setIsLoggedIn', false)
      this.$router.push('/login')
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$store.commit('setIsLoggedIn', true)
    } else {
      this.$store.commit('setIsLoggedIn', false)
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  word-wrap: break-word;
}

body {
  background-color: rgb(240, 240, 240);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.customNavbar {
  background-color: #000D25;
}

.customContainer {
  margin-top: 3%;
  height: 80vh;
  width: 95%;
  background-color: whitesmoke;
}

.customInput {
  height: 45px;
}

.dueToday {
  background-color: red;
}

.dueThisWeek {
  background-color: yellow;
}

.dueNextWeek {
  background-color: green;
}

.overdue {
   background-color: black;
}


@media screen and (min-width: 1280px) {
  .customCard {
    height: 50vh;
    overflow: auto;
  }
  .customAddTask {
    padding: 1em 2em;
    margin-top: 1em;
    margin-right: 2em;
  }
  .customWidth {
    max-width: 80%;
  }
    .customDelete {
    margin-left: 2em;
    margin-right: 1em;
  }
}

@media screen and (min-width: 1440px) {
  .customCard {
    height: 55vh;
    overflow: auto;
  }
  .customAddTask {
    padding: 1em 2em;
    margin-top: 1em;
    margin-right: 2em;
  }
  .customWidth {
    max-width: 80%;
  }
  .customDelete {
    margin-left: 2em;
  }
}

@media screen and (max-width: 1279px) {
  .customCard {
    height: 55vh;
    overflow: auto;
  }
  .customWidth {
    max-width: 35%;
  }
}

@media screen and (max-width: 360px) {
  .customCard {
    height: 47vh;
    overflow: auto;
  }
  .customWidth {
    max-width: 25%;
  }
}

.router-link {
  text-decoration: none;
}

</style>
