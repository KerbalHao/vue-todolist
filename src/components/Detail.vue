<template>
  <div class="detail">
    <v-header :page="'detail'" @deleteIt='deleteThis' @save='saveEditing'></v-header>
    <div class="main">
      <ul class="listDetail">
        <li class='title'>
          <label for="t">标题:</label>
          <input id='t' v-model="task.title" placeholder="请输入标题">
        </li>
        <li class="lastTime">
          <ruby>
          <label for="lastTime">预计用时(分):</label>
          <rt>默认不限制用时</rt>
          </ruby>
          <input id='lastTime' type="text" v-model="task.lastTime">
        </li>
        <li class="note">
          <label for="note">备注:</label>
          <textarea id='note' type="text" v-model="task.note"></textarea>
        </li>
        
      </ul>
    </div>
  </div>
</template>

<script>
import VHeader from '@/components/V-header'
let moment = require('moment')
export default {
  name: 'detail',
  data() {
    return {
      task: {
        id: -1,
        title: '',
        startTime: '',
        lastTime: '',
        timing: '',
        note: '',
        detail: false,
        start: false,
        current: false,
        done: false,
        fail: false,
        tag: 'all',
        counter: 0,
        timer: null
      },
      newTask: true,
      tasks: JSON.parse(localStorage.getItem('tasks')) || []
    }
  },
  created() {
    let id = this.$route.params.taskId
    if (id !== undefined) {
      this.newTask = false
    }
    this.task = this.tasks.find(task => {
      return task.id === id
    }) || this.task
  },
  methods: {
    deleteThis() {
      if (this.tasks.length > 0) {
        if (this.$route.params.taskId) {
          let id = this.$route.params.taskId
          let index = this.tasks.findIndex(task => {
            return task.id === id
          })
        this.tasks.splice(index, 1)
        }
      }
      this.saveTasks()
    },
    saveEditing() {
      if(!this.task.title) {
        alert('请输入标题')
        return
      }
      if (this.newTask) {
        this.task.id = this.tasks.length
        this.tasks.push(this.task)
      }
      this.saveTasks()
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
      this.$router.back()
    },
  },
  components: {
    VHeader
  }
}
</script>

<style lang='stylus' scoped>
  .main
    // margin 100px 10px 10px 10px
    width 95%
    text-align left
    font-size 18px
    li 
      margin-bottom 40px
      display flex
      justify-content  space-between
      background white
      padding 10px
      input 
        flex 1
        margin-left 30px
        background white
        border 1px solid orange
      textarea
        flex 1
        margin-left 30px
        min-width 70%
</style>