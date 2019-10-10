<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
</script>
<style lang="stylus">
@media screen and (max-width: 800px)
  html,body 
    background #ccc
    height 100%
    font-size 24px

  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
@media screen and (min-width: 801px)
  html,body 
    background #ccc
    height 100%
    font-size 100px!important

  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
</style>
