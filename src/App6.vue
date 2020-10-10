<template>
  <ul>
    <li v-for="item in state" :key="item.id">{{ item.name }}</li>
  </ul>
</template>

<script>
import { ref, customRef } from "vue";

function myRef(value) {
  return customRef((track, trigger) => {
    fetch(value)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        value = data;
        trigger(); //告诉Vue触发更新
      })
      .catch((err) => console.log(err));
    return {
      get() {
        track(); //告诉Vue这个数据需要追踪变化的
        console.log("get", value);
        //注意点：
        //不能在get方法中发送网络请求
        //渲染界面-》调用get-》发送网络请求
        //保存数据-》更新界面-》调用get
        return value;
      },
      set(newValue) {
        console.log("set", newValue);
        value = newValue;
        trigger(); //告诉Vue触发更新
      },
    };
  });
}
export default {
  name: "App",
  setup() {
    let state = myRef("../public/data.json");
    return { state };
  },
};
</script>
