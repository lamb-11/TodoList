<template>
  <div class="todo-footer" v-show='doneTotal'>
    <label>
      <input type="checkbox" v-model='isChecked' />
    </label>
    <span>
      <span>已完成{{isDoneTodo}}</span> / 全部{{doneTotal}}
    </span>
    <button class="btn btn-danger" @click='clearDone'>清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: 'MyFooter',
  props: ['todoArr'],
  computed: {
    doneTotal() {
      return this.todoArr.length
    },
    isDoneTodo() {
      return this.todoArr.reduce((pre, current) => pre + (current.done ? 1 : 0), 0)
    },
    isChecked: {
      get() {
        return this.doneTotal === this.isDoneTodo
      },
      set(value) {
        this.$emit('allCheck', value)
      }
    },
  },
  methods: {
    clearDone() {
      this.$emit('clearDonetodo')
    }
  }
}
</script>

<style scope>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>