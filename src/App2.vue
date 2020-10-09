<template>
  <div>
    <ul>
      <li
        v-for="(stu, index) in state.stus"
        :key="stu.id"
        @click="remStu(index)"
      >
        {{ stu.name }}--{{ stu.age }}
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "App",
  setup() {
    //ref只能监听简单类型的变化，不能监听复杂类型的变化（对象/数组
    /**let state = reactive({
      stus: [
        { id: 1, name: "aa", age: 10 },
        { id: 2, name: "bb", age: 20 },
        { id: 3, name: "cc", age: 30 },
      ],
    });
    const remStu = (index) => {
      state.stus.splice(index, 1);
    };**/
    //以上部分可以抽离
    let { state, remStu } = useRemoveStudent();
    return { state, remStu };
  },
};
function useRemoveStudent() {
  let state = reactive({
    stus: [
      { id: 1, name: "aa", age: 10 },
      { id: 2, name: "bb", age: 20 },
      { id: 3, name: "cc", age: 30 },
    ],
  });
  const remStu = (index) => {
    state.stus.splice(index, 1);
  };
  return { state, remStu };
}
</script>
