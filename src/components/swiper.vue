<template>
	<section class="pc-banner">
	    <div class="swiper-container">
	        <div class="swiper-wrapper">
	            <div class="swiper-slide" v-for="item in imgs"><a><img :src="item.img" width="657" height="281" :id="item.id"></a></div>
	        </div>
	    </div>
        <div class="swiper-pagination"></div>
	    <div class="button">
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
        <goods :gGoods="gGoods" :gSeller="gSeller" :gRatings="gRatings" :showGoods="showGoods" :listHeight="listHeight" :gCollect="gCollect" @close="closeGoods" @collectFun="collectFun"></goods>
    </section>
</template>

<script>
import Swiper from '../../static/js/swiper.min.js';
import star from './star';
import goods from './goods';
	export default {
		data() {
			return {
				imgs: [
						{"img": "../../static/img/002.png", "id": "002"},
						{"img": "../../static/img/001.png", "id": "001"},
						{"img": "../../static/img/003.jpg", "id": "003"},
						{"img": "../../static/img/004.jpg", "id": "004"},
						{"img": "../../static/img/4.jpg", "id": "005"}
					  ],
				showGoods: false,
				gSeller: [],
				gGoods: [],
				gRatings: [],
				listHeight: [],
				gCollect: false,
			}
		},
		props: {
			seller: {

			}
		},
		components: { star, goods },
		mounted() {
			var self = this;
			var swiper = new Swiper('.swiper-container',{
				autoplay:3000,
				speed:1000,
				effect:'coverflow',
				direction:'horizontal',
				autoplayDisableOnInteraction : false,
				loop:true,
				centeredSlides : true,
				slidesPerView:2,
				pagination : '.swiper-pagination',
				paginationClickable:true,
				preventLinksPropagation: true,
				prevButton:'.swiper-button-prev',
				nextButton:'.swiper-button-next',
				onInit:function(swiper){
					swiper.slides[2].className="swiper-slide swiper-slide-active";
				//第一次打开不要动画
				},
				onClick: function(swiper) {
					var id = $(".swiper-slide-active a img")[0].id; //获取当前ID
					self.showMenu(id);
				},
				breakpoints: {
					668: {
						slidesPerView: 1,
					}
				}
			});
		},
		methods: {
			showMenu(id) {
				var self = this;
		        $("body").css("overflow","hidden");
		        this.showGoods = true;
		        for(var i = 0; i < this.seller.length; i++){
		          if(id == this.seller[i].id){
		            this.gSeller = this.seller[i];
		          }
		        }
		        $.ajax({
		          url: '/api/afood',
		          type: 'post',
		          async: false,
		          data: {
		            'foodId': this.gSeller.id
		          },
		          success: function(res) {
		            self.gGoods = res.result[0].foods;
		          }
		        });
		        $.ajax({
		          url: '/api/aratings',
		          type: 'post',
		          async: false,
		          data: {
		            'ratingsId': this.gSeller.id
		          },
		          success: function(res) {
		            self.gRatings = res.result[0].ratings;
		          }
		        });
		        this.calculateHeight();
			},
			calculateHeight() {
	          var self = this;
	          $.ajax({url: '/api/users/findCollect', type: 'get', async: false, success: function(res) {
	            var collectArr = res.result.collections;
	            for(var item in collectArr){
	              if(self.gSeller.id == collectArr[item]){
	                self.gCollect = true;
	                return;
	              }else{
	                self.gCollect = false;
	              }
	            }
	          }});
	          var height = 0;
	          for(var i = 0; i < self.gGoods.length; i++){ //有多少个大类别的菜品
	              var height1 = self.gGoods[i].foods.length * 128 + 30; //每个大类别下的菜品数量
	              height += height1;
	              self.listHeight.push(height);
	          }
		    },
	      closeGoods() { //子组件让父组件执行此事件，关闭goods
	          $("body").css("overflow","auto");
	          this.showGoods = !this.showGoods;  //隐藏菜单框
	      },
	      collectFun(flag) {
	        this.gCollect = flag;
	      }
		}
	};
</script>

<style>
@import '../../static/css/swiper.min.css';
@import '../../static/css/swiper.css';
</style>