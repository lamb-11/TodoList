<template>
  <li>
    <label>
      <input type="checkbox" @change='checkChecked(todo.id)' :checked='todo.done' />
      <span v-show='!todo.edit'>{{todo.thing}}</span>
      <input type="text" v-show='todo.edit' @blur='editblur(todo,$event)' :value='todo.thing' ref='getfocus'>
    </label>
    <button class="btn btn-danger" @click='isDelete(todo.id)'>删除</button>
    <button class="btn btn-edit" @click='handleEdit(todo)' v-show='!todo.edit'>编辑</button>

  </li>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
  name: 'MyItem',
  props: ['todo'],
  methods: {
    checkChecked(id) {
      this.$bus.$emit('handleCheck', id)
    },
    isDelete(id) {
      if (confirm('确认删除吗')) pubsub.publish('deleteTodo', id)
    },
    handleEdit(todo) {
      if (todo.hasOwnProperty('edit')) {
        todo.edit = true
      } else {
        this.$set(todo, 'edit', true)
      };
      this.$nextTick(function () {
        this.$refs.getfocus.focus()
      })
    },
    editblur(todo, e) {
      todo.edit = false;
      if (e.target.value == '') {
        alert('输入内容不能为空')
      } else {
        this.$bus.$emit('updateThing', todo.id, e.target.value)
      }

    },

  }
}
</script>

<style scope>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li .btn {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #ddd;
}

li:hover button {
  display: block;
}
</style>