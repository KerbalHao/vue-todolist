<template>
  <div class="bubble" v-show='num !== 0'>{{num}}</div>
</template>

<script>
export default {
  name: 'bubble',
  props: {
    num:{
      default: 0
    }
  }
}
</script>

<style lang='stylus' scoped>
  .bubble
    display: inline-block
    padding: 0 6px
    height: 24px
    line-height: 24px
    text-align: center
    border-radius: 50%
    font-family: Helvetica
    font-weight: 700
    font-size: 14px
    color: white
    margin-left 5px
    background: linear-gradient(to right, orange, red)
</style>