import Vue from "vue";
import {
    Avatar,
    Container,
    Aside,
    Main,
    Card,
    Button,
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from "./App.vue";

Vue.component(Avatar.name, Avatar);
Vue.component(Container.name, Container);
Vue.component(Aside.name, Aside);
Vue.component(Main.name, Main);
Vue.component(Card.name, Card);
Vue.component(Button.name, Button);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
