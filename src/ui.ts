import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import store from './store'
import './ui.scss'
Vue.use(Vuex)
new Vue({
    el: '#app',
    components: { App },
    store: store(),
    render(h) {
        return h(App)
    }
})
