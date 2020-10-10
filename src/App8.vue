<template>
  <div>{{ state.name }}</div>
  <div>{{ state.attr.age }}</div>
  <div>{{ state.attr.height }}</div>
  <button @click="myFn()">按钮</button>
</template>

<script>
import { readonly } from "vue";
export default {
  name: "App",
  setup() {
    let state = readonly({ name: "abc", attr: { age: 19, height: 1.88 } });
    function myFn(){
      state.name="mmm"
    }
    return { state,myFn };
  },
};
</script>
