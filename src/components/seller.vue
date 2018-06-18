<template>
	<div class="seller">
		<div>
		<div class="seller-view">
			<div class="seller-title">{{gSeller.name}}</div>
			<div class="seller-desc">
				<star :score="gSeller.score"></star>
				<span class="seller-count">({{gSeller.ratingCount}})</span>
				<span class="seller-count">月售{{gSeller.sellCount}}单</span>
			</div>
			<ul class="seller-remark">
				<li class="seller-block">
					<div class="seller-h2">起送价</div>
					<div class="seller-content"><span class="seller-stress">{{gSeller.minPrice}}</span>元</div>
				</li>
				<li class="seller-block">
					<div>商家配送</div>
					<div class="seller-content"><span class="seller-stress">{{gSeller.deliveryPrice}}</span>元</div>
				</li>
				<li class="seller-block">
					<div>平均配送时间</div>
					<div class="seller-content"><span class="seller-stress">{{gSeller.deliveryTime}}</span>元</div>
				</li>
			</ul>
		</div>
		<div class="split"></div>
		<div class="seller-bulletin">
			<div class="seller-title">公告与活动</div>
			<div class="seller-contentWrapper">
				<p>{{gSeller.bulletin}}</p>
			</div>
			<div class="seller-supports">
				<li class="support-item" v-for="(item, index) in gSeller.supports">
					<span>{{item.description}}</span>
				</li>
			</div>
		</div>
		<div class="split"></div>
		<div class="seller-pics">
			<div class="seller-title">商家实景</div>
			<div class="seller-picWrapper">
				<ul class="pic-list">
					<li class="pic-item">
						<img src="../../static/img/1.jpg"  width="120" height="90" />
					</li>
				</ul>
			</div>
		</div>
		<div class="split"></div>
		<div class="seller-info">
			<div class="seller-title">商家信息</div>
			<ul>
				<li class="info-item" v-for="item in gSeller.infos">{{item}}</li>
			</ul>
		</div>
	</div>
	</div>
</template>

<script>
import star from './star';
	export default {
		props: {
			gSeller: {

			},
		},
		components: { star },
	};
</script>

<style>
.seller{
	overflow: hidden;
	padding: 16px;
	height: 450px;
	width: 100%;
}

.seller>div{
	overflow: auto;
	height: 417px;
}

.seller-view{
	position: relative;
	padding: 0 18px 18px 18px;
}

.seller-title{
	line-height: 14px;
    margin-bottom: 8px;
    color: #07111b;
    font-size: 14px;
    font-weight: bold;
}

.seller-desc{
	padding-bottom: 18px;
    font-size: 0;
    position: relative;
}

.seller-desc:after{
	display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid rgba(7,17,27,0.1);
    content: '';
}

.seller-count{
	display: inline-block;
    line-height: 18px;
    vertical-align: top;
    margin-right: 12px;
    font-size: 10px;
    color: #4d555d;
}

.seller-remark{
	display: flex;
    padding-top: 18px;
}

.seller-block{
	flex: 1;
    text-align: center;
    border-right: 1px solid rgba(7,17,27,0.1);
}

.seller-h2{
	margin-bottom: 4px;
    line-height: 10px;
    font-size: 10px;
    color: #93999f;
}

.seller-content{
	line-height: 24px;
    font-size: 10px;
    color: #07111b;
}

.seller-stress{
	font-size: 24px;
}

.seller-bulletin{
	padding: 18px;
}

.seller-contentWrapper{
	padding: 0 12px 16px 12px;
    position: relative;
}

.seller-contentWrapper:after{
	display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid rgba(7,17,27,0.1);
    content: '';
}

.seller-contentWrapper p{
	line-height: 24px;
    font-size: 12px;
    color: #f01414;
}

.seller-supports{

}

.support-item{
	padding: 16px 12px;
    font-size: 0;
    position: relative;
}

.support-item:after{
	display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid rgba(7,17,27,0.1);
    content: '';
}

.support-item span{
	line-height: 16px;
    font-size: 12px;
    color: #07111b;
}

.seller-pics{
	padding: 18px;
}

.seller-picWrapper{
	width: 100%;
    overflow: hidden;
    white-space: nowrap;
}

.pic-list{
	width: 498px;
	font-size: 0;
}

.pic-item{
	display: inline-block;
    margin-right: 6px;
    width: 120px;
    height: 90px;
}

.seller-info{
	padding: 18px 18px 0 18px;
    color: #07111b;
}

.info-item{
	padding: 16px;
    line-height: 16px;
    position: relative;
    font-size: 12px;
}

.info-item:after{
	display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid rgba(7,17,27,0.1);
    content: '';
}
</style>