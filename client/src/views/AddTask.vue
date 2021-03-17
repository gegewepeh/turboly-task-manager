<template>
   <div class="container rounded shadow customContainer">
    <div class="row">
      <div class="col d-flex flex-column justify-content-around" style="height: 80vh;">
        <div class="mt-5">
          <h1 class="text-center">Add Task</h1>
        </div>
        <form class="mx-auto my-auto d-flex flex-column justify-content-between" style="height: 40vh; width: 40vh;">

          <div>
            <div>
              <input class="form-control mb-3 customInput" type="text" placeholder="Title" required v-model="inputTask.title">
              <input class="form-control mb-3 customInput" type="text" placeholder="Description" v-model="inputTask.description">
              <input class="form-control mb-3 customInput" type="date" required v-model="inputTask.dueDate">
            </div>
            <div class="d-flex">
              <label class="mt-1 pe-3" for="priority-form">Priority:</label>
              <select class="form-select" id="priority-form" required v-model="inputTask.priority">
                <option value="3">Low</option>
                <option value="2">Medium</option>
                <option value="1">High</option>
              </select>
            </div>
          </div>
          <div class="mx-auto d-flex flex-column" style="width: 40vh;">
            <p class="text-center text-danger">{{ errors }}</p>
            <button type="button" class="btn btn-primary mt-3" @click="handleSubmitAddTask">Add to Task List</button>
            <button type="button" class="btn btn-secondary mt-3" @click="handleCancelAddTask">Cancel</button>
          </div>
          
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddTask',
  data () {
    return {
      inputTask: {
        title: '',
        description: '',
        dueDate: '',
        priority: ''
      }
    }
  },
  computed: {
    errors () {
      return this.$store.state.errors
    }
  },
  methods: {
    async handleSubmitAddTask () {
      try {
        let currentDate = new Date()
        let dueDate = new Date (this.inputTask.dueDate)
        if (dueDate < currentDate) {
          this.$store.commit('setErrors', 'Enter newer date than today')
        } else {
          this.inputTask.priority = +this.inputTask.priority
          await this.$store.dispatch('addTaskAction', this.inputTask)
        }

      } catch (err) {
        console.log(err, 'err handleSubmitAddTask')
      }
    },
    handleCancelAddTask () {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>