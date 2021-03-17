import Vue from "vue"
import Vuex from "vuex"
import router from '../router/index'
import taskManagerAPI from '../api/taskManager'
import Swal from 'sweetalert2'

Vue.use(Vuex);

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    user: '',
    tasks: [],
    errors: null
  },
  mutations: {
    setIsLoggedIn (state, payload) {
      state.isLoggedIn = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    setTasks (state, payload) {
      state.tasks = payload
    },
    setErrors (state, payload) {
      state.errors = payload
    },
    addTaskMutation (state, payload) {
      state.tasks.push(payload)
    },
    patchTaskMutation (state, payload) {
      state.tasks = payload
    }
  },
  actions: {
    async loginAction (context, payload) {
      try {
        Swal.fire({
          title: 'Logging In'
        })
        Swal.showLoading()

        const userData = {
          email: payload.email,
          password: payload.password
        }

        const { data } = await taskManagerAPI.post('/login', userData)
        context.commit('setUser', userData.email)
        context.commit('setIsLoggedIn', true)
        localStorage.setItem("access_token", data.access_token)

        Swal.close()
        Swal.fire(
          'Login Success!',
          `Logged in as ${this.state.user}!`,
          'success'
        )
        return

      } catch (err) {
        Swal.close()
        console.log(err.response, "err loginAction")
        context.commit('setErrors', err.response.data.messages)
      }
    },
    async registerAction (context, payload) { 
      try {
        Swal.fire({
          title: 'Logging In'
        })
        Swal.showLoading()

        const userData = {
          email: payload.email,
          password: payload.password
        }
        await taskManagerAPI.post('/register', userData)
        await context.dispatch('loginAction', userData)

        Swal.close()
        Swal.fire(
          'Login Success!',
          `Logged in as ${this.state.user}!`,
          'success'
        )
        return

      } catch (err) {
        Swal.close()
        console.log(err.response, 'err registerAction')
        context.commit('setErrors', err.response.data.messages)
      }
    },
    async fetchTasks (context) {
      try {
        Swal.fire({
          title: 'Loading Tasks'
        })
        Swal.showLoading()

        const { data } = await taskManagerAPI.get('/task', {
          headers: { access_token: localStorage.access_token }
        })
        context.commit('setTasks', data)

        Swal.close()
        return
        
      } catch (err) {
        Swal.close()
        console.log(err.response, 'err fetchTasks')
        context.commit('setErrors', err.response.data.messages)
      }
    },
    async addTaskAction (context, payload) {
      try {
        Swal.fire({
          title: 'Logging In'
        })
        Swal.showLoading()

        const { data } = await taskManagerAPI.post('/task', payload, {
          headers: { access_token: localStorage.access_token }
        })
        context.commit('addTaskMutation', data)
        router.push('/')

        Swal.close()
        Swal.fire(
          'Add Task Success!',
          `Task added`,
          'success'
        )
        return

      } catch (err) {
        Swal.close()
        console.log(err.response, 'err addTask')
        context.commit('setErrors', err.response.data.messages)
      }
    },
    async patchTaskAction (context, payload) {
      try {
        const inputStatus = {
          status: String(payload.status)
        }
        let updatedTasks = JSON.parse(JSON.stringify(this.state.tasks))

        const { data } = await taskManagerAPI.patch(`/task/${payload.id}`, inputStatus, {
          headers: { access_token: localStorage.access_token }
        })

        updatedTasks.forEach((task, i) => {
          if (task.id === data.id) {
            updatedTasks[i].status = data.status
          }
        })
        
        context.commit('patchTaskMutation', updatedTasks)

        Toast.fire({
          icon: 'success',
          title: `Tasks status updated successfully`
        })
        return

      } catch (err) {
        console.log(err.response, 'err patchTask')
        context.commit('setErrors', err.response.data.messages)
      }
    },
    async deleteTaskAction (context, payload) {
      try {
        Swal.fire({
          title: 'Deleting'
        })
        Swal.showLoading()


        let currentTasks = JSON.parse(JSON.stringify(this.state.tasks))
        const targetId = payload
        await taskManagerAPI.delete(`/task/${targetId}`, {
          headers: { access_token: localStorage.access_token }
        })

        let updatedTasks = currentTasks.map(task => {
          if (task.id !== targetId) {
            return task
          } else {
            return {}
          }
        })

        updatedTasks.forEach((task, i) => {
          if (JSON.stringify(task) === '{}') {
            updatedTasks.splice(i, 1)
          }
        })

        context.commit('setTasks', updatedTasks)

        Swal.close()
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        return
      } catch (err) {
        Swal.close()
        console.log(err.response, 'err patchTask')
        context.commit('setErrors', err.response.data.messages)
      }
    }
  },
  modules: {}
});
