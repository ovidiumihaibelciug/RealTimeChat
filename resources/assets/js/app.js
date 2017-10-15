
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('message-component', require('./components/Message.vue'));

const app = new Vue({
    el: '#app',
    data: {
        message: '',
        chat:{
            message:[],
            user:[],
        },
        error: '',

    },

    methods:{
        send: function() {
            if (this.message.length != 0 && this.message != null && this.message != '' ) {
                this.chat.message.push(this.message);
                this.chat.user.push('You');
                axios.post('/send', {
                    message: this.message
                })
                    .then(response => {
                        console.log(response);
                         this.message = '';
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                this.error = "You have to type someting!";
            }
        },
        seen: function() {
            this.$emit('seen');
        }
    },
    mounted() {
        Echo.private('chat')
            .listen('ChatEvent', (e) => {
            this.chat.message.push(e.message);
            this.chat.user.push(e.user);
            console.log(e);
        });
    },

});
