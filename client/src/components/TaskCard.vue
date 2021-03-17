<template>
    <div class="row">
      <div class="col d-flex p-0 border shadow-sm rounded" style="background-color: white;">
        <div class="d-flex justify-content-center align-items-center px-2">
          <input type="checkbox" @click="handleSetStatus" v-model="task.status">
        </div>

        <div class="flex-grow-1" :class="{ dueToday, dueThisWeek, dueNextWeek, overdue }" style="width: 12px; max-width: 8px;">
        </div>

        <div class="flex-grow-1 pt-3 ps-2 customWidth"> 
          <h5>{{ task.title }}</h5>
          <p>{{ task.description }}</p>
        </div>
        <div class="pt-3 px-1">
          <p>{{ shortDate(task.dueDate) }}</p>
          <p>{{ showPriority(task.priority) }}</p>
        </div>
        <div class="d-flex customDelete" style="height: 100%;">
          <button class="btn btn-outline-danger my-auto mx-1" @click="handleDeleteTask" style="max-height: 3em;">Delete</button>
        </div>
      </div>
    </div>

</template>

<script>
import convertDate from '../helpers/convertDate'
import convertPriority from '../helpers/convertPriority'
import dayDifference from '../helpers/dayDifference'
import Swal from 'sweetalert2'

export default {
  name: "TaskCard",
  props: ['task'],
  computed: {
    dueToday () {
      let status = false
      const currentDate = new Date()
      const dueDate = new Date(this.task.dueDate)
      const difference = dayDifference(currentDate, dueDate)

      if (difference >= 0 && difference <= 1) {
        status = true
      }
      return status
    },
    dueThisWeek () {
      let status = false
      const currentDate = new Date()
      const dueDate = new Date(this.task.dueDate)
      const difference = dayDifference(currentDate, dueDate)

      if (difference >= 1 && difference <= 7) {
        status = true
      }
      return status
    },
    dueNextWeek () {
      let status = false
      const currentDate = new Date()
      const dueDate = new Date(this.task.dueDate)
      const difference = dayDifference(currentDate, dueDate)
      
      if (difference > 7) {
        status = true
      }
      return status
    },
    overdue () {
      let status = false
      const currentDate = new Date()
      const dueDate = new Date(this.task.dueDate)
      const difference = dayDifference(currentDate, dueDate)
      
      if (difference < 0) {
        status = true
      }
      return status
    }
  },
  methods: {
    shortDate (date) {
      return convertDate(date)
    },
    showPriority (priorityId) {
      return convertPriority(priorityId)
    },
    handleSetStatus (e) {
      let input = {
        id: this.task.id,
        status: e.target.checked
      }
      this.$store.dispatch('patchTaskAction', input)
    },
    handleDeleteTask () {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('deleteTaskAction', this.task.id)
        }
      })
    }
  }
}
</script>

<style>

</style>