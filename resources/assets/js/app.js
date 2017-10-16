
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
            color:[],
            time:[],
        },
        error: '',
        typing: '',
        nrUsers: '',

    },

    watch: {
         message: function() {
            Echo.private('chat')
                .whisper('typing', {
                    name: this.message
                });
        }
    },

    methods:{
        send: function() {
            if (this.message.length != 0 && this.message != null && this.message != '' ) {
                this.chat.message.push(this.message);
                this.chat.user.push('You');
                this.chat.color.push('success');
                this.chat.time.push(this.getTime());
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
        },

        getTime: function () {
            var time = new Date();
            return time.getHours() + ':' + time.getMinutes();
        },
    },
    mounted() {
        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                this.chat.message.push(e.message);
                this.chat.user.push(e.user);
                this.chat.color.push('warning');
                this.chat.time.push(this.getTime());
                console.log(e);
            })
            .listenForWhisper('typing', (e) => {
                if (e.name != '') {
                    this.typing = 'typing...';
                } else {
                    this.typing = '';
            }
        })
        Echo.join(`chat`)
            .here((users) => {
                this.nrUsers = users.length;
            })
        .joining((user) => {
            this.nrUsers++;
        })
        .leaving((user) => {
            this.nrUsers--;
        });
    },

});
