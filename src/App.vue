<template>
  <div id="app">
    <Grades/>
  </div>
</template>

<script>
import Grades from './components/Grades'

export default {
  name: 'App',
  components: {
    Grades
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 1200px;
  margin: auto;
}
</style>
