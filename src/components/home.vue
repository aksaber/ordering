<template>
    <transition name="fade">
        <div class="home">
            <swiper :seller="seller"></swiper>
            <div class="clear"></div>
            <div class="content">
                <div class="content_top">
                  <!-- <div class="home-search">
                    <input type="text">
                    <button type="button" @click="searchSeller"></button>
                  </div> -->
                </div>
                <div class="content_seller">
                    <div class="_seller" v-for="(item, index) in seller">
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
                <div class="content_bottom"></div>
            </div><!--content-->
            <goods :gGoods="gGoods" :gSeller="gSeller" :gRatings="gRatings" :showGoods="showGoods" :listHeight="listHeight" :gCollect="gCollect" @close="closeGoods" @collectFun="collectFun">
            </goods>
            <transition name="modal">
                <div class="fadeModal" v-show="showGoods" @click="closeGoods"></div>
            </transition>
        </div>
    </transition>
</template>

<script>
import swiper from './swiper';  //焦点轮播图
import menus from './menu';
import goods from './goods';
import star from './star';
    export default {
        data() {
            return {
                seller: [],
                goods: [],
                ratings: [],
                showGoods: false, //是否显示goods菜单
                gSeller: [],  //指定的商家
                gGoods: [],  //指定的菜单
                gRatings: [],  //指定的评论
                listHeight: [],  //计算菜单的高度
                gCollect: false,
            }
        },
        created() {
            // this.$http.get('/api/food').then((res) => {
            //     this.seller = res.body.result.list[0].seller;
            //     this.goods = res.body.result.list[0].goods;
            //     this.ratings = res.body.result.list[0].ratings;
            // });
            this.$http.get('/api/aseller').then((res) => {
                this.seller = res.body.result;
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
            },
        },
        components: { swiper, menus, goods, star },
    };
</script>

<style>

.home{
  opacity: 1;
}

.fade-enter-active, .fade-leave-active{
  transition: all 0.3s ease;
}

.fade-enter, .fade-leave-active{
  opacity: 0;
}

.text{
	cursor: pointer;
    color: white;
    background: #DE0B46;
    box-shadow: 0px 0px 55px rgba(222, 11, 70, 0.77);
}

.content{
  width: 85%;
  margin: 0 auto;
  margin-top: 10px
}

/*.content_class{
  width: 100%;
  padding: 10px 10px 10px 80px;
  position: relative;
  border: 1px solid #CECECE;
  box-shadow: 4px 2px 30px #ccc;
}

.class_title{
  position: absolute;
  left: 10px;
  top: 10px;
}*/

/*.class a{
  padding: 11px;
  color: #666;
}

.class a:hover{
  background: #ccc;
}*/

.content_seller{
  width: 100%;
  margin: 0 auto;
  border-top: none;
  border-bottom: none;
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

.content_top{
  background: linear-gradient(to top,#f9f9f9,#e6e6e6);
  color: #777;
  height: 30px;
  width: 100%;
}

.content_bottom{
  background: linear-gradient(to bottom,#f9f9f9,#D6D4D4);
  color: #777;
  height: 50px;
  width: 100%;
}

.modal-enter-active, .modal-leave-active{
    transition: all 0.3s ease;
}

.modal-enter, .modal-leave-active{
    opacity: 0;
}

/*.home-search{
  float: right;
}

.home-search input{
  border: 1px solid #ccc;
  padding: 5px 0px;
  border-radius: 3px;
  padding-left:5px;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s
}

.home-search input:focus{
  border-color: #66afe9;
  outline: 0;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
}

.home-search button{
    color: #fff;
    background-color: #5bc0de;
    border-color: #46b8da;
    display: inline-block;
    padding: 5px 12px;
    margin-bottom: 0;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
}*/
</style>