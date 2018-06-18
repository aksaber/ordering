<template>
	<div class="status">
		<div class="status-title">生成订单</div>
		<div class="status-content">
			<div class="status-titles"><span class="status-margin">订单状态：</span><span class="status-orderSpan">{{status}}</span></div>
			<div class="status-titles"><span class="status-margin">商家：</span><span class="status-titleSpan">{{orderDetail.sellerName}}</span></div>
			<div class="status-titles"><span class="status-margin">备注信息：</span><span class="status-titleSpan">{{orderDetail.remark}}</span></div>
			<div>{{orderDetail.takeTime}}</div>
			<div class="status-titles line"><span class="status-margin">下单时间：</span><span class="status-titleSpan">{{orderDetail.createTime}}</span></div>
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
							<tr v-for="item in orderDetail.goods">
								<td>
									<span>{{item.name}}</span>
								</td>
								<td>
									<span>{{item.count}}件</span>
								</td>
							</tr>
						</tbody>
					</table>
				</ul>
			</div>
			<div class="status-price"><span class="status-margin">总额：</span><span class="status-priceSpan">￥{{orderDetail.totalPrice}}</span></div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			orderDetail: Object
		},
		computed: {
			address() {
				this.orderDetail.address[0].name
			},
			status() {
				if(this.orderDetail.status == "0"){
					return "待接单……";
				}else if(this.orderDetail.status == "1"){
					return "已接单";
				}else if(this.orderDetail.status == "2"){
					return "已完成";
				}
			},
		},
	}
</script>

<style>
.status{
	width: 100%;
    height: 100%;
    position: absolute;
    background: #fff;
    top: 0;
    left: 0;
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
</style>