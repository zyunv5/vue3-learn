<template>
  <div>
    <p>{{ state }}</p>
    <button @click="myFn()">按钮</button>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
export default {
  name: "App",
  setup() {
    let obj = { name: "xiaoming", age: 18 };
    let state = toRefs(obj);
    function myFn() {
      state.name.value = "aa";
      state.age.value = 20;
      console.log(obj,state);
    }
    return { state, myFn };
  },
};
</script>
