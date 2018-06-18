<template>
	<div class="order">
		<div class="order-top">
			<div class="order-title">
				订单详情<span @click="hideOrder">< 返回商家修改</span>
			</div>
			<div class="order-goods">
				<div class="order-itemName">
					<div class="order-item order-item1">商品</div>
					<div class="order-item order-item2">份数</div>
					<div class="order-item order-item3">小计(元)</div>
				</div>
				<div class="order-table">
					<ul>
						<li v-for="food in selectFoods">
							<div class="order-foodName">{{food.name}}</div>
							<div class="order-count">{{food.count}}</div>
							<div class="order-foodPrice">￥{{food.price * food.count}}</div>
						</li>
					</ul>
				</div>
				<div class="order-delivery">配送费￥{{gSeller.deliveryPrice}}</div>
				<div class="order-price"></div>
			</div>
		</div>
		<div class="order-bottom">
			<div class="order-title">收货地址</div>
			<div class="order-address">
				<ul>
					<li v-for="(item, index) in listAddress" @click="selectAddress(index)" :class="{'selectHigh':isSelect === index}">
						<span class="address-img"><img src="../../static/img/gps.png" width="12" height="16" /></span>
						<div class="address-item">
							<span class="address-name">{{item.adName}}{{item.adSex}} {{item.adTel}}</span>
							<span class="address-address">{{item.adAddress}}{{item.adDetailAddress}}</span>
						</div>
						<span class="address-edit">选择地址</span>
					</li>
				</ul>
			</div>
			<div class="order-title">其他信息</div>
			<div class="otherInfo">
				<span class="otherInfo-title">配送方式</span>
				<span>本订单由 [店家配送] 提供配送</span>
			</div>
			<div class="otherInfo">
				<span class="otherInfo-title">订单备注</span>
				<span><input class="otherInfo-input" type="text" placeholder="请填写嘱咐店家的话，如多加辣" /></span>
			</div>
			<div class="order-pay">
				<span>应付金额<span class="order-yen">￥</span><span class="order-money">{{totalPrice}}</span></span>
				<button @click="playOrder">确认下单</button>
			</div>
		</div>
		<status v-show="showOrder" :orderDetail="orderDetail"></status>
	</div>
</template>

<script>
import status from './status';
	export default{
		data() {
			return {
				listAddress: [],
				isSelect: '',
				showOrder: false,
				orderDetail: {}
			}
		},
		props: {
			selectFoods: {

			},
			gSeller: {

			}
		},
		components: { status },
		created() {
			this.$http.get('/api/users/getAddress').then((res) => {
				this.listAddress = res.body.result.address;
			});
		},
		methods: {
			hideOrder() {
				this.$emit('hideOrder');
			},
			selectAddress(index) {
				this.isSelect = index;
			},
			playOrder() {
				var self = this;
				var time = new Date();
				var year = time.getFullYear();
				var month = time.getMonth() + 1;
				var day = time.getDate();
				var hours = time.getHours();
				var minutes = time.getMinutes();
				var seconds = time.getSeconds();
				var date = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
				var addressArr = {
					"name": $(".selectHigh .address-name").html().split(" ")[0],
					"tel": $(".selectHigh .address-name").html().split(" ")[1],
					"address": $(".selectHigh .address-address").html()
				}
				var selectFoods = {};
				var goodsArr = [];
				for(var i = 0; i < this.selectFoods.length; i++){
					selectFoods = {
						"name": this.selectFoods[i].name,
						"count": this.selectFoods[i].count
					}
					goodsArr.push(selectFoods);
				}
				this.$http.post('/api/users/addOrder', {
					"remark": $(".otherInfo-input").val(), //备注信息
					"createTime": date, //生成订单时间
					"goods": goodsArr, //配送的菜品与数量
					"address": addressArr, //收货地址
					"totalPrice": self.totalPrice, //总额
					"id": self.gSeller.id
				}).then((res) => {
					console.log(res);
					res = res.body.result.orders[0];
					self.orderDetail = {
						"img": self.gSeller.img,
						"sellerName": self.gSeller.name,
						"remark": res.remark,
						"status": res.status,
						"takeTime": res.takeTime,
						"totalPrice": res.totalPrice,
						"createTime": res.createTime,
						"address": res.address,
						"goods": res.goods
					}
					self.showOrder = true;

					self.$http.post('/api/orders', {
						"remark": $(".otherInfo-input").val(),
						"createTime": date,
						"goods": goodsArr,
						"address": addressArr,
						"totalPrice": self.totalPrice,
						"id": self.gSeller.id
					}).then((res) => {
						
					});
				});
			}
		},
		computed: {
			totalPrice() {
				var self = this;
				var price = 0;
				this.selectFoods.forEach((food) => {
					price += food.price * food.count;
					// self.foods += food + " ";
				});
				return price;
			},
		}
	}
</script>

<style>
.order{
	width: 700px;
	height: 560px;
	background: #fff;
	z-index: 80;
	position: absolute;
	top: 0;
	left: 0;
	padding: 10px;
}

.order-top{
	border: 1px solid #e0e0e0;
	margin-bottom: 10px;
	width: 100%;
}

.order-title{
	position: relative;
    padding: 10px 20px;
    height: 40px;
    border-bottom: 1px solid #eee;
    font-size: 15px;
    font-weight: 700;
    color: #333;
    background: #F1F1F1;
}

.order-title span{
	position: absolute;
	top: 11px;
    right: 28px;
    font-size: 12px;
    font-weight: normal;
    color: #666;
    cursor: pointer;
}

.order-goods{
	padding: 10px 4px 10px 20px;
	height: 135px;
	position: relative;
}

.order-itemName:after{
	content: '';
	display: block;
	clear: both;
}

.order-item{
	float: left;
	color: #999;
	font-weight: bold;
}

.order-item1{
	width: 300px;
}

.order-item2{
	width: 198px;
}

.order-item3{
	width: 140px;
	padding-left: 1px;
}

.order-table{
	padding-top: 7px;
	max-height: 85px;
	overflow: auto;
}

.order-foodName{
	width: 300px;
}

.order-count{
	width: 198px;
	padding-left: 8px;
}

.order-foodPrice{
	width: 140px;
}

.order-table .cart-decrease{
	width: 18px!important;
	height: 18px!important;
	line-height: 18px!important;
	font-size: 16px;
}

.order-table .cart-add{
	width: 18px!important;
	height: 18px!important;
	line-height: 18px!important;
	font-size: 16px;
}

.order-table .cart-count{
	line-height: 20px!important;
}

.order-table li{
	margin-bottom: 4px;
}

.order-table li>div{
	float: left;
}

.order-table li:after{
	content: '';
	display: block;
	clear: both;
}

.order-delivery{
	clear: both;
	position: absolute;
	bottom: 5px;
}

.order-bottom{
	border: 1px solid #e0e0e0;
	width: 100%;
	height: 347px;
	overflow: hidden;
	position: relative;
}

.address-item{
	display: inline-block;
	font-size: 12px;
}

.address-name{
	border-right: 1px solid #dad8d8;
    padding: 0 5px;
}

.address-address{
	padding: 0 5px;
}

.address-img img{
	vertical-align: top!important;
}

.selectHigh{
	background: linear-gradient(to right,#d8dada45, #eee);
}

.order-address{
	max-height: 84px;
	overflow: auto;
}

.order-address li{
	padding: 5px 10px;
	cursor: pointer;
}

.order-address li:hover{
	background: #eee;
}

.order-address li:hover .address-edit{
	display: block;
}

.address-edit{
	display: none;
	float: right;
}

.otherInfo{
	margin-top: 10px;
	padding-left: 10px;
}

.otherInfo-title{
	display: inline-block;
    margin-right: 10px;
    width: 5em;
    text-align: right;
}

.otherInfo-input{
	padding: 3px 10px;
    border: 1px solid #e0e0e0;
    outline: 0;
    color: #666;
    width: 50%;
}

.order-pay{
	position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
    opacity: .85;
    text-align: right;
    padding-top: 4px;
}

.order-pay button{
	padding: 13px 25px;
	line-height: 13px;
    font-size: 13px;
    background: #f74342;
    border: 1px solid #f74342;
    color: #fff;
    margin-right: 5px;
    margin-bottom: 5px;
}

.order-pay button:hover{
	background: #e62625;
}

.order-pay>span{
	margin-right: 10px;
	display: inline-block;
	vertical-align: middle;
}

.order-yen{
	margin-left: 5px;
}

.order-yen, .order-money{
	color: #f74342;
	font-weight: bold;
}

.order-money{
	font-size: 22px;
}
</style>