<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: monospace;
  font-size: 1.5em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: palegreen;
  height: 100%;
}

html, body {
  background-color: black;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
