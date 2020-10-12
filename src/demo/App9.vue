<template>
  <div>
    <form action="">
      <input type="text" />
    </form>
    <ul>
      <li
        v-for="(stu, index) in state.stus"
        :key="stu.id"
        @Click="removeItem(index)"
      >
        {{ stu.name }}--{{ stu.age }}
      </li>
    </ul>
    <Child :msg="state.msg2" />
  </div>
</template>

<script>
import { reactive } from "vue";
import Child from "./components/Child.vue";
export default {
  name: "App",
  setup() {
    const state = reactive({
      stus: [
        { id: 1, name: "aa", age: 10 },
        { id: 2, name: "bb", age: 20 },
        { id: 3, name: "cc", age: 30 },
      ],
      msg2: "12306",
    });
    const removeItem = (index) => {
      this.stus.splice(index, 1);
    };
    return { state, removeItem };
  },
  components: {
    Child,
  },
};
</script>
