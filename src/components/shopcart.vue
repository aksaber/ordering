<template>
	<div class="shopcart">
		<div class="shopcart-content" @click="showToggle">
			<div class="shop-left">
				<div class="shop-logo">
					<div class="shopLogo">
						<span class="glyphicon glyphicon-shopping-cart" style="font-size: 24px;top: 10px;"></span>
					</div>
					<div class="shop-num" v-show="totalCount > 0">{{totalCount}}</div>
				</div>
				<span class="shop-price">￥{{totalPrice}}元</span>
				<span class="shop-desc">另需配送费￥{{gSeller.deliveryPrice}}元</span>
			</div>
			<div class="shop-right">
				<div @click.stop.prevent="createOrder" class="shop-pay" :class="{'highlight':totalCount > 0 && isEnough}">{{payDesc}}</div>
			</div>
		</div>
		<transition name="fold">
			<div class="shop-detail" v-show="shopList && totalCount > 0">
				<div class="shop-detail-header">
					<span class="shop-detail-title">购物车</span>
					<span class="shop-detail-empty" @click="empty">清空</span>
				</div>
				<div class="shop-detail-content">
					<ul>
						<li v-for="food in selectFoods" class="shop-detail-food">
							<span class="selected-name">{{food.name}}</span>
							<div class="selected-price">
								<span>{{food.price * food.count}}</span>
							</div>
							<div class="selected-cartcontrol">
								<cartcontrol :food="food"></cartcontrol>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import cartcontrol from './cartcontrol';
	export default{
		data() {
			return {
				shopList: false,
				food: {},
			}
		},
		components: { cartcontrol },
		props: {
			selectFoods: {  //遍历过的一个个菜品
				type: Array
			},
			gSeller: {

			},
		},
		methods: {
			empty() {
				this.selectFoods.forEach((food) => { //遍历已选择的商品并设为0
					food.count = 0;
				});
			},
			showToggle() {
				$('.shopcart').bind("selectstart", function () { return false; });
				this.shopList = !this.shopList;
			},
			createOrder() {
				if(this.payDesc == '去结算'){
					this.$emit("cOrder");
				}else{
					alert("未达到起送价！");
				}
			}
		},
		computed: {
			totalCount() {
				var count = 0;
				this.selectFoods.forEach((food) => { //把菜品都变成数量
					count += food.count;
				});
				return count;
			},
			totalPrice() {
				var price = 0;
				this.selectFoods.forEach((food) => {
					price += food.price * food.count;
				});
				return price;
			},
			payDesc() {  //计算是否能结算
				var totalPrice = this.totalPrice;
				var minPrice = this.gSeller.minPrice;
				return totalPrice >= minPrice ? '去结算' : '还差' + (minPrice - totalPrice) + '元';
			},
			isEnough() {
				var totalPrice = this.totalPrice;
				var minPrice = this.gSeller.minPrice;
				if(totalPrice >= minPrice){
					return true;
				}else{
					return false;
				}
			}
		},
	};
</script>

<style>
.shopcart{
	position: absolute;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    color: #fff;
}

.shopcart-content{
	display: flex;
	background: url("../../static/img/banner.jpg");
}

.shop-left{
	flex: 1;
}

.shop-logo{
	display: inline-block;
	position: relative;
    margin: 0 12px;
    margin-top: -10px;
    padding: 6px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    vertical-align: top;
    border-radius: 50%;
    background: #d2c4da;
}

.shopLogo{
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background: rgb(152, 100, 208);
	box-shadow: inset 0 0 5px rgba(239, 225, 225, 0.95);
	text-align: center;
}

.shop-num{
	position: absolute;
    top: 0;
    right: 3px;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 500;
    color: #fff;
    background: #ec4341ad	;
}

.shop-price{
	color: #535886;
	display: inline-block;
    vertical-align: top;
    margin-top: 12px;
    line-height: 24px;
    box-sizing: border-box;
    padding-right: 12px;
    border-right: 1px solid rgba(255,255,255,0.1);
    font-size: 16px;
    font-weight: 700;
}

.shop-desc{
	color: #535886;
	display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin: 12px 0 0 12px;
    font-size: 12px;
}

.shop-right{
	flex: 0 0 105px;
    width: 105px;
}

.shop-pay{
	color: #535886;
	height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
}

.shop-detail{
	position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0);
}

.fold-enter-active, .fold-leave-active{
	transition: all 0.3s linear;
}

.fold-enter, .fold-leave-active{
	transform: translate3d(0, 0, 0);
}


.shop-detail-header{
	color: #000;
	height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background: #f3f5f7;
    overflow: hidden;
    border-bottom: 1px solid #d9ccf7;
}

.shop-detail-content{
	color: #000;
	padding: 0 18px;
    max-height: 217px;
    background: #fff;
    overflow: auto;
}

.shop-detail-title{
	float: left;
	font-weight: 600;
	font-size: 14px;
	color: #07111b;
}

.shop-detail-empty{
	float: right;
    font-size: 12px;
    color: #00a0dc;
    cursor: pointer;
}

.shop-detail-food{
	padding: 12px 0;
    box-sizing: border-box;
    position: relative;
}

.shop-detail-food:after{
	display: block;
    position: absolute;
    left: 0;
    bottom: 2px;
    width: 100%;
    border-top: 1px solid rgb(228, 223, 243);
    content: '';
}

.selected-name{
	line-height: 24px;
    font-size: 14px;
    color: #07111b;
}

.selected-price{
	position: absolute;
    right: 90px;
    bottom: 12px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 700;
    color: #f01414;
}

.highlight{
	background: #10b50dad;
	color: #fff;
}

</style>