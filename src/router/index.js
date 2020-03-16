import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: "history",
  base: process.env.BASE_URL,
  linkExactActiveClass: "is-active",
  scrollBehavior(/* to, from, savedPosition */) {
    return { x: 0, y: 0 };
  }
});

export default router;
