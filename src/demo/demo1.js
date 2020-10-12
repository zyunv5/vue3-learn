let obj = { name: "abc", age: 18 };

let state=new Proxy(obj,{
  get(obj,key){
    console.log(obj.key)
  },
  set(){
    
  }
})
console.log(state.name)