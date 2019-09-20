<template>
  <div class="detail">
    <v-header :page="'detail'"></v-header>
    <div class="main">
      <ul class="listDetail">
        <li class='title'></li>
        <li class="startTime"></li>
        <li class="expectTime"></li>
        <li class="type"></li>
        <li class="note"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import VHeader from '@/components/V-header'
export default {
  name: 'detail',
  props: ['id'],
  
  //   data: {
  //     type: Object,
  //     default: {
  //       title: '标题',
  //       type: 'work',
  //       detail: false,
  //       check: false,
  //       id: 99999,
  //       current: false,
  //       done: false,
  //       fail: false,
  //       startTime: Date.now(),
  //       expectTIme: '',
  //       leftTime: ''
  //     }
  //   }

  mounted() {
    console.log(this.$route.params.id.title)
  },
  components: {
    VHeader
  }
}
</script>

<style>

</style>