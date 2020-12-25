import {RouteConfig,createRouter,createWebHashHistory} from "vue-router"
import Home from "../views/Home.vue"

const routes:Array<RouteConfig>=[{
  path:"/",
  name:"Home",
  component:Home
},{
  path:"/about",
  name:"About",
  component:()=>import()
}]

const router=createRouter({
  history:createWebHashHistory(),
  routes
})


export default router;