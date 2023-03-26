import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false,

    new Vue({
        el: '#content',
        render: n => n(App),
        beforeCreate() {
            Vue.prototype.$bus = this
        }
    })