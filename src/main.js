import Vue from "vue";
import { Card, Button } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from "./App.vue";

Vue.component(Card.name, Card);
Vue.component(Button.name, Button);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
