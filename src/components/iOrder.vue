<template>
	<div class="iOrder">
		<div class="iMessage-title">订单中心</div>
		<div class="iAddress-content">
			<div class="iAddress-item" v-for="(item, index) in orderArr" @click="showOrder(index)">
				<div class="iAddress-name">商家：{{item.seller}}</div>
				<div class="iAddress-address">状态：<span>{{item.status}}</span></div>
				<div class="iAddress-tel">下单时间：{{item.createTime}}</div>
				<div class="iAddress-tel">备注信息：{{item.remark}}</div>
			</div>
		</div>
		<div v-if="orderShow == index" v-for="(item, index) in orderArr" class="statusfor">
			<div class="status-title">
				生成订单<span class="status-close" @click="orderShow = -1">×</span>
			</div>
				<div class="status-content">
					<div class="status-titles"><span class="status-margin">订单状态：</span><span class="status-orderSpan">{{item.status}}</span></div>
					<div class="status-titles status-seller" :id="item.id"><span class="status-margin">商家：</span><span class="status-titleSpan">{{item.seller}}</span></div>
					<div class="status-titles"><span class="status-margin">备注信息：</span><span class="status-titleSpan">{{item.remark}}</span></div>
					<div class="status-titles line"><span class="status-margin">下单时间：</span><span class="status-titleSpan">{{item.createTime}}</span></div>
					<div class="status-titles status-goods">
						<ul>
							<table class="table table-striped">
								<thead>
									<tr>
										<th>菜名</th>
										<th>数量</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="items in item.goods">
										<td>
											<span>{{items.name}}</span>
										</td>
										<td>
											<span>{{items.count}}件</span>
										</td>
									</tr>
								</tbody>
							</table>
						</ul>
					</div>
					<button class="status-confirm btn btn-success" type="button" @click="confirmFun" data-toggle="collapse" data-target="#collapseExample" v-show="item.status == '已接单' || item.status == '未接单'">确认订单</button>
					<div class="status-price"><span class="status-margin">总额：</span><span class="status-priceSpan">￥{{item.totalPrice}}</span></div>
					<div class="collapse" id="collapseExample">
						<textarea autofocus></textarea>
						<button class="btn btn-primary evaluate" @click="evaluateFun">提交评价</button>
					</div>
				</div>
		</div>
		<!-- <textarea v-if="textArea"></textarea> -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				orderShow: -1,
				textArea: false,
			}
		},
		props: {
			orderArr: Array
		},
		methods: {
			showOrder(index) {
				this.orderShow = index;
			},
			confirmFun() {
				if($(".status-orderSpan").html() == "未接单"){
					alert("商家还未接单，请稍等。");
					$("#collapseExample").hide();
					return;
				}else if($(".status-orderSpan").html() == "已接单"){
					this.textArea = true;
				}else if($(".status-orderSpan").html() == "已完成"){
					alert("订单已完成！");
					$("#collapseExample").hide();
					return;
				}
			},
			evaluateFun() {
				var self = this;
				var time = new Date().getTime();
				var sellerId = $(".status-seller").attr("id");
				this.$http.post('/api/users/addEvaluate', {
					"evaluate": $("#collapseExample textarea").val(),
					"id": sellerId
				}).then((res) => {
					self.$http.post('/api/aratings/addArating', {
						"evaluate": $("#collapseExample textarea").val(),
						"id": sellerId,
						"time": time
					}).then((res) => {
						alert("评价成功！");
						$("#collapseExample").hide();
						self.$http.get('/api/users/finalEvaluate').then((res) => {
							if(res.result == 'over'){
								debugger;
								self.$emit("togglefun", 1);
							}
						});
					});
				});
			}
		}
	}
</script>

<style>
.iOrder{
	padding: 20px 18px;
}

.statusfor{
	width: 700px;
    height: 560px;
    position: fixed;
    left: 50%;
    top: 30px;
    border-radius: 4px;
    box-shadow: 0px 5px 49px #828282;
    margin-left: -350px;
    background: #fff;
    padding: 15px;
    z-index: 100;
}

.status-title{
    padding: 11px 20px 11px;
    font-size: 18px;
    font-weight: 700;
    height: 10%;
    border-bottom: 1px solid #a29595;
}

.status-content{
	padding: 11px 20px 11px;
	height: 90%;
	position: relative;
}

#collapseExample{
	position: absolute;
	bottom: 17px;
    left: 0;
}

#collapseExample textarea{
	width: 310px;
    padding: 10px;
    font-size: 15px;
    border: 1px solid #fff;
    height: 111px;
    box-shadow: 0px 9px 11px #696969;
    resize: none;
    background: #ffffff;
}

.status-titles{
	padding: 5px 0;
    font-size: 15px;
    color: #6d6b6b;
}

.status-margin{
	width: 85px;
    display: inline-block;
    text-align: right;
    margin-right: 5px;
}

.status-titleSpan{
	color: #1e6baf;
    font-size: 17px;
}

.status-orderSpan{
	color: #ef2626;
	font-size: 28px;
}

.line:after{
	content: '';
	display: block;
	margin-top: 7px;
	border-top: 1px dotted #a29595;
}

.status-price{
	float: right;
	font-size: 17px;
	margin-right: 20px;
}

.status-priceSpan{
	font-size: 24px;
	color: #ff2323;
}

.status-goods{
	height: 230px;
	overflow: auto;
	margin-bottom: 20px;
}

.status-close{
	float: right;
    font-size: 21px;
    margin-top: -5px;
    cursor: pointer;
}

.status-confirm{
	float: right;
}
</style>