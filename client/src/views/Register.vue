<template>
    <div class="container rounded shadow customContainer">
    <div class="row">
      <div class="col py-4 d-flex flex-column align-items-between" style="height: 80vh;">
        <div class="my-auto">
          <h1 class="text-center">Register</h1>
          <p class="text-center">Welcome to Turboly Task Manager</p>
        </div>
        <form action="" class="my-auto mx-auto d-flex flex-column" style="width: 40vh;">
          <input class="form-control mb-3 customInput" type="text" placeholder="Email" v-model="user.email">
          <input class="form-control mb-3 customInput" type="password" placeholder="Password" v-model="user.password">
          <input class="form-control mb-3 customInput" type="password" placeholder="Confirm Password" v-model="user.confirmPassword">
          <p class="text-center text-danger">{{ errors }}</p>
          <button type="button" class="btn btn-primary" @click="handleRegister">Register</button>
        </form>
        <div class="my-auto mx-auto pt-5 d-flex">
            <p>Have account?</p>
            <router-link to="/" class="router-link"><p class="ps-1">Login</p></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      user: {
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    errors () {
      return this.$store.state.errors
    }
  },
  methods: {
    async handleRegister () {
      try {
        if (this.user.password !== this.user.confirmPassword) {
          this.$store.commit('setErrors', 'Password do not match')
        } else {
          await this.$store.dispatch('registerAction', this.user)
          this.$router.push('/')
        }

      } catch (err) {
        console.log(err, 'err handleRegister')
      }
    }
  }
};
</script>

<style>

</style>