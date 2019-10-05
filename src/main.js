import Vue from "vue";
import {
    Card,
    Button,
    Avatar,
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from "./App.vue";

Vue.component(Card.name, Card);
Vue.component(Button.name, Button);
Vue.component(Avatar.name, Avatar);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
