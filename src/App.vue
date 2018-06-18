<template>
    <div id="app">
        <div class="banner">
            <div class="banner-tab">
                <div class="tab-item">
                    <router-link to='/home'>首页</router-link>
                </div>
                <div class="tab-item">
                    <router-link to='/iMessage'>我的信息</router-link>
                </div>
                <div class="banner-right" @click="showLoginFun" v-show="!userLogin">
                    <span class="glyphicon glyphicon-user"></span> 登录 / 注册
                </div>
                <div class="banner-right" v-if="userLogin">{{userLogin}}<span @click.stop.prevent="logoutFun" class="logout">Logout</span></div>
            </div>
        </div>
        <div class="clear"></div>
        <login v-show="showLogin" @hide="hideLogin" @userName="LoginNameFun"></login>
        <router-view></router-view>
    </div>
</template>

<script>

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/css/base.css'; /*引入公共样式*/
import login from './components/login';

export default {
//    name: 'App',
    created() {
        this.getUserName(); //获取当前登录人
    },
    data() {
        return {
            showLogin: false,
            userLogin: '',
        }
    },
    components: { login },
    methods: {
        showLoginFun() {
            this.showLogin = true;
        },
        hideLogin() { //接收组件login的隐藏讯息
            this.showLogin = false;
        },
        LoginNameFun(loginName) {
            this.userLogin = loginName; 
            this.showLogin = false;
        },
        getUserName() {
            var cookieArr = document.cookie.split(";");
            for(var i = 0; i < cookieArr.length; i++){
                var arr = cookieArr[i].trim().split("=");
                if(arr[0] == 'userName'){
                    this.userLogin = arr[1];
                    break;
                }
            }
        },
        logoutFun() {
            var self = this;
            this.$http.post('/api/users/logout').then(function(res) {
                var res = res.body;
                if(res.status == 0){
                    self.userLogin = '';
                }
            });
        }
    }
}
</script>

<style>
::-webkit-scrollbar    
{    
    width: 13px;    
    height: 13px;    
    background-color: #F5F5F5;    
}    
    
/*定义滚动条轨道 内阴影+圆角*/    
::-webkit-scrollbar-track    
{    
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);    
    border-radius: 10px;    
    background-color: rgba(255, 255, 255, 0.78);    
}    

/*定义滑块 内阴影+圆角*/    
::-webkit-scrollbar-thumb    
{    
    border-radius: 10px;    
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);    
    background-color: rgb(229, 220, 251);    
}    

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

.banner{
    width: 100%;
    background: url("../static/img/banner.jpg") no-repeat;
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    color: #535886;
    font-size: 15px;
}

.banner a{
    color: #535886;
}

.banner-right{
    float: right;
    line-height: 60px;
    cursor: pointer;
}

.banner-tab{
    width: 85%;
    margin: 0 auto;
}

.banner-tab:after{
    content: "";
    clear: both;
    display: table;
}

.tab-item{
    float: left;
    width: 118px;
    line-height: 60px;
    text-align: center;
}

.tab-item a{
    display: block;
}

.tab-item .active{
    transition: all 0.2s linear;
    color: #da437b;
}

.logout{
    margin-left: 16px;
}
</style>
