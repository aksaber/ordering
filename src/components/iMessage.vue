<template>
	<transition name="fade">
		<div class="iMessage">
			<div class="i-bar">
				<ul class="i-sidebar">
					<li @click="toggle(1)">我的订单</li>
					<li @click="toggle(2)">我的地址</li>
					<li @click="toggle(3)">我的收藏</li>
				</ul>
				<div class="i-content">
					<iOrder v-show="showPage === 1" :orderArr="orderArr" @togglefun="togglefun"></iOrder>
					<iAddress v-show="showPage === 2"></iAddress>
					<iCollection v-show="showPage === 3"></iCollection>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import iOrder from './iOrder';
import iAddress from './iAddress';
import iCollection from './iCollection';

export default{
	data() {
		return {
			showPage: 0,
			orders: [],
			seller: [],
			orderArr: []
		}
	},
	components: { iOrder, iAddress, iCollection },
	methods: {
		toggle(index) {
			var self = this;
			this.showPage = index;
			if(index == 1){
				this.orders = [];
				this.orderArr = [];
				this.$http.get('/api/aseller').then((res) => {
		            self.seller = res.body.result;
		        });
				this.$http.get('/api/users/getAddress').then((res) => {
					self.orders = res.body.result.orders;
					var a = "";
					for(var i = 0; i < self.orders.length; i++) {
						var orderi = {};
						if(self.orders[i].status == "0"){  //状态翻译成未接单等
							a = "未接单";
							orderi.status = a;
						}else if(self.orders[i].status == "1"){
							a = "已接单";
							orderi.status = a;
						}else if(self.orders[i].status == "2"){
							a = "已完成"
							orderi.status = a;
						}
						orderi.createTime = self.orders[i].createTime;  //下单时间
						orderi.remark = self.orders[i].remark;  //备注信息
						orderi.goods = self.orders[i].goods;  //菜品
						orderi.takeTime = self.orders[i].takeTime;  //完成时间
						orderi.totalPrice = self.orders[i].totalPrice;  //总额
						for(var j = 0; j < self.seller.length; j++) {
							if(self.orders[i].id == self.seller[j].id){
								orderi.seller = self.seller[j].name; //通过id获取商家名称
								orderi.id = self.seller[j].id; //id也要
								continue;
							}
						}
						self.orderArr.push(orderi);
					}
				});
			}
		},
		togglefun(index) {
			this.toggle(index);
		}
	},
};
</script>

<style>
	.iMessage{
		opacity: 1;
		width: 100%;
		width: 85%;
		margin: 0 auto;
	}

	.iMessage-title{
	    border-bottom: 2px solid #f4f4f4;
        padding: 0 20px 11px;
        font-size: 18px;
        font-weight: 700;
    }

	.fade-enter-active, .fade-leave-active{
		transition: all 0.2s linear;
	}

	.fade-enter, .fade-leave-active{
		opacity: 0;
	}

	.i-bar{
		padding-top: 50px;
	}

	.i-bar:after{
		content: '';
		display: block;
		clear: both;
	}

	.i-sidebar{
		float: left;
		width: 170px;
	}

	.i-sidebar li{
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 40px;
		text-align: center;
		cursor: pointer;
	}

	.i-content{
		margin-left: 170px;
		background: #fff;
		overflow: hidden;
	}
</style>