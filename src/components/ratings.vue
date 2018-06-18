<template>
	<div class="ratings">
		<div class="rating-content">
			<div class="rating-type">
				<span class="rating-positive" :class="{'rating-highlight':selectType === 2}" @click="clickType(2)">全部<span class="rating-count">{{gRatings.length}}</span></span>
				<span class="rating-positive" :class="{'rating-highlight':selectType === 0}" @click="clickType(0)">满意<span class="rating-count">{{positives.length}}</span></span>
				<span class="rating-negative" :class="{'rating-highlight':selectType === 1}" @click="clickType(1)">不满意<span class="rating-count">{{negatives.length}}</span></span>
				<span class="rating-haveText" :class="{'haveText-highlight':onlyContent}" @click="showText"><span class="glyphicon glyphicon-tag"></span>只看有评价的内容</span>
			</div>
			<div class="rating-wrapper">
				<ul>
					<li class="rating-item" v-for="rating in gRatings" v-show="needShow(rating.rateType, rating.text)">
						<div class="rating-avatar">
							<img :src="rating.avatar" width="28" height="28"/>
						</div>
						<div class="rating-main">
							<span class="rating-name">{{rating.username}}</span>
							<div class="rating-star">
								<star :score="rating.score"></star>
							</div>
							<p class="rating-text">{{rating.text}}</p>
							<div class="rating-recommend">
								<span class="rating-recommendItem" v-for="item in rating.recommend">{{item}}</span>
							</div>
							<div class="rating-time">{{rating.rateTime | setDate}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="rating-right">
			<div class="score-top">
				<div class="rating-score">{{gSeller.score}}</div>
				<div class="score-title">综合评分</div>
				<div>高于周边商家{{gSeller.rankRate}}%</div>
			</div>
			<div class="score-bottom">
				<div class="score-wrapper">
					<span class="score-desc">服务态度</span>
					<star :score="gSeller.score"></star>
				</div>
				<div class="score-wrapper">
					<span class="score-desc">商品评分</span>
					<star :score="gSeller.score"></star>
				</div>
				<div class="score-wrapper">
					<span class="score-desc">送达时间</span>
					<span class="score-delivery">{{gSeller.deliveryTime}}分钟</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import star from './star';
import { setDate } from '../../static/js/setDate';
	export default{
		data() {
			return {
				selectType: 2,
				onlyContent: true,
			}
		},
		props: {
			gSeller: {

			},
			gRatings: {

			}
		},
		components: { star },
		computed: {
			positives() {
				return this.gRatings.filter((rating) => {
					return rating.rateType === 0;   //rateType{ 0 -> positives, 1 -> negative
				});
			},
			negatives() {
				return this.gRatings.filter((rating) => {
					return rating.rateType === 1;
				});
			},
		},
		methods: {
			clickType(index) {
				this.selectType = index;
			},
			needShow(type, text){  //type -> 全部满意不满意, text -> 是否有内容的评论
				if(this.onlyContent && !text){  //1、判断是否选中'只看有内容的评论' 与 该评论是否有内容
					return false;
				}
				if(this.selectType === 2){  //2、判断类型是否是全部
					return true;
				}else{
					return type == this.selectType;  //3、判断是否对应相应类型的评论
				}
			},
			showText() {
				this.onlyContent = !this.onlyContent;
			}
		},
		filters: {
			setDate(time) {
				var date = new Date(time);
				return setDate(date, 'yyyy-MM-dd hh:mm');
			}
		}
	};
</script>

<style>
.ratings{
	display: flex;
	margin-right: 5px;
}

.rating-content{
	flex: 1;
}

.rating-type{
	margin-top: 14px;
	font-size: 0;
	padding: 0 18px;
}

.rating-count{
	font-size: 12px;
    margin-left: 2px;
}

.rating-positive, .rating-negative{
	padding: 8px 12px;
	color: #4d555d;
	cursor: pointer;
	font-size: 14px;
	margin-right: 14px;
	border-radius: 20px;
}

.rating-positive{
	background: #5d97ff85;
}

.rating-negative{
	background: #1c5def33;
}

.rating-highlight{
	color: #fff;
	background: #4287ef;
}

.rating-haveText{
	font-size: 14px;
    margin-right: 11px;
    background: #e4e4e4;
    color: #9e9e9e;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 20px;
}

.haveText-highlight{
	color: #fff;
	background: #2d9eca;
}

.rating-wrapper{
	padding: 5px 0;
	height: 380px;
	overflow: auto;
	margin-top: 10px;
}

.rating-item{
	position: relative;
	display: flex;
	padding: 18px;
}

.rating-avatar{
	flex: 0 0 28px;
	width: 28px;
	margin-right: 12px;
}

.rating-avatar img{
	border-radius: 50%;
}

.rating-main{
	flex: 1;
	position: relative;
	padding-bottom: 15px;
}

.rating-main:after{
	display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px dotted rgba(7,17,27,0.1);
    content: '';
}

.rating-name{
	font-size: 13px;
    line-height: 12px;
    color: #07111b;
    margin-bottom: 4px;
    margin-top: 0;
}

.rating-star{
	margin-bottom: 6px;
    font-size: 0;
}

.rating-commend{
	font-size: 0;
    line-height: 16px;
}

.rating-recommendItem{
	padding: 0 6px;
    border: 1px solid rgba(7,17,27,0.1);
    border-radius: 1px;
    margin-right: 5px;
    color: #93999f;
    background: #fff;
}

.rating-time{
	position: absolute;
    right: 0;
    top: 0;
    line-height: 12px;
    font-size: 10px;
    color: #93999f;
}

.rating-right{
	flex: 0 0 217px;
	width: 217px;
	height: 100px;
	padding: 0 5px;
	margin-top: 31px;
}

.score-top{
	text-align: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
}

.rating-score{
	color: #f90;
    font-size: 24px;
    font-weight: bold;
}

.score-title{
	font-size: 17px;
}

.score-bottom{
	padding: 14px 0 6px 24px;
}

.score-wrapper{
	margin-bottom: 8px;
    font-size: 0;
}

.score-desc{
	line-height: 15px;
    display: inline-block;
    vertical-align: top;
    font-size: 12px;
    color: #07111b;
}

.score-delivery{
	font-size: 12px;
    color: #93999f;
    margin-left: 12px;
    line-height: 15px;
    display: inline-block;
    text-align: center;
    width: 99px;
}

.score-wrapper .star{
	padding: 0 12px;
	line-height: 10px
}
</style>