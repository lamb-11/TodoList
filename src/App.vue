<template>

  <body>
    <div id="root">
      <div class="todo-container">
        <div class="todo-wrap">
          <MyTop @addTodo='addTodo' />
          <MyMain :todoArr='todoArr' />
          <MyFooter :todoArr='todoArr' @allCheck='allCheck' @clearDonetodo='clearDonetodo' />
        </div>
      </div>
    </div>
  </body>

</template>

<script>
import pubsub from 'pubsub-js'
import MyTop from './components/MyTop'
import MyMain from './components/MyMain'
import MyFooter from './components/MyFooter'
export default {
  name: 'App',
  components: { MyTop, MyMain, MyFooter },
  data() {
    return {
      todoArr: JSON.parse(localStorage.getItem('todo')) || []
    }
  },
  methods: {
    //将新任务添加到数组后面
    addTodo(thing) {
      this.todoArr.unshift(thing)
    },
    //勾选or未勾选
    handleCheck(id) {
      this.todoArr.forEach((todo) => {
        if (todo.id === id) todo.done = !todo.done
      })
    },
    //全选和取消全选
    allCheck(done) {
      this.todoArr.forEach((todo) => {
        todo.done = done
      })
    },
    //删除这个任务
    deleteTodo(msgName, id) {
      this.todoArr = this.todoArr.filter((todo) => {
        return todo.id != id
      })
    },
    //清除已完成
    clearDonetodo() {
      this.todoArr = this.todoArr.filter((todo) => {
        return todo.done === false
      })
    },
    //更新输入框内容
    updateThing(id, thing) {
      this.todoArr.forEach((todo) => {
        if (todo.id === id) todo.thing = thing
      })
    }
  },
  watch: {
    todoArr: {
      deep: true,
      handler(value) {
        localStorage.setItem('todo', JSON.stringify(value))
      }

    }
  },
  mounted() {
    this.$bus.$on('handleCheck', this.handleCheck),
      // this.$bus.$on('deleteTodo', this.deleteTodo)
      this.pid = pubsub.subscribe('deleteTodo', this.deleteTodo)
    this.$bus.$on('updateThing', this.updateThing)
  },
  beforeDestroy() {
    this.$bus.$off('handleCheck'),
      // this.$bus.$off('deleteTodo')
      PubSub.unsubscribe(pid)
  }
}
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-edit {
  color: #fff;
  background-color: rgb(6, 97, 242);
  border: 1px solid rgb(6, 97, 242);
  margin-right: 5px;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>