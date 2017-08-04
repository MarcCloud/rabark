import Vue from 'vue';
import App from './components/app.vue';
import SignIn from './components/signin.vue';

Vue.component('sign-in', {
  ...SignIn
})

export const app = new Vue({
  ...App
})
