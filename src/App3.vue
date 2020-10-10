<template>
  <div>
    <p>{{ state }}</p>
    <button @click="myFn()">按钮</button>
  </div>
</template>

<script>
import { reactive, toRaw, ref } from "vue";
export default {
  name: "App",
  setup() {
    let obj = { name: "xiaoming", age: 18 };
    let state = ref(obj);
    let obj2 = toRaw(state);

    console.log(obj);
    console.log(state);
    console.log(obj2.value);//获取ref包裹的原始类型

    function myFn() {
      state.name = "zs";
      console.log(obj);
    }

    return { state, myFn };
  },
};
</script>
