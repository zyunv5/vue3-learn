<template>
  <div>
    <div>{{ state.myMsg }}</div>
    <button>按钮</button>
  </div>
</template>
<script>
import { reactive } from "vue";
export default {
  props: ["msg"],
  
  setup(props) {
    const state = reactive({
      myMsg: props.msg,
    });
    return { state };
  },
};
</script>