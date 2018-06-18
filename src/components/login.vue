<template>
	<div class="login">
		<section class="stark-login">
			<form action="" method="">
				<span @click="hideLogin" class="login-close">×</span>
				<div id="fade-box">
					<input type="text" name="username" id="username" placeholder="Username">
					<input type="password" id="password" placeholder="Password">
					<button @click.stop.prevent="login">Login</button>
				</div>
        <span class="signUp" @click="signupFun">注册</span>
			</form>
		</section>
    <div v-if="signupPage" class="signup-content">
      <span class="signup-close" @click="signupClose"> 返回</span>
      <div class="signup-title">注册页面</div>
      <p>
        <label for="signname" class="uname">你的账号</label>
        <input id="signname" name="signname" required="required" type="text">
      </p>
      <p> 
        <label for="signpwd" class="youpasswd">你的密码</label>
        <input id="signpwd" name="signpwd" required="required" type="password"> 
      </p>
      <p> 
        <label for="signpwd" class="youpasswd">确认密码</label>
        <input id="confirmpwd" name="confirmpwd" required="required" type="password"> 
      </p>
      <p>
        <input type="submit" value="注册" @click="registerFun">
      </p>
    </div>
	</div>
</template>

<script>
	export default {
		props: {

		},
		data() {
			return {
				userName: '',
				userPwd: '',
        loginName: '',
        signupPage: false,
        signName: '',
        signPwd: '',
			}
		},
		methods: {
			hideLogin() { //子组件login传去父组件的隐藏讯息
				this.$emit('hide');
			},
			login() {
				var self = this;
				this.userName = $("#username").val();
				this.userPwd = $("#password").val();
				if(this.userName == '' || this.userPwd == ''){
          alert("请输入账号密码");
					return;
				}
				this.$http.post('/api/users', {
					'userName': this.userName,
					'userPwd': this.userPwd
				}).then(function(res) {
          if(res.body.result == 'error'){
            alert('账号密码错误');
            return;
          }
					this.$emit('userName', res.body.result.userName);
          location.reload();
				});
			},
      signupFun() {
        this.signupPage = true;
      },
      registerFun() {
        var self = this;
        this.signName = $("#signname").val();
        this.signPwd = $("#signpwd").val();
        if(this.signName == '' || this.signPwd == ''){
          alert("请输入账号密码");
          return;
        }
        if($("#confirmpwd").val() != $("#signpwd").val()){
          alert("密码不一致，请重新出入");
          return;
        }
        this.$http.post('/api/users/signup', {
          'signName': this.signName,
          'signPwd': this.signPwd
        }).then(function(res) {
          alert(res.body.result);
          if(res.body.msg == '1'){
            this.signupPage = false;
          }
        })
      },
      signupClose() {
        this.signupPage = false;
      },
		}
	};
</script>

<style>
.login{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 40;
  background: rgba(0, 0, 0, 0.5);
}

.login-close{
  position: absolute;
  right: 15px;
  font-size: 24px;
  top: 0;
  font-weight: bold;
  cursor: pointer;
}

.login-close:hover{
  transform: scale(1.2,1.2);
}

#fade-box, .login-close {
  animation: input-entry 1s ease-in;
  z-index: 4;
}

#fade-box, .signUp {
  animation: input-entry 1s ease-in;
  z-index: 4;
}

.stark-login{
  text-align: center;
}

.stark-login form {
  animation: form-entry 1s ease-in-out;
  background: linear-gradient(#F5F5F5, #bdc0ec);
  border-radius: 5px;
  display: inline-block;
  height: 250px;
  margin: 150px auto 0;
  padding-top: 25px;
  position: relative;
  z-index: 4;
  width: 500px;
  transition: 1s all;
}

.stark-login input {
  background: linear-gradient(#ffffff, #f7f7f7);
  border: 1px solid #f3f3f3;
  border-radius: 5px;
  color: #888;
  display: block;
  font-family: 'Cabin', helvetica, arial, sans-serif;
  font-size: 13px;
  font-size: 1.3rem;
  height: 40px;
  margin: 20px auto 10px;
  padding: 0 10px;
  width: 400px;
}
.stark-login input:focus {
  animation: box-glow 1s ease-out infinite alternate;
  color: #000;
  outline: none;
}
.stark-login input:invalid {
  box-shadow: 0 0 5px rgba(255, 0, 0, 0.2), inset 0 0 5px rgba(255, 0, 0, 0.1), 0 2px 0 black;
}
.stark-login button {
  animation: input-entry 1s ease-in;
  background: linear-gradient(#ffffff, #b7afe4);
  box-sizing: content-box;
  border: 1px solid #cecdcd;
  border-radius: 5px;
  color: #4c4c4c;
  display: block;
  font-family: 'Cabin', helvetica, arial, sans-serif;
  font-size: 13px;
  font-weight: 400;
  height: 40px;
  line-height: 40px;
  margin: 20px auto;
  padding: 0;
  position: relative;
  width: 400px;
  transition: 1s all;
}
.stark-login button:hover,
.stark-login button:focus {
  background: linear-gradient(#fff, #c2baf1);
  color: #000;
  outline: none;
  transition: .3s all;
}
.stark-login button:active {
  background: linear-gradient(#fff, #c2baf1);
  top: 1px;
}

.signUp{
  position: absolute;
  right: 15px;
  bottom: 10px;
  cursor: pointer;
  color: #41525d;
  font-size: 12px;
}


@keyframes input-entry {
  0% {
    opacity: 0;
  }

  90% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes form-entry {
  0% {
    height: 0;
    width: 0;
    opacity: 0;
    padding: 0;
  }

  20% {
    height: 0;
    width: 0;
    opacity: 0;
    padding: 0;
  }

  40% {
    width: 0;
    height: 220px;
    opacity: 1;
    padding: 0;
  }

  100% {
    height: 220px;
    width: 500px;
  }
}

.signup-content{
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -250px;
    margin-top: -220px;
    height: 375px;
    z-index: 6;
    border-radius: 4px;
    width: 500px;
    padding: 12px 30px 30px 30px;
}

.signup-close{
    position: absolute;
    right: 27px;
    top: 18px;
    cursor: pointer;
}

.signup-title{
    font-size: 18px;
    color: rgb(6, 106, 117);
    padding-bottom: 10px;
    font-family: 'FranchiseRegular','Arial Narrow',Arial,sans-serif;
    font-weight: bold;
    text-align: center;
}

.signup-title:after{
    content: ' ';
    display: block;
    width: 100%;
    height: 2px;
    margin-top: 10px;
    background: linear-gradient(left, rgba(147,184,189,0) 0%,rgba(147,184,189,0.8) 20%,rgba(147,184,189,1) 53%,rgba(147,184,189,0.8) 79%,rgba(147,184,189,0) 100%);
}

.signup-content p{
    margin-bottom: 15px;
}

.signup-content label{
    color: rgb(64, 92, 96);
    position: relative;
}

.uname:after{
    content: attr(data-icon);
    font-family: 'FontomasCustomRegular';
    color: rgb(106, 159, 171);
    position: absolute;
    left: 10px;
    top: 35px;
    width: 30px;
}

.signup-content input:not([type="checkbox"]){
    width: 92%;
    margin-top: 4px;
    padding: 10px 5px 10px 32px;
    border: 1px solid rgb(178, 178, 178);
    box-sizing: content-box;
    border-radius: 3px;
    box-shadow: 0px 1px 4px 0px rgba(168, 168, 168, 0.6) inset;
    transition: all 0.2s linear;
}

.signup-content input[type="submit"]{
    padding: 10px 5px!important;
    width: 98%!important;
}

input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #4c4c4c!important;
    }
</style>