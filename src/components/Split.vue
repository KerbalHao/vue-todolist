<template>
  <div class="split">
    <div class='left' :class="{'second': second}"></div>
    <div class='right'>
      <span>0/3 TODAY</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    second: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='stylus' scoped>
  .split
    position fixed
    display flex
    left 0
    top 65px
    width: 99%;
    height: 16px;
    transform skew(15deg)
    .left
      flex 1
      height 2px
      border-top 2px solid #FFC85E
    .second
      // padding-top 10px
      border-bottom 2px solid #FFC85E
    .right 
      height 14px
      font-size 12px
      font-style italic
      color #666666
      padding 0 20px
      border-bottom 2px solid #FFC85E
      border-left 2px solid #FFC85E

</style>