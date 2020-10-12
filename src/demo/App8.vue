<template>
  <div>{{ state.name }}</div>
  <div>{{ state.attr.age }}</div>
  <div>{{ state.attr.height }}</div>
  <button @click="myFn()">按钮</button>
</template>

<script>
import { readonly, shallowReadonly } from "vue";
export default {
  name: "App",
  setup() {
    let state = shallowReadonly({
      name: "abc",
      attr: { age: 19, height: 1.88 },
    });
    function myFn() {
      state.attr.age = 20;
      console.log(state);
    }
    return { state, myFn };
  },
};
</script>
