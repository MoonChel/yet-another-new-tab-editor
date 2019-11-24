import Vue from "vue";
import App from "./App.vue";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBold,
  faItalic,
  faLink,
  faStrikethrough,
  faCode,
  faUnderline,
  faListOl,
  faListUl,
  faQuoteRight,
  faPlus,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

require("chota");
require("./assets/custom.css");

library.add(faBold);
library.add(faItalic);
library.add(faLink);
library.add(faStrikethrough);
library.add(faCode);
library.add(faUnderline);
library.add(faListUl);
library.add(faListOl);
library.add(faQuoteRight);
library.add(faPlus);
library.add(faTrashAlt);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
