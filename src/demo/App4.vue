<template>
  <div>
    <p>{{ state }}</p>
    <button @click="myFn()">按钮</button>
  </div>
</template>

<script>
import { reactive, ref, markRaw } from "vue";
export default {
  name: "App",
  setup() {
    let obj = { name: "xiaoming", age: 18 };
    obj = markRaw(obj);//不被追踪
    let state = reactive(obj);
    function myFn() {
      state.name = "aa";
    }
    return { state, myFn };
  },
};
</script>
