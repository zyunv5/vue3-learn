<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <form action="">
    <input type="text" >
  </form>
  <ul>
    <li v-for="(stu,index) in stus" :key="stu.id" @Click="removeItem(index)">
      {{stu.name}}--{{stu.age}}
    </li>
  </ul>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  data(){
    return{
      stu:{id:"",name:"",age:""},
      stus:[
        {id:1,name:'aa',age:10},
        {id:2,name:'bb',age:20},
        {id:3,name:'cc',age:30},
      ]
    }
  },
  components: {
    HelloWorld,
  },
  methods: {
    removeItem(index){
      console.log(index)
      this.stus.splice(index,1)
    }
  },
};
</script>
