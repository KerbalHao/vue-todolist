<template>
  <div id="app">
    <transition name='router'>
      <router-view></router-view>
    </transition>
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
    height 100%
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
    height 100%
.router-enter-active, .router-leave-active 
  transition all 0.5s ease
.router-enter,.router-leave-to
  opacity 0
  position fixed
  transform translateX(-100%)
  
</style>
