<template>
	<div class="star">
		<span class="star-item" v-for="item in scoreNumber" :class="item"></span>
	</div>
</template>

<script>
    const LENGTH = 5;
    const CLS_ON = "on";
    const CLS_HALF = "half";
    const CLS_OFF = "off";
	export default{
		props: {
			score: {
				
			}
		},
		computed: {
			scoreNumber() {
				let result = [];
				let score = Math.floor(this.score * 2) / 2;  // 2.3 -> 2, 2.7 -> 2.5
				let hasDecimal = score % 1 !== 0;
				let integer = Math.floor(score);  // 2.7 -> 2
				for(let i = 0; i < integer; i++){
					result.push(CLS_ON);
				}
				if(hasDecimal){
					result.push(CLS_HALF);
				}
				while(result.length < LENGTH){
					result.push(CLS_OFF);
				}
				return result;
			},
		},
	};
</script>

<style>
.star{
	font-size: 0;
	display: inline-block;
    vertical-align: top;
    margin-right: 6px;
}

.star-item{
	display: inline-block;
	width: 15px;
	height: 15px;
	margin-right: 6px;
	background-size: 15px 15px;
	background-repeat: no-repeat;
}

.star-item:last-child{
	margin-right: 0;
}

.star .on{
	background-image: url(../../static/img/star_on.png);
}

.star .half{
	background-image: url(../../static/img/star_half.png);
}

.star .off{
	background-image: url(../../static/img/star_off.png);
}
</style>