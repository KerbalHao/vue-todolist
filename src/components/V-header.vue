<template>
  <div class='header'>
    <div class="homeUpper" v-if='page === HOME'>
      <bubble :num='num'></bubble>
      <div id="icon" @click='choose'>
        <span class="todo tag">
          <i class="cubeic-star"></i>
          <div>未完成</div>
        </span>
        <span class="all current tag">
          <i class="cubeic-home "></i>
          <div>全部</div>
        </span>
        <span class="complete tag">
          <i class="cubeic-ok"></i>
          <div>已完成</div>
        </span>
      </div>
    </div>
    <div class="detailUpper" v-else-if="page === DETAIL">
      <div class="left">
        <i class="cubeic-back"></i>
      </div>
      <div class="right">
        <i class="cubeic-delete"></i>
        <i class="cubeic-ok"></i>
      </div>
    </div>
    <div class="searchUpper" v-else-if='page === SEARCH'>
        <i class="cubeic-search"></i>
        <span>Search</span>
    </div>
    <split :second="page === 'home'"></split>
  </div>
</template>

<script>
import Bubble from '@/components/Bubble'
import Split from '@/components/Split'
const HOME = 'home'
const DETAIL = 'detail'
const SEARCH = 'search'

export default {
  name: 'VHeader',
  props: {
    page: {
      type: String,
      default: HOME
    },
    num: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      HOME,
      DETAIL,
      SEARCH
    }
  },
  methods: {
    choose(event){
      let tags = document.getElementsByClassName('tag')
      let target = event.target
      if (target.closest('.tag')) {
        for (let i = 0 ;i < tags.length; i++) {
          tags[i].classList.remove('current')
          if (tags[i] === target.closest('.tag')) {
            tags[i].classList.add('current')
            this.$emit('change-tag', tags[i].classList[0])
          }
        }
      }
    }
  },
  components: {
    Bubble,
    Split
  }
}
</script>

<style lang='stylus' scoped>
  .header
    // margin-top 20px
    padding-top 20px
    height 75px
    position fixed
    width 100%
    top 0
    .homeUpper
      display flex
      align-content center
      #icon 
        flex 1
        display flex
        justify-content center
        margin-left -20px
        font-size 10px
        span
          display flex
          flex-direction column
          padding-right 10px
          div 
            align-self center
          i 
            font-size 30px
        .current 
          color orange
          div
            color #999
            font-weight 700
    .detailUpper
      display flex
      justify-content space-between
      width 100%
      font-size 30px
      .right 
        // flex 1
        display flex
        margin-right 40px
        justify-content flex-end 
        
    .searchUpper
      display flex
      justify-content flex-start
      padding-top 15px
      i 
        font-size 30px
      span 
        font-size 16px
        padding-top 10px

        // color white
      
</style>