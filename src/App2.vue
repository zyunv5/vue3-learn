<template>
  <div>
    <form>
      <input type="text" v-model="state2.stu.id" />
      <input type="text" v-model="state2.stu.name" />
      <input type="text" v-model="state2.stu.age" />
      <input type="submit" @click="addStu" />
    </form>
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
    let { state2, addStu } = useAddStudent(state);
    return { state, remStu, state2, addStu };
    //Compositions API(注入式API)
    //本质是在外部写，之后把数据或者方法注入到data与methods中

    // setup执行时机：
    //beforeCreate:表示组件刚刚被创建出来，组件的data和methods还没有初始化好
    //setup
    //created：表示组件刚刚被创建出来，组件的data和methods还没有初始化好

    //由于在执行setup函数的时候，还没有执行Created生命周期方法，所以在setup函数中，是无法使用
    //data和methods

    //由于我们不能在setup函数中使用data和methods,所以Vue为了避免我们错误的使用，它直接将在setup函数中
    //this修改成了undefined

    //setup只能是同步的，不能是异步的
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
function useAddStudent(state) {
  let state2 = reactive({
    stu: {
      id: "",
      name: "",
      age: "",
    },
  });
  const addStu = (e) => {
    e.preventDefault();
    let stu = Object.assign({}, state2.stu);
    state.stus.push(stu);
    state2.stu.id = "";
    state2.stu.name = "";
    state2.stu.age = "";
  };
  return { state2, addStu };
}
</script>
