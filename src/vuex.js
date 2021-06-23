import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    grades: []
  },
  mutations: {
    addGrade: (state, data) => {
      // ensures that the course does not exist before pushong into the grades list
      let index = state.grades.findIndex((e) => e.course_name === data.course_name)
      if (index === -1) {
        let course = data.course_name.charAt(0).toUpperCase() + data.course_name.slice(1)
        state.grades.push({
          course_name: course,
          grade: data.grade
        })
      }
    },
    deleteGrade: (state, data) => {
      state.grades.forEach((ele, idx) => {
        if (ele.course_name === data.course_name && ele.grade === data.grade) {
          state.grades.splice(idx, 1)
        }
      })
    },
    saveGrade: (state, data) => {
      state.grades[data.row] = { course_name: data.course_name, grade: data.grade }
    },
    sortBy: (state, data) => {
      // sorts the grades depending on the sort topic and direction
      if (data.sortTopic === 'course' && data.sortDirection === 'asc') {
        state.grades.sort((a, b) => (a.course_name > b.course_name) ? 1 : ((b.course_name > a.course_name) ? -1 : 0))
      } else if (data.sortTopic === 'course' && data.sortDirection === 'desc') {
        state.grades.sort((a, b) => (a.course_name < b.course_name) ? 1 : ((b.course_name < a.course_name) ? -1 : 0))
      } else if (data.sortTopic === 'mark' && data.sortDirection === 'asc') {
        state.grades.sort((a, b) => (a.grade > b.grade) ? 1 : ((b.grade > a.grade) ? -1 : 0))
      } else if (data.sortTopic === 'mark' && data.sortDirection === 'desc') {
        state.grades.sort((a, b) => (a.grade < b.grade) ? 1 : ((b.grade < a.grade) ? -1 : 0))
      }
    }
  },
  getters: {
    all: (state) => {
      return state.grades
    },
    honours: (state) => {
      let honourGrades = []
      state.grades.forEach((item, idx) => {
        if (item.grade >= 80) {
          honourGrades.push(item)
        }
      })
      return honourGrades
    },
    failed: (state) => {
      let failedGrades = []
      state.grades.forEach((item, idx) => {
        if (item.grade <= 50) {
          failedGrades.push(item)
        }
      })
      return failedGrades
    },
    minimum: (state) => {
      if (state.grades.length > 0) {
        let min = 150
        for (var i = 0; i < state.grades.length; i++) {
          if (state.grades[i].grade < min) {
            min = state.grades[i].grade
          }
        }
        return min
      } else {
        return 0
      }
    },
    maximum: (state) => {
      if (state.grades.length > 0) {
        let max = 0
        for (var i = 0; i < state.grades.length; i++) {
          if (state.grades[i].grade > max) {
            max = state.grades[i].grade
          }
        }
        return max
      } else {
        return 0
      }
    },
    average: (state) => {
      let total = 0
      if (state.grades.length > 0) {
        for (var i = 0; i < state.grades.length; i++) {
          console.log(state.grades[i].grade)
          total += parseInt(state.grades[i].grade)
        }
        console.log(total)
        console.log(state.grades.length)
        return Math.round(total / state.grades.length)
      } else {
        return 0
      }
    }
  }
})

export default store
