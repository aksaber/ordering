<template>
	<div class="iAddress">
		<div class="iMessage-title">地址管理</div>
		<div class="iAddress-content" v-show="loginAddress">
			<div class="iAddress-item" v-for="(item, index) in listAddress">
				<div class="iAddress-button">
					<button @click="delFun(index)">删除</button>
				</div>
				<div class="iAddress-name">{{item.adName}}{{item.adSex}}</div>
				<div class="iAddress-address">{{item.adAddress}} {{item.adDetailAddress}}</div>
				<div class="iAddress-tel">{{item.adTel}}</div>
			</div>
			<button class="iAddress-addButton" @click="addAddress">
				+ 添加新地址
			</button>
		</div>
		<div v-show="newAddress" class="iAddress-model">
			<div class="addmodel-close" @click="closeFun">×</div>
			<div class="addmodel-title">添加新地址</div>
			<div class="addmodel-content">
				<div class="addmodel-form">
					<div>
						<div class="addmodel-field addmodel-name">
							<label>姓名</label>
							<input placeholder="请输入您的姓名" id="addmodelName"/>
							<span>{{span.name}}</span>
						</div>
						<div class="addmodel-field addmodel-sex">
							<label>性别</label>
							<div>
								<input type="radio" name="sex" value=1 id="male">
								<label for="male">先生</label>
								<input type="radio" name="sex" value=2 id="female">
								<label for="female">女士</label>
							</div>
							<span>{{span.sex}}</span>
						</div>
						<div class="addmodel-field addmodel-address">
							<label>位置</label>
							<input placeholder="请输入小区、大厦或学校" id="addmodelAddress"/>
							<span>{{span.address}}</span>
						</div>
						<div class="addmodel-field addmodel-detalAddress">
							<label>详细地址</label>
							<input placeholder="单元、门牌号" id="addmodelDetailAddress"/>
							<span>{{span.detailAddress}}</span>
						</div>
						<div class="addmodel-field addmodel-tel">
							<label>手机号</label>
							<input placeholder="请输入您的手机号" id="addmodelTel"/>
							<span>{{span.tel}}</span>
						</div>
					</div>
					<div class="addmodel-submit">
						<button @click="submitFun">保存</button>
						<button @click="closeFun">取消</button>
					</div>
				</div>
			</div>
		</div>
		<div class="fadeModal" v-show="newAddress" @click="closeFun"></div>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				newAddress: false,
				model: {
					name: '',
					sex: '',
					address: '',
					detailAddress: '',
					tel: ''
				},
				listAddress: [],
				adNumber: 0,
				loginAddress: true,
				span: {
					name: '',
					sex: '',
					address: '',
					detailAddress: '',
					tel: ''
				}
			}
		},
		created() {
			this.getAddress();
		},
		methods: {
			getAddress() {
				this.$http.get('/api/users/getAddress').then((res) => {
					if(res.body.result == '请先登录'){
						this.loginAddress = false;
					}
					this.listAddress = res.body.result.address;
					this.adNumber = res.body.result.address.length;
				});
			},
			addAddress() {
				this.newAddress = true;
			},
			closeFun() {
				this.newAddress = false;
			},
			delFun(index) {
				var self = this;
				this.$http.post('/api/users/delAddress', {
					'adNumber': index + 1
				}).then((res) => {
					if(res.body.result == '地址删除成功'){
						alert('删除成功');
						this.getAddress();
					}
				});
			},
			submitFun() {
				var self = this;
				this.model.name = $("#addmodelName").val();
				if(this.model.name == ''){
					this.span.name = '请输入姓名'
				}else{ this.span.name = '' }
				this.model.address = $("#addmodelAddress").val();
				if(this.model.address == ''){
					this.span.address = '请输入位置'
				}else{ this.span.address = '' }
				this.model.detailAddress = $("#addmodelDetailAddress").val();
				if(this.model.detailAddress == ''){
					this.span.detailAddress = '请输入详细地址'
				}else{ this.span.detailAddress = '' }
				this.model.tel = $("#addmodelTel").val();
				if(this.model.tel == ''){
					this.span.tel = '请输入手机号'
				}else{ this.span.tel = '' }
				if($("input[name='sex']")[0].checked){
					this.model.sex = '先生';
					this.span.sex = '';
				}else if($("input[name='sex']")[1].checked){
					this.model.sex = '女士';
					this.span.sex = '';
				}else{
					this.span.sex = '请选择性别'
				}
				if(!this.span.name && !this.span.sex && !this.span.address && !this.span.detailAddress && !this.span.tel){
					this.$http.post('/api/users/addAddress', {
						'adName': self.model.name,
						'adSex': self.model.sex,
						'adAddress': self.model.address,
						'adDetailAddress': self.model.detailAddress,
						'adTel': self.model.tel,
						'adNumber': self.adNumber + 1
					}).then((res) => {
						if(res.body.result == '请先登录'){
							alert('请先登录');
							return;
						}else if(res.body.result == '地址添加成功'){
							alert('地址添加成功');
						}
						self.newAddress = false;
					});
				}
				this.getAddress();
			}
		},
	}
</script>

<style>
.iAddress{
	padding: 20px 18px;
}

.iAddress-content{
	padding-top: 15px;
	overflow: hidden;
}

.iAddress-item{
	position: relative;
    display: inline-block;
    width: 242px;
    height: 110px;
    padding: 16px 12px 16px 20px;
    margin-right: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    cursor: default;
}

.iAddress-button{
	position: absolute;
    right: 12px;
    top: 14px;
}

.iAddress-addButton{
	vertical-align: top;
    padding: 0;
    text-align: center;
    background: #fcfcfc;
    color: #999;
    cursor: pointer;
    position: relative;
    display: inline-block;
    width: 242px;
    height: 110px;
    padding: 16px 12px 16px 20px;
    margin-right: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    font-size: 16px;
}

.iAddress-button button{
	font-size: 12px;
    color: #bbb;
    border: 0;
    background: 0 0;
    cursor: pointer;
    width: 30px;
    padding: 0;
}

.iAddress-model{
	position: fixed;
	top: 67.5px;
	left: 288px;
	z-index: 50;
	background: #fff;
}

.addmodel-close{
	display: inline-block;
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
    color: #ccc;
    font-size: 24px;
    line-height: 20px;
    text-align: center;
}

.addmodel-close:hover{
	color: #888;
}

.addmodel-title{
	font-size: 18px;
    font-weight: 600;
    padding: 15px;
    color: #333;
    border-bottom: 1px solid #efe8e8;
}

.addmodel-content{
	padding: 15px 15px 30px;
	overflow: hidden;
}

.addmodel-form{
	width: 760px;
	position: relative;
}

.addmodel-field{
	position: relative;
    padding-bottom: 25px;
    font-size: 14px;
}

.addmodel-field>label{
	float: left;
    display: inline-block;
    width: 65px;
    height: 38px;
    margin-right: 20px;
    line-height: 38px;
    text-align: right;
    color: #666;
    font-weight: normal;
}

.addmodel-field>input:not([type="radio"]){
	vertical-align: baseline;
    border: 1px solid #dedede;
    box-sizing: border-box;
    width: 300px;
    height: 42px;
    line-height: 38px;
    padding-left: 10px;
    border-radius: 2px;
}

.addmodel-field>span{
	position: absolute;
	bottom: 3px;
	left: 95px;
	color: red;
}

.addmodel-sex>div{
	line-height: 38px;
}

.addmodel-sex>div label{
	display: inline-block;
    margin-left: 5px;
    width: 60px;
    cursor: pointer;
    font-weight: normal;
}

.addmodel-sex>span{
	bottom: 13px!important;
}

.addmodel-submit{
	margin-left: 84px;
}

.addmodel-submit button:first-child{
	margin-right: 10px;
    border: 1px solid #0089dc;
    background-color: #0089dc;
    color: #fff;
    width: 160px;
}

.addmodel-submit button{
	font-size: 14px;
    box-sizing: border-box;
    background: 0 0;
    border: none;
    padding: 0 20px;
    color: #9f9f9f;
    height: 42px;
    border-radius: 2px;
    cursor: pointer;
}

.iAddress-item:last-child{
	cursor: pointer;
}

.iAddress-item:hover{
	border: 1px solid #0089dc;
	color: #0089dc;
}

.iAddress-item:hover .iAddress-button button{
	color: #0089dc;
}
</style>