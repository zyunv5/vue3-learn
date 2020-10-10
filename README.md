[toc]

# Vue3

## diff 算法的改变

Vue2 是全量比较
在创建虚拟 DOM 的时候，会根据 DOM 中的内容，会不会发生变化，添加静态标记
看谁有标记比较谁

## 静态提升和监听缓存

vue2 中无论元素是否参与更新，每次都会创建再渲染
vue3 中对于不参与更新的元素，下一次直接复用

### 事件侦听器缓存

默认情况下 onClick 会被视为动态绑定，所以每次都回去追踪它的变化
但是因为是同一个函数，所以没有追踪变化，直接缓存起来复用即可
在 Vue3 的 diff 算法中，只有有静态标记的才会进行追踪

## 快速创建一个 vue3（脚手架，webpack，vite）

### Vite

原理：利用 ES6 的 import 会发送请求去加载文件的特性，拦截这些请求，做一些预编译，省去 webpack 冗长的打包时间

### 安装 vite

npm install -g create-vite-app
npm install
npm run dev

### Vue3 兼容 Vue2

### Vue2 存在的问题

数据散落在 watch computed methods 中
为了统一管理

## Vue3 组合 API

ref 只能监听简单类型的变化，不能监听复杂类型的变化（对象/数组

```js
import { ref } from "vue";
export default {
  name: "App",
  setup() {
    //定义了一个名称叫做count变量，这个变量的初始值是0
    // 这个变量发生改变后，Vue会自动更新UI
    let count = ref(0);
    //在组合API中，如果想定义方法，不用定义到methods中，直接定义就行
    function myFn() {
      count.value++;
    }
    //在组合API中定义的变量/方法，要想在外界使用，必须通过return{xxx,xxx}暴露出去
    return { count, myFn };
  },
};
```

reactive 可以监听对象与数组

```js
let state = reactive({
  stus: [
    { id: 1, name: "aa", age: 10 },
    { id: 2, name: "bb", age: 20 },
    { id: 3, name: "cc", age: 30 },
  ],
});
```

### setup 注意事项

setup 执行时机：
beforeCreate:表示组件刚刚被创建出来，组件的 data 和 methods 还没有初始化好
setup
created：表示组件刚刚被创建出来，组件的 data 和 methods 还没有初始化好

由于在执行 setup 函数的时候，还没有执行 Created 生命周期方法，所以在 setup 函数中，是无法使用 data 和 methods
由于我们不能在 setup 函数中使用 data 和 methods,所以 Vue 为了避免我们错误的使用，它直接将在 setup 函数中 this 修改成了 undefined

setup 只能是同步的，不能是异步的

Compositions API(注入式 API) 本质是在外部写，之后把数据或者方法注入到 data 与 methods 中

## reactive

reactive 是 Vue3 中提供的实现响应式数据的方法
reactive 参数必须是对象（Json/arr）

通过 reactive 包装后，就变成了 Proxy 对象

## ref

ref 的本质其实还是 reactive
当我们给 ref 函数传递一个值之后，ref 函数底层会自动将 ref 转换成 reactive

## ref 和 reactive 的区别

如果在 template 里使用的是 ref 类型的数据，那么 Vue 会自动帮我们添加.value
如果在 template 里使用的是 reactive 类型的数据，那么 Vue 不会自动帮我们添加.value
通过 isRef 和 isReactive 判断是 ref 属性还是 reactive 属性

## 递归监听

无论是通过 ref 还是 reactive 都是递归监听
递归监听存在问题：如果数据量比较大，非常消耗性能

## 非递归监听数据

```js
//通过这两种方法创建非递归监听数据
import { shallowRef, shallowReactive } from "vue";
```

如果通过 shallowRef 创建的数据，那么 Vue 监听的是.value 的变化，并不是第一层的变化
并且如果修改数据的第四层的某一个值，需要使用 triggerRef 方法

```js
//Vue3只提供了triggerRef方法，没有提供triggerReactive方法
state.value.gf.f.s.d = "4";
triggerRef(state);
```

## 递归监听与非递归监听应用场景

一般情况下，用 ref 和 reactive 即可
只有在需要监听的数据量比较大的时候，我们才使用 shallowRef/shallowReactive

## shallowRef 本质

如果通过 shallowRef 创建的数据，它监听的是.value 的变化

## toRaw

ref/reactive 数据类型的特点：
每次修改都会被跟踪，都会更新 UI 界面，但是这样非常消耗性能
所以有些数据不需要跟踪，不需要 UI 更新，这个时候，可以通过 toRaw 拿到它的原始数据
这样就不会被追踪，这样就不会更新 UI 界面

```js
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
```

## makeRaw

markRaw 包裹的数据永远不被追踪

```js
import { reactive, ref, markRaw } from "vue";
export default {
  name: "App",
  setup() {
    let obj = { name: "xiaoming", age: 18 };
    obj = markRaw(obj); //不被追踪
    let state = reactive(obj);
    function myFn() {
      state.name = "aa";
    }
    return { state, myFn };
  },
};
```

## toRef

如果利用 toRef 将某一个对象中的属性变成响应式的数据，我们修改响应式的数据是会影响到原始数据的
但是如果响应式数据是通过 toRef 创建的，那么修改了数据并不会触发 UI 界面更新

```js
import { reactive, ref, toRefs } from "vue";
export default {
  name: "App",
  setup() {
    let obj = { name: "xiaoming", age: 18 };
    let state = toRefs(obj);
    function myFn() {
      state.name = "aa";
      state.age = 20;
      console.log(obj, state);
    }
    return { state, myFn };
  },
};
```

ref：复制，修改响应式数据不会影响以前的数据，界面会自动更新
toRef：引用，修改响应式数据会影响以前的数据，界面不会自动更新

toRef 应用场景：
如果想让响应式数据和以前的数据关联起来，并且更新响应式数据之后还不想更新 UI，那么可以用 toRef

## toRefs

多个属性，使用响应式的时候

```js
import { reactive, ref, toRefs } from "vue";
export default {
  name: "App",
  setup() {
    let obj = { name: "xiaoming", age: 18 };
    let state = toRefs(obj);
    function myFn() {
      state.name.value = "aa";
      state.age.value = 20;
      console.log(obj, state);
    }
    return { state, myFn };
  },
};
```

## customRef

自定义一个 ref
返回一个 ref 对象，可以显式地控制依赖追踪和触发响应

```js
function myRef(value) {
  return customRef((track, trigger) => {
    return {
      get() {
        track(); //告诉Vue这个数据需要追踪变化的
        console.log("get", value);
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
    fetch("../public/data.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
    let age = myRef(18);
    function myFn() {
      age.value += 1;
    }
    return { age, myFn };
  },
};
```

### customRef 封装一个简单请求的 ref

```js
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
```
## ref 拿到DOM元素
```js
<div ref="box">divdivdiv</div>

import { ref, onMounted } from "vue";
export default {
  name: "App",
  setup() {
    let box = ref(null);
    onMounted(() => {
      //这里可以拿到元素值
      console.log("onMounted", box.value);
    });
    console.log(box.value);//拿到的是null
    return { box };
  },
};
```
