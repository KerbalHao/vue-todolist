<template>
  <div class="home">
    <v-header class='header' @change-tag='onChangeTag' :num='num || 0' :finished='finished'></v-header>

    <div class="main">
      <!-- top of the list -->
      <div class="manipulation">
        <!-- checkBox  -->
        <span class="checkBox" @click='toggleAll'>
          <i :class="{'cubeic-square-border': !allCheck, 'cubeic-square-right': allCheck}"></i>
          {{allCheck ? '反选' : '全选'}}
        </span>
        <!-- buttons -->
        <div class="mainBtn">
          <cube-button 
            :inline="true"  
            :primary="true"
            icon="cubeic-ok" 
            class='button' 
            @click='completeAll'
            :disabled='!this.tasks.length'
          >批量完成</cube-button>
          <cube-button 
          :inline="true"  
          :primary="true"
          icon="cubeic-delete"
          class='button' 
          @click='deleteAll'
          :disabled='!this.tasks.length'
          >批量删除</cube-button>
        </div>
      </div>
      <!-- content of list -->
      <div class="scroll-list-wrap">
        <cube-scroll
          ref="scroll"
          :data="tasks"
          :options='options'>

        <li 
        v-for="(task,index) in tasks" 
        :key="index" 
        class='task'
        @click='tapTask(task)' 
        :class="{'current': task.detail,'done': task.done, 'fail': task.fail}"
        v-show='tag === task.tag'
        >
          <div class='dot' @click.stop='toggle(task)'>
            <i :class="{'cubeic-square-border': !task.current, 'cubeic-square-right': task.current}"></i>
          </div>

          <div class='content'>
            <div class='title'>
              {{task.title}}
              <div class="flag" >
                <div 
                  :class="(task.start ? 'pause' : 'start')" 
                  v-show='!task.done && !task.fail' 
                  @click.stop='manipulateTask(task)'
                ></div>

                <div class="sperate" v-show='!task.done && !task.fail'></div>

                <div class="stop" v-show='!task.done && !task.fail' @click.stop='stopTask(task)'></div>

                <div :class="{'done': task.done,'fail':task.fail}" v-show='task.fail || task.done'>
                  <i :class="'cubeic-' + (task.fail ? 'close' : 'ok')" ></i>
                </div>
              </div>
            </div>

            <transition name='time'>
              <div class="detail" v-show='task.detail' >
                <span class="startTime">开始时间: {{task.start || task.startTime ? task.startTime : '未开始'}}</span><br>
                <span class="leftTime">剩余时间: {{task.timing || '00: 00'}} / {{task.lastTime | toMinute}}</span>

                <div class="buttons">
                  <cube-button 
                    :inline="true"  
                    :primary="true"
                    icon="cubeic-ok" 
                    class='button' 
                    @click.stop='completeTask(task)'
                  >{{task.fail || task.done ? '重置' : '完成'}}</cube-button>
                    <cube-button 
                      :inline="true"  
                      :primary="true"
                      icon="cubeic-edit" 
                      class='button'
                      @click.stop='editTask(task)'
                    >编辑
                      </cube-button>
                    <cube-button 
                      :inline="true"  
                      :primary="true"
                      icon="cubeic-delete"
                      class='button' 
                      @click.stop='deleteTask(task)'
                    >删除</cube-button>
                </div>
              </div>
                
            </transition>
          </div>


        </li>
        </cube-scroll>
      </div>
    </div>

    <footer class='footer'>
      <router-link to='/detail'>
      <i class="cubeic-add"></i>
      </router-link>
    </footer>
  </div>
</template>

<script>
import VHeader from '@/components/V-header'
let moment = require('moment')

export default {
  name: 'Home',
  data() {
    return {
      options: {
        click: true,
        directionLockThreshold: 0
      },
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
      tag: 'all'
    }
  },
  computed: {
    allCheck: {
      get() {
        if (this.tasks.length === 0) {
          return false
        }
        return this.tasks.every(task => {
          return task.current
        })
      },
      set(newVal) {
        this.tasks.forEach(task => {
          task.current = newVal
        })
      }
    },
    num() {
      if (this.tag === 'all') {
        return this.tasks.length
      } else if (this.tag === 'todo') {
        return this.tasks.filter(task => {
          return !task.done
        }).length
      } else {
        return this.tasks.filter(task => {
          return task.done
        }).length
      }
    },
    finished() {
      return this.tasks.filter(task => {
        return task.done
      }).length
    }
  },
  mounted() {
    window.addEventListener("beforeunload", () => {
      this.tasks.forEach(task => {
        if (task.start) {
          this.manipulateTask(task)
        }
      })
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
      localStorage.setItem('aaa', JSON.stringify("zxczxczx"))
    })
  },
  methods: {
    // 标签跳转
    onChangeTag(tag) {
      switch(tag){
        case 'todo':
          this.tasks.forEach( task => {
            if (!task.done) {
              task.tag = tag
            }
          })
          break
        case 'all': 
          this.tasks.forEach( task => {
            task.tag = tag
          })
          break
        case 'complete': 
          this.tasks.forEach( task => {
            if (task.done) {
              task.tag = tag
            }
          })
          break
      }
      this.tag = tag
         
    },
    // 展示任务详情
    tapTask(task) {
        for (let i = 0; i < this.tasks.length; i ++) {
          if (this.tasks[i] === task) {
            task.detail = !task.detail
          } else {
            this.tasks[i].detail = false
          }
        }
    },
    // 选中与否
    toggle(task) {
      task.current = !task.current
    },

    //批量处理
    toggleAll() {
      this.allCheck = !this.allCheck
    },
    completeAll() {
      this.tasks.forEach( task => {
        if (task.current && !task.done) {
          task.done = true
          task.startTime += '(finished)'
          if (task.fail) {
            task.done = false
          }
        }
      })
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
    deleteAll() {
      for (let i = this.tasks.length - 1; i >= 0; i--) {
        if (this.tasks[i].current) {
          this.tasks.splice(i, 1)
        }
      }
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
      this.allCheck = false
    },

    // 完成任务
    completeTask(task) {
      clearInterval(task.timer)
      if (!task.done) {
        if (task.startTime.indexOf('pause') > -1) {
          task.startTime = task.startTime.replace('(pause)', '(finished)') 
        } else {
          task.startTime += '(finished)'
        }
        task.done = true
      } else if (task.done) {
        // 重置
        this.reset(task)
      } if (task.fail) {
        this.reset(task)
      }
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
    // 编辑任务
    editTask(task) {
      // 暂停所有任务计时
      if(task.start){
        task.startTime = task.startTime + '(pause)'
        clearInterval(task.timer)
        task.start = false
      }
      this.$router.push({
        name: 'Detail',
        params: {
          taskId: task.id
        }
      })
    },
    // 删除任务
    deleteTask(task) {
      for (let i = 0; i < this.tasks.length; i++) {
        if (task === this.tasks[i]) {
          this.tasks.splice(i, 1)
        }
      }
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },

    // 任务操作 开始与暂停
    manipulateTask(task) {
      if (!task.start) {
        if (task.startTime && task.startTime.indexOf('pause') > -1) {
          task.startTime = task.startTime.replace('(pause)', '')
        }
        else {
          let startTime = moment().format('MM-DD HH:mm:ss')
          task.startTime = startTime
        }
        task.start = true
        task.timer = setInterval(()=> {
          task.minute = Math.floor(task.counter / 60)
          task.second = task.counter % 60
          task.timing = `${task.minute >= 10 ? task.minute:'0' + task.minute}: ${task.second >= 10 ? task.second : '0' + task.second}` 
          task.counter ++
          this.setFail(task)
        }, 1000)
      } else {
        task.startTime = task.startTime + '(pause)'
        clearInterval(task.timer)
        task.start = false
      }
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
    // 任务操作 停止
    stopTask(task) {
      clearInterval(task.timer)
      this.reset(task)
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },

    reset(task) {
      task.done = false
      task.fail = false
      task.start = false
      task.startTime = ''
      task.timing = ''
      task.counter = task.minute = task.second = 0
    },
    setFail(task) {
      let timing = (task.minute * 60 + task.second) / 60
      if (task.lastTime !== '' && timing > task.lastTime) {
        task.fail = true
        task.startTime = '(失败)'
      }
    }
  },
  filters: {
    toMinute(num) {
      let number = Number(num),
        formating = number * 60,
        second = 0, minute = 0
      if (formating % 60 !== 0) {
        second = formating % 60
        minute = Math.floor(number)
      } else {
        minute = formating / 60
      }
      return `${minute >= 10 ? minute:'0' + minute}: ${second >= 10 ? second : '0' + second}`
    },
    
  },
  components: {
    VHeader
  }
}
</script>

<style lang='stylus' scoped>
  .home
    height 100%
    .main
      width 95%
      height 100%
      position fixed
      top 100px
      bottom 50px
      .manipulation
        margin-bottom 20px
        display flex
        justify-content space-between
        border-bottom 1px solid orange
        padding-bottom 2px
        font-size 16px
        .checkBox
          padding-left 10px
        .button
          margin-left 10px
          font-size 10px
          padding 5px
      .scroll-list-wrap
        overflow hidden
        height 65%
        // height 450px
        text-align left
        li
          display flex
          box-sizing border-box
          margin-bottom 10px
          padding-left 10px
          padding-top 10px
          vertical-align center   
          .time-enter-active, .time-leave-active 
            transition all .5s ease
          .time-enter,.time-leave-to
            opacity 0
            font-size 0px
            transform translateX(100%)
          .dot
            position relative
            .cubeic-square-border,
            .cubeic-square-right
              font-size 24px
              position absolute
              top 0
          .content
            margin-left 30px
            width 100%
            display flex
            flex-direction column
            .title
              font-size 24px
              .flag 
                float right
                background #Fc9153
                margin-right 10px
                display inline-flex
                .sperate
                  background #ccc
                  width 2px
                .start 
                  box-sizing border-box
                    display inline-block
                  // width 20px
                  // height 20px
                  margin 0 10px
                  border 10px solid #Fc9153
                  background #Fc9153
                  border-left 10px solid white
                  border-right none
                .stop 
                  box-sizing border-box
                  // width 20px
                  // height 20px
                  margin 4px 9px
                  border 6px solid white
                  background #Fc9153
                .pause
                  box-sizing border-box
                  width 10px
                  height 16px
                  margin 2px 10px
                  // border 10px solid #Fc915
                  background #Fc9153
                  border-left 3px solid white
                  border-right 3px solid white

          
        .current 
          border-top 1px solid blue
          border-bottom 1px solid blue
          background #FFFFFF
          .detail
            margin-top 10px
            display flex
            width 100%
            font-size 16px
            flex-direction column
            justify-content space-between
            .buttons
              margin-top 10px
              // width 100%
              display flex
              margin-right 30px
              justify-content space-between
              .button
                color white
          
        .done
          background #FFCC99
        .fail
          background #663333
          color red
          .title
            color red
          .type 
            color white
          button
            background #999

    
    .footer 
      background #ccc
      width 100%
      position fixed 
      bottom 0
      font-size 60px
      left 50%
      transform translateX(-50%)
    
</style>