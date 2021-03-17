<template> 
  <div class="container rounded shadow customContainer">
    <div class="row">
      <div class="col py-4 d-flex flex-column align-items-between" style="height: 80vh;">
        <div class="my-auto">
          <h1 class="text-center">Login</h1>
          <p class="text-center">Welcome to Turboly Task Manager</p>
        </div>
        <form action="" class="my-auto mx-auto d-flex flex-column" style="width: 40vh;">
            <input class="form-control mb-3 customInput" type="text" placeholder="Email" required v-model="user.email">
            <input class="form-control mb-3 customInput" type="password" placeholder="Password" required v-model="user.password">
            <button type="button" class="btn btn-primary" @click="handleLogin">Login</button>
        </form>
        <div class="my-auto mx-auto pt-5 d-flex">
            <p>New user?</p>
            <router-link to="/register" class="router-link"><p class="ps-1">Create Account</p></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      errors: null
    }
  },
  methods: {
    async handleLogin () {
      try {
        await this.$store.dispatch('loginAction', this.user)
        this.$router.push('/')

      } catch (err) {
        console.log(err, 'err handleLogin')
      }
    }
  }
};
</script>

<style></style>
