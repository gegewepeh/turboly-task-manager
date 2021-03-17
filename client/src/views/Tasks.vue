<template>
   <div class="container rounded shadow customContainer">
    <div class="row" v-if="tasks.length > 0">
      <div class="col d-flex flex-column">
        <div class="d-flex justify-content-between mt-4 ms-4">
          <h1>My Tasks</h1>
          <button class="btn btn-primary customAddTask" @click="handleAddTaskForm">Add Task</button>
        </div>
        <div class="d-flex mt-4">
          <div class="d-flex">
            <p class="mt-2 ms-1">Filter</p>
            <select class="ms-2" v-model="filter">
              <option value="">No Filter</option>
              <option value="dueDate">Due Date</option>
              <option value="title">Title</option>
              <option value="description">Description</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div class="d-flex">
            <p class="ms-4 mt-2">Sort</p>
            <select class="ms-2" v-model="sort">
              <option value="">No Filter</option>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </div>
        </div>
        <div class="container-fluid mt-4 customCard">
          <task-card v-for="(task, idx) in tasks"
          :key="idx"
          :task="task"
          ></task-card>
        </div>
      </div>
    </div>
    <div class="row" v-else-if="tasks.length === 0">
        <div class="col d-flex flex-column">
          <div class="d-flex justify-content-between mt-4 ms-4">
            <h1>My Tasks</h1>
            <button class="btn btn-primary customAddTask" @click="handleAddTaskForm">Add Task</button>
          </div>
          <p class="text-center mt-5">-- You have no tasks --</p>
        </div>  
    </div>
  </div>
</template>

<script>
import TaskCard from '../components/TaskCard'

export default {
  name: "Tasks",
  components: {
    TaskCard
  },
  data () {
    return {
      filter: '',
      sort: ''
    }
  },
  computed: {
    tasks () {
      let currentTasks = this.$store.state.tasks
      let sortedTasks = []

      switch (this.filter) {
        case 'title':
          if (this.sort === 'ascending') {
            sortedTasks = currentTasks.sort((a, b) => (a.title > b.title ? 1 : -1))
          } else if (this.sort === 'descending') {
            sortedTasks = currentTasks.sort((a, b) => (a.title < b.title ? 1 : -1))
          } else {
            sortedTasks = currentTasks
          }
          break
        case 'description':
          if (this.sort === 'ascending') {
            sortedTasks = currentTasks.sort((a, b) => (a.description > b.description ? 1 : -1))
          } else if (this.sort === 'descending') {
            sortedTasks = currentTasks.sort((a, b) => (a.description < b.description ? 1 : -1))
          } else {
            sortedTasks = currentTasks
          }
          break
        case 'priority':
          if (this.sort === 'ascending') {
            sortedTasks = currentTasks.sort((a, b) => (a.priority > b.priority ? 1 : -1))
          } else if (this.sort === 'descending') {
            sortedTasks = currentTasks.sort((a, b) => (a.priority < b.priority ? 1 : -1))
          } else {
            sortedTasks = currentTasks
          }
          break
        case 'dueDate':
          if (this.sort === 'ascending') {
            sortedTasks = currentTasks.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1))
          } else if (this.sort === 'descending') {
            sortedTasks = currentTasks.sort((a, b) => (a.dueDate < b.dueDate ? 1 : -1))
          } else {
            sortedTasks = currentTasks
          }
          break
        default:
          sortedTasks = currentTasks
          break
      }
      return sortedTasks
    }
  },
  methods: {
    handleAddTaskForm () {
      this.$router.push('/addTask')
    }
  },
  mounted () {
    this.$store.dispatch('fetchTasks')
  }
}
</script>

<style>

</style>