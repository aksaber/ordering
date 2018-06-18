<template>
	<transition name="fade">
		<div class="goods" v-if="showGoods">
			<div class="goods-content">
				<div class="goods_title">
					<img :src="gSeller.img" />
					<span class="goods_name">{{gSeller.name}}</span>
					<span class="glyphicon glyphicon-remove goods-close" @click="closeGoods"></span>
					<span class="goods_bulletin">{{gSeller.bulletin}}</span>
					<span class="glyphicon glyphicon-heart goods-collect" title="收藏商家" @click="collectFun" :class="{'collectCss':gCollect}"></span>
				</div>
				<div class="goods_banner">
					<a href="javascript:;" @click="toggle(1)"><span :class="{'goods-bannerLine':toggleIndex === 1}">商品</span></a>
					<a href="javascript:;" @click="toggle(2)"><span :class="{'goods-bannerLine':toggleIndex === 2}">评论</span></a>
					<a href="javascript:;" @click="toggle(3)"><span :class="{'goods-bannerLine':toggleIndex === 3}">商家</span></a>
				</div>
				<div class="goods_content" v-show="toggleIndex === 1">
					<div class="menu-wrapper">
						<ul>
							<li v-for="(item, index) in gGoods" @click="selectMenu(index)" :class="{'current':currentIndex === index}">{{item.name}}</li>
						</ul>
					</div>
					<div class="foods-wrapper">
						<ul>
							<li v-for="item in gGoods" class="foodsId">
								<ul>
									<div class="foodsTitle">{{item.name}}</div>
									<ul>
										<li v-for="food in item.foods" class="food-item">
											<div class="food-img">
												<img :src="food.image" width="95" height="95" />
											</div>
											<div class="food-content">
												<div class="food-name">{{food.name}}</div>
												<div class="food-desc">{{food.description}}</div>
												<div class="food-extra">
													<span>月售 {{food.sellCount}} 份</span><span> 好评率 {{food.rating}}%</span>
												</div>
												<div class="food-price">￥{{food.price}}</div>
												<cartcontrol :food="food"></cartcontrol>
											</div>
										</li>
									</ul>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<shopcart @cOrder="createOrder" :selectFoods="selectFoods" :gSeller="gSeller" v-show="toggleIndex === 1"></shopcart>
			<ratings :gSeller="gSeller" :gRatings="gRatings" v-show="toggleIndex === 2"></ratings>
			<seller :gSeller="gSeller" v-show="toggleIndex === 3"></seller>
			<order v-show="orderShow" :selectFoods="selectFoods" :gSeller="gSeller" @hideOrder="hideOrder"></order>
		</div>
	</transition>
</template>

<script>
import cartcontrol from './cartcontrol';
import shopcart from './shopcart';
import ratings from './ratings';
import seller from './seller';
import order from './order';
	export default {
		data() {
			return {
				goodsName: "",
				foodsHeight: 0, //滚动的位置 
				scrollTop: 0,
				currentIndex: 0,
				toggleIndex: 1,
				orderShow: false,
			}
		},
		components: { cartcontrol, shopcart, ratings, seller, order },
		updated() {
			this.$nextTick(() => {
				var self = this;
				$(".foods-wrapper").on("scroll", function(){  //滚动定位
					self.scrollTop = $(".foods-wrapper").scrollTop();
					for(var i = 0; i < self.listHeight.length; i++){
						var height1 = self.listHeight[i];
						var height2 = self.listHeight[i+1];
						if(!height2 || (self.scrollTop >= height1 && self.scrollTop < height2)){
							self.currentIndex = i+1;
							return
						}else if(self.scrollTop < height1){
							self.currentIndex = i;
							return
						}
					}
				});
			});
		},
		computed: {
			selectFoods() {
				var foods = [];
				this.gGoods.forEach((good) => {  //遍历kfc里的大类别菜单
					good.foods.forEach((food) => {  //遍历kfc里每个大类别菜单中的所有菜品
						if(food.count){  //如果food.count已经被创建 Vue.set(this.food, 'count', 1)
							foods.push(food);  //selectFoods是一个个被选中的菜品
						}
					});
				});
				return foods;
			},
		},
		props: {
			gSeller: {
				
			},
			gGoods: {
				type: Array
			},
			gRatings: {

			},
			showGoods: {  //是否显示goods菜单

			},
			listHeight: {
				type: Array
			},
			gCollect: {}
		},
		// watch: {
		// 	'isGoods': function(curVal, oldValue) { //如果观察到isGoods数据有变化，则执行这个function
		// 		this.showGoods = curVal;
		// 	}
		// },
		methods: {
			selectMenu(index) {
				this.foodsHeight = 0;
				if(index > 0){
					for(var i = 0; i < index; i++){
						this.foodsHeight += $(".foodsId").eq(i).height();
					}
				}
				$(".foods-wrapper").stop(true).animate({scrollTop: this.foodsHeight + 'px'}, 400);
			},
			closeGoods() {
				this.$emit('close', this.showGoods);// 子组件通知父组件去执行事件进而改变this.showGoods
			},
			toggle(index){  //切换商品、评论、商家
				if(index == 1){
					this.toggleIndex = 1;
				}else if(index == 2){
					this.toggleIndex = 2;
				}else if(index == 3){
					this.toggleIndex = 3;
				}
			},
			createOrder() {
				this.orderShow = true;
			},
			hideOrder() {
				this.orderShow = false;
			},
			collectFun() {
				var self = this;
				if(!this.gCollect){
					this.$http.post("/api/users/collect", {
						'collection': this.gSeller.id
					}).then((res) => {
						if(res.body.result == '收藏成功'){
							alert('收藏成功');
							self.$emit("collectFun", true);
						}
					});
				}else{
					this.$http.post("/api/users/delCollect", {
						'collection': this.gSeller.id
					}).then((res) => {
						if(res.body.result == '取消收藏'){
							self.$emit("collectFun", false);
						}
					});
				}
			}
		},
	};
</script>

<style>
.goods{
	position: fixed;
    left: 50%;
    top: 30px;
    border-radius: 4px;
    margin-left: -350px;
    animation: goods-entry 1s ease-in-out;
    width: 700px;
    height: 560px;
    padding: 10px;
    background: #fff;
    z-index: 40;
    opacity: 1;
    overflow: hidden;
}

.goods-content{
	animation: content-entry 1s ease-in-out;
}

.fade-enter-active, .fade-leave-active{
	transition: all 0.2s linear
}

.fade-enter, .fade-leave-active{
	opacity: 0;
}

.goods_title{
	height: 75px;
	padding: 6px 0 0 15px;
	position: relative;
}

.goods_title img{
	width: 65px;
	height: 65px;
	border-radius: 50%;
}

.goods_name{
	font-size: 20px;
	font-weight: bold;
	margin-left: 25px;
}

.goods_bulletin{
	margin-left: 30px;
	font-size: 14px;
	text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 79px;
    width: 540px;
}

.goods-collect{
	float: right;
    margin-right: 20px;
    margin-top: 23px;
    font-size: 18px;
    color: #a09f9f;
    cursor: pointer;
}

.goods-close{
	float: right;
	font-size: 14px;
	cursor: pointer;
	color: #c5bdd8;
}

.goods_banner{
	display: flex;
	margin-top: 5px;
}

.goods_banner a{
	color: #2c3e50;
	flex: 1;
	text-align: center;
	font-size: 16px;
	line-height:30px;
}

.goods_banner a:nth-child(2){
	border-left: 1px solid #ccc;
	border-right: 1px solid #ccc;
}

.goods_banner span{
	padding: 0 17px 6px 17px;
}

.goods-bannerLine{
	border-bottom: 2px solid #c7baf2;
}

.goods_content{
	display: flex;
	width: 100%;
	overflow: hidden;
	margin-top: 10px;
	height: 372px;
	position: relative;
}

.menu-wrapper{
	flex: 0 0 156px;
	width: 156px;
}

.menu-wrapper li{
	padding: 9px 12px;
	font-size: 15px;
	display: block;
	cursor: pointer;
	margin-bottom: 2px;
	border: 1px solid #fff;
}

.menu-wrapper li:hover{
	border: 1px solid #ccc;
	box-shadow: inset 0 0 30px rgb(220, 208, 248);
	border-radius: 4px;
}

.foods-wrapper{
	flex: 1;
	height: 372px;
	padding-left: 10px;
	padding-right: 13px;
	overflow: auto;
}

.foodsId .food-item:last-child{
	margin-bottom: 0!important;
}

.foodsTitle{
	padding-left: 14px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    border-radius: 4px;
    color: #5f659c;
    background: linear-gradient(to left, #d8cbf7, #fff);
}

.food-item{
	display: flex;
	margin: 10px 18px;
    padding-bottom: 18px;
    position: relative;
}

.food-item:after{
	display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #d8cbf7;
    content: '';
}

.foodsId .food-item:last-child:after{  /* 最后一个food-item的after伪类 */
	content: none;
}

.food-img{
	flex: 0 0 95px;
	margin-right: 20px;
	transition: transform .3s;
}

.food-img:hover{
	transform: scale(1.1,1.1);
}

.food-content{
	flex: 1;
	padding-top: 20px;
}

.food-name{
	margin: 2px 0 8px 0;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    color: #07111b;
}

.food-desc{
	margin-bottom: 8px;
    line-height: 12px;
    font-size: 12px;
    color: #93999f;
}

.food-extra{
	line-height: 12px;
    font-size: 12px;
    color: #93999f;
}

.food-price{
	margin-right: 8px;
    font-size: 14px;
    color: #f01414;
    line-height: 24px;
    font-weight: 700;
}

.current{
	border: 1px solid #ccc!important;
	color: #58627d;
	border-radius: 4px;
	box-shadow: inset 0 0 10px rgb(224, 213, 248);
}

.collectCss{
	color: #f74342;
}

@keyframes goods-entry {
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
    height: 560px;
    opacity: 1;
    padding: 0;
  }

  100% {
    height: 560px;
    width: 700px;
  }
}

@keyframes content-entry {
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
</style>