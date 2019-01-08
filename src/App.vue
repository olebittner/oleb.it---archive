<template>
  <div id="app">
    <router-view/>
    <a class="console imprint" href="/imprint">./imprint && ./privacy</a>
  </div>
</template>

<style>
#app {
  font-family: monospace;
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

<style scoped>
  .imprint {
    position: fixed;
    bottom: 0;
    right: 0;
    color: #404040;
    width: auto;
    margin-bottom: 10px;
    margin-right: 10px;
  }
</style>