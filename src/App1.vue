<template>

</template>

<script>
import { ref } from "vue";
export default {
  name: "App",
  setup() {
    //定义了一个名称叫做count变量，这个变量的初始值是0
    // 这个变量发生改变后，Vue会自动更新UI
    let count = ref(0);
  },
};
</script>
