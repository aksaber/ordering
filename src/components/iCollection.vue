<template>
	<div class="iCollection">
		<div class="iMessage-title">我的收藏</div>
		<div class="content_seller">
            <div class="_seller" v-for="(item, index) in collectionArr">
                <div class="seller-border" @click="showMenu(item.id)">
                    <div class="seller_logo">
                        <img :src="item.img" width="70" height="70" />
                        <span>{{item.deliveryTime}}分钟</span>
                    </div>
                    <div class="seller_title">
                        <div class="seller_font" :title="item.name">{{item.name}}</div>
                        <star :score="item.score"></star>
                        <div class="seller-dePrice">配送费￥{{item.deliveryPrice}}</div>
                    </div>
                </div>
            </div>
        </div>
        <goods :gGoods="gGoods" :gSeller="gSeller" :gRatings="gRatings" :showGoods="showGoods" :listHeight="listHeight" :gCollect="gCollect" @close="closeGoods" @collectFun="collectFun">
        </goods>
        <transition name="modal">
            <div class="fadeModal" v-show="showGoods" @click="closeGoods"></div>
        </transition>
	</div>
</template>

<script>
import star from './star';
import goods from './goods';
	export default{
		data() {
			return {
				seller: [],
				goods: [],
				ratings: [],
				collectionArr: [],
				gSeller: [],
				gGoods: [],
				gRatings: [],
				showGoods: false,
				gCollect: false,
				listHeight: [],
			}
		},
		created() {
			this.reCollection();
		},
		components: { star, goods },
		methods: {
			reCollection() {
				var self = this;
				$.ajax({url: '/api/aseller', type: 'get', async: false, success: function(res) {
          self.seller = res.result;
        }});
				$.ajax({url: '/api/users/findCollect', type: 'get', async: false, success: function(res) {
					var collectArr = res.result.collections;
					for(var item in self.seller){
						for(var k in collectArr){
							if(self.seller[item].id == collectArr[k]){
								self.collectionArr.push(self.seller[item]);
							}
						}
					}
				}});
			},
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
        this.reCollection();
      }
		},
	}
</script>

<style>
.iCollection{
	padding: 20px 18px;
}

.iCollection .content_seller{
	border: none!important;
}

.content_seller{
  width: 100%;
  margin: 0 auto;
  display: block;
}

.seller-border{
  transition: all .2s .1s;
  cursor: pointer;
  transform: translate3d(0, 0, 0);
}

.seller-border:hover{
  box-shadow: 0px 5px 5px #ccc;
  animation: blink .4s .4s;
  transform: translate3d(0, -18px, 0);
}

.seller-border:hover .seller_font{
  color: #0089dc;
}

.seller-border:after{
  content: "";
  clear: both;
  display: block;
}

._seller{
  padding: 20px;
  display: inline-block;
}

.seller_logo{
  text-align: center;
  float: left;
  padding: 10px;
}

.seller_logo img{
  display: block;
  margin-bottom: 5px;
}

.seller_logo span{
  color: #999;
}

.seller_title{
  padding-left: 90px;
  padding-top: 10px;
}

.seller_title .star-item{
  margin-right: 3px!important;
}

.seller_font{
  width: 150px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  transition: all .2s .1s;
}

.seller-dePrice{
  color: #999;
  margin-top: 3px;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.modal-enter-active, .modal-leave-active{
    transition: all 0.3s ease;
}

.modal-enter, .modal-leave-active{
    opacity: 0;
}
</style>