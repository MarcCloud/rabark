<template>
  <div class="container is-fluid" id="app">
    <sign-in v-bind:providers="signInProviders"/>
  </div>
</template>

<script>
module.exports = {
  data: function() {
    return {
      signInProviders: ['google', 'facebook']
    }
  }
}
</script>

<style>
body {
  font-weight: bold;
}
.center{
  margin: 0 auto;
}
</style>
