import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'

Vue.use(VueResource);
Vue.config.productionTip = false

Vue.http.options.root = "https://vue-http-fulano.firebaseio.com/";
Vue.http.interceptors.push((request, next) => {
  // console.log(request);
  // console.log(next);
  // THIS INTERCEPT METHODS AND CHANGE POST TO PUT
  if (request.method == 'POST') {
    request.method = 'PUT'
  } // 'POST' creates new one and 'PUT' update the old one
  // Changing response data with a interceptor
  next(response => {
    response.json = () => { return { messages: response.body } }
  })
})

new Vue({
  render: h => h(App),
}).$mount('#app')
