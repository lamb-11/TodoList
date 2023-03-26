<template>
  <ul class="todo-main">
    <transition-group appear name='animate'>
      <MyItem v-for='todo in todoArr' :key='todo.id' :todo='todo' />
    </transition-group>

  </ul>
</template>

<script>
import MyItem from './MyItem'
export default {
  name: 'MyMain',
  components: { MyItem },
  props: ['todoArr'],
}
</script>

<style scope>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}

.animate-enter,
.animate-leave-to {
  transform: translateX(100%);
}

.animate-enter-to,
.animate-leave {
  transform: translateX(0);
}

.animate-enter-active,
.animate-leave-active {
  transition: 0.5s linear;
}
</style>