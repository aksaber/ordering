<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">-</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add" @click.stop.prevent="addCart">+</div>
	</div>
</template>

<script>
import Vue from 'vue';
	export default{
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			addCart() {
				//频繁点击一个元素会让整行都变成蓝色,该方法是阻止浏览器的默认事件
				$('.cartcontrol').bind("selectstart", function () { return false; });
				if(!this.food.count){
					Vue.set(this.food, 'count', 1);
				}else{
					this.food.count++;
				}
				// this.$emit('add', event.target);//子组件通过$emit触发父组件的方法
			},
			decreaseCart() {
				if(this.food.count){
					this.food.count--;
				}
			}
		},
	};
</script>

<style>
.cartcontrol{
	position: absolute;
	bottom: 12px;
	right: 0;
	font-size: 0;
}

.cart-decrease, .cart-add{
	display: inline-block;
	background: #d9ccf7;
	border-radius: 50%;
	color: #fff;
	cursor: pointer;
	width: 24px;
	line-height: 24px;
	text-align: center;
	font-size: 19px;
	font-weight: 600;
	vertical-align: top;
}

.cart-decrease{
	opacity: 1;
	transform: translate3d(0, 0, 0);
}

.move-enter-active, .move-leave-active{
	transform: translate3d(0px, 0, 0);
	transition: all 0.4s linear;
}	

.move-enter,.move-leave-active{
	opacity: 0;
	transform: translate3d(24px, 0, 0);
}

.cart-count{
	display: inline-block;
	padding: 0 6px;
	color: #848484;
	font-size: 12px;
	line-height: 24px;
}

.cart-add{
}

</style>