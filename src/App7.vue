<template>
  <div ref="box">divdivdiv</div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  name: "App",
  setup() {
    let box = ref(null); //拿到的是null
    onMounted(() => {
      //这里可以拿到元素值
      console.log("onMounted", box.value);
    });
    return { box };
  },
};
</script>
