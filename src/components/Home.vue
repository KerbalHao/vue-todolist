<template>
  <div class="home">
    <v-header class='header' @change-tag='onChangeTag' :num='num'></v-header>

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
          >批量完成</cube-button>
          <cube-button 
          :inline="true"  
          :primary="true"
          icon="cubeic-delete"
          class='button' 
          @click='deleteAll'
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
          v-for="task in tasks" 
          :key="task.id" 
          class='task'
          @click='tapTask(task)' 
          :class="{'current': task.current,'done': task.done, 'fail': task.fail}"
          v-show='tag === task.tag'
        >
          <div class='dot' @click.stop='toggle(task)'>
            <i :class="{'cubeic-square-border': !task.current, 'cubeic-square-right': task.current}"></i>
          </div>

          <div class='content'>
            <div class='title'>
              {{task.title}}
              <span class='signal' v-show='task.done || task.fail'>
                {{task.done ? '（完成！）' : task.fail ? '（失败！）' : ''}}
              </span>
            </div>
            <!-- <i :class="{'cubeic-close': !task.done, 'cubeic-ok': task.done}" class='signal' v-show="task.done || task.fail"></i> -->
            <span class="type">
              {{task.type}}
            </span>

            <transition name='time'>
              <div class="detail" v-show='task.detail'>
                <span class="startTime">开始时间</span><br>
                <span class="expectTime">预计完成时间</span><br>
                <span class="leftTime">剩余时间</span>
              </div>
            </transition>
          </div>

          <transition name='button'>
            <div class="buttons"  v-show='task.detail'>
              <cube-button 
                :inline="true"  
                :primary="true"
                icon="cubeic-ok" 
                class='button' 
                @click='completeTask(task)'>{{task.done ? '重置' : '完成'}}</cube-button>
                <cube-button 
                  :inline="true"  
                  :primary="true"
                  icon="cubeic-edit" 
                  class='button'
                  @click='editTask'>
                    <router-link :to="'/detail/' + task"  class='router'>
                      编辑
                    </router-link>
                  </cube-button>
              
              <cube-button 
                :inline="true"  
                :primary="true"
                icon="cubeic-delete"
                class='button' 
                @click='deleteTask(task)'>删除</cube-button>
            </div>
          </transition>

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
export default {
  name: 'Home',
  data() {
    return {
      options: {
        click: true,
        directionLockThreshold: 0
      },
      tasks: [
        {
          title: 'asdasdasda',
          type: 'work',
          detail: false,
          check: false,
          id: 0,
          current: false,
          done: false,
          fail:false
        },
        {
          title: 'qwewqrwqe',
          type: 'work',
          detail: false,
          check: false,
          id: 1,
          current: false,
          done: false,
          fail:false
        },
        {
          title: 'zxcxvxva',
          type: 'work',
          detail: false,
          check: false,
          id: 2,
          current: false,
          done: false,
          fail:true
        },
        {
          title: 'zxcxvxva',
          type: 'work',
          detail: false,
          check: false,
          id: 3,
          current: false,
          done: true
        },
        {
          title: 'zxcxvxva',
          type: 'work',
          detail: false,
          check: false,
          id: 4,
          current: false,
          done: false
        }
      ],
      tag: 'all'
    }
  },
  computed: {
    allCheck: {
      get() {
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
    }
  },
  created() {
    this.tasks.forEach( task => {
      task.tag = 'all'
    })
  },
  methods: {
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
    tapTask(task) {
        for (let i = 0; i < this.tasks.length; i ++) {
          if (this.tasks[i] === task) {
            task.current = !task.current
            task.detail = !task.detail
          } else {
            this.tasks[i].current = false
            this.tasks[i].detail = false

          }
        }
    },
    toggle(task) {
      task.current = !task.current
      task.detail = false
    },
    toggleAll() {
      this.allCheck = !this.allCheck
    },
    completeAll() {
      this.tasks.forEach( task => {
        if (task.current) {
          task.done = true
            if (task.fail) {
              task.done = false
            }
        }
      })
    },
    deleteAll() {
      for (let i = this.tasks.length - 1; i >= 0; i--) {
        if (this.tasks[i].current) {
          this.tasks.splice(i, 1)
        }
      }
      this.allCheck = false
    },
    // to be fixed
    completeTask(task) {
      task.done = !task.done
    },
    editTask() {},
    deleteTask(task) {
      for (let i = 0; i < this.tasks.length; i++) {
        console.log(1)
        if (task === this.tasks[i]) {
        console.log(2)

          this.tasks.splice(i, 1)
        }
      }
    }
  },
  components: {
    VHeader
  }
}
</script>

<style lang='stylus' scoped>
  .home
    .main
      margin 100px 10px 0px 10px
      .manipulation
        margin-bottom 20px
        display flex
        justify-content space-between
        border-bottom 1px solid orange
        padding-bottom 2px
        font-size 16px
        .button
          margin-left 10px
          font-size 10px
          padding 5px
      .scroll-list-wrap
        height 400px
        text-align left
        li
          display flex
          box-sizing border-box
          margin-bottom 10px
          padding-top 10px
          padding-left 10px
          vertical-align center
          // .dot
          //   margin auto 10px
          //   width 12px
          //   height 12px
          //   border-radius 50%
          //   background #FFC85E          
          .content
            margin-left 10px
            display flex
            flex-direction column
            .title
              font-size 24px
            .type
              font-size 12px
              color #666666
          
        .current 
          border-top 1px solid blue
          border-bottom 1px solid blue
          background #FFFFFF
          .button-enter-active, .button-leave-active 
            transition all 1.5s ease
          .button-enter, .button-leav
            opacity 0
            transform translateX(100%)
          .buttons
            flex 1
            display flex
            justify-content flex-end
            height 20px
            // margin-top 20px
            .button
              font-size 8px
              margin-right 2px
              padding 0 10px 
              .router
                color white
          .time-enter-active, .time-leave-active 
            transition all .5s ease
          .time-enter, .time-leave-to
            opacity 0
        .done
          background #FFCC99
        .fail
          background #663333
          color white
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
      bottom 10px
      font-size 60px
      left 50%
      transform translateX(-50%)

</style>