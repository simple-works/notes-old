//==============================================================================
// ■ VueJS-Main (main.js)
//------------------------------------------------------------------------------
//     Application main entry point for scripts.
//==============================================================================

//------------------------------------------------------------------------------
// ● Vue
//------------------------------------------------------------------------------
import Vue from "vue";
Vue.config.productionTip = false;
Vue.config.devtools = false;

//------------------------------------------------------------------------------
// ● VueMeta
//------------------------------------------------------------------------------
import VueMeta from "vue-meta";
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
});

//------------------------------------------------------------------------------
// ● VeeValidate
//------------------------------------------------------------------------------
import "@/services/validation";
// import { ValidationProvider, ValidationObserver } from "vee-validate";
// Vue.component("ValidationProvider", ValidationProvider);
// Vue.component("ValidationObserver", ValidationObserver);

//------------------------------------------------------------------------------
// ● Buefy
//------------------------------------------------------------------------------
import Buefy from "buefy";
Vue.use(Buefy, {
  defaultIconPack: "fas"
});

//------------------------------------------------------------------------------
// ● FontAwesome
//------------------------------------------------------------------------------
// import "@fortawesome/fontawesome-free/js/all";

//------------------------------------------------------------------------------
// ● Moment
//------------------------------------------------------------------------------
import VueMoment from "vue-moment";
Vue.use(VueMoment);

//------------------------------------------------------------------------------
// → Instance Properties
//------------------------------------------------------------------------------
import axios from "axios";
import assets from "@/services/assets";
import api from "@/services/api";
import usersApi from "@/services/api/users-api";
import notesApi from "@/services/api/notes-api";
Vue.prototype.$http = axios;
Vue.prototype.$api = api;
Vue.prototype.$usersApi = usersApi;
Vue.prototype.$notesApi = notesApi;
Vue.prototype.$assets = assets;

//------------------------------------------------------------------------------
// → Global Components
//------------------------------------------------------------------------------
import Loading from "@/components/Loading";
Vue.component("Loading", Loading);

//------------------------------------------------------------------------------
// → Global Directives
//------------------------------------------------------------------------------
import ImgAltSrc from "@/directives/img-alt-src";
Vue.directive("Src", ImgAltSrc);

//------------------------------------------------------------------------------
// ▶ Vue Application Initialization
//------------------------------------------------------------------------------
import router from "./router";
import store from "./store";
import App from "./App";
import "./registerServiceWorker";
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
