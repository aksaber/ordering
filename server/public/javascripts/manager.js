$(function() {
	//先读取cookie
	var cookieAdmin = "";
	var cookieArr = document.cookie.split(";");
    for(var i = 0; i < cookieArr.length; i++){
        var arr = cookieArr[i].trim().split("=");
        if(arr[0] == 'admin'){
            cookieAdmin = arr[1];
            break;
        }
    }
	//登录管理员
	if(cookieAdmin != 'admin'){
		$(".container").hide();
		$(".fadeModals").show();
		$(".adminLogin").click(function() {
			var a = $("#adminName").val();
			var b = $("#password").val()
			$.ajax({
				url: '/admin',
				type: 'post',
				async: false,
				data: {
					'adminName': $("#adminName").val(),
					'adminpwd': $("#password").val()
				},
				success: function(res) {
					if(res.result == '成功登录'){
						location.reload();
					}
				}
			});
		});
	}else{
		$(".login").hide();
		$(".fadeModal").hide();
		$(".fadeModals").hide();
	}
	//切换管理页面
	$(".tab").eq(0).show();
	$(".manager-tab li:eq(0)").click(function() {
		$(".tab").eq(0).show().siblings().hide();
	});
	$(".manager-tab li:eq(1)").click(function() {
		$(".tab").eq(1).show().siblings().hide();
	});
	$(".manager-tab li:eq(2)").click(function() {
		$(".tab").eq(2).show().siblings().hide();
	});
	$(".manager-tab li:eq(3)").click(function() {
		$(".tab").eq(3).show().siblings().hide();
	});

	//用户管理
	function userAdminFun() {
		$.ajax({
			url: '/users/userAdmin',
			type: 'get',
			success: function(res) {
				var table = "";
				resUsers = res.result;
				for(var i = 0; i < resUsers.length; i++){
					table += "<tr><td class='userName'>" + resUsers[i].userName + "</td>"
					       + "<td class='userPwd'>" + resUsers[i].userPwd + "</td>"
					       + "<td><button type='button' class='btn btn-default pullUsers'>删除</button></td></tr>"
				}
				$(".m-seller tbody").html(table);
				$(".pullUsers").on("click", function() {
					if(window.confirm('你确定要删除此用户吗？')){
		                 $.ajax({
		                 	url: '/users/delUserAdmin',
		                 	type: 'post',
		                 	data: {
		                 		"userName": $(this).parent().parent().find(".userName").html()
		                 	},
		                 	success: function(res) {
		                 		alert(res.result);
		                 		userAdminFun();
		                 	}
		                 });
		            }else{
		                return false;
		            }
				});
			}
		});
	}
	userAdminFun();

	//商家管理 - 搜索商家
	$(".tab-2 .searchSeller").click(function() {
		findGoods();
	});
	function findGoods() {
		$.ajax({
			url: '/afood',
			type: 'post',
			async: 'false',
			data: {
				"foodId": $("#inputSeller").val()
			},
			success: function(res) {
				var goods = "";
				var foods = res.result[0].foods;
				for(var i = 0; i < foods.length; i++){  //几个大类别：优惠/汉堡/鸡翅
					goods += "<div class='goodName'>" + foods[i].name + "<span class='addGoods'>+</span></div>" + "<table class='table table-striped'><thead><tr>"
					       + "<th>ID</th><th>菜名</th><th>价格</th><th>图片</th><th>操作</th></tr></thead><tbody>";
					for(var j = 0; j < foods[i].foods.length; j++){  //几个小类别：优惠里的双人餐/三人餐
						goods += "<tr><td class='food-type'>" + foods[i].foods[j].type + "</td>"
						       + "<td class='food-name'>" + foods[i].foods[j].name + "</td>"
						       + "<td class='food-price'>" + foods[i].foods[j].price + "</td>"
						       + "<td class='food-image'>" + foods[i].foods[j].image + "</td>"
						       + "<td><button class='btn btn-default editBtn'>修改</button> <button class='btn btn-default delBtn'>删除</button></td></tr>";
					}
					goods += "</tbody></table>";
				}
				$(".goods").html(goods);
				//修改操作
				$(".goods .editBtn").on("click", function() {
					var type = $(this).parent().parent().find(".food-type").html();
					var name = $(this).parent().parent().find(".food-name").html();
					var price = $(this).parent().parent().find(".food-price").html();
					var image = $(this).parent().parent().find(".food-image").html();
					$(".addmodel-title").html("修改菜品");
					$("#goodsType").attr("disabled",true);
					$(".addmodel-submit button:eq(0)").attr("id","edit");
					$(".fadeModal").show();  $(".editGoods").show();
					$("#goodsType").val(type);
					$("#goodsName").val(name);
					$("#goodsPrice").val(price);
					$("#goodsImg").val(image);
				});
				//增加商品
			    $(".addGoods").on("click", function() {
			    	$("#goodsType").val("");
					$("#goodsName").val("");
					$("#goodsPrice").val("");
					$("#goodsImg").val("");
			    	$(".addmodel-title").html("添加菜品");
			    	$("#goodsType").attr("disabled",false);
			    	$(".addmodel-submit button:eq(0)").attr("id","add");
			    	$(".fadeModal").show();  $(".editGoods").show();
			    });
			    //删除商品
			    $(".goods .delBtn").on("click", function() {
			    	if(window.confirm('你确定要删除此用户吗？')){
				    	$.ajax({
				    		url: '/afood/delGoods',
				    		type: 'post',
				    		data: {
				    			"goodsId": $("#inputSeller").val(),
				    			"goodsType": $(this).parent().parent().find(".food-type").html()
				    		},
				    		success: function(res) {
				    			if(res.result == '666'){
				    				alert("菜品删除成功");
				    				findGoods();
				    			}
				    		}
				    	});
				    }else{
				    	return false;
				    }
			    })
			}
		});
	}

    //修改菜品
    $(".addmodel-submit button:eq(0)").click(function() {
    	if($(".addmodel-title").html() == "修改菜品"){
    		if(!isNaN($("#goodsPrice").val())){
		    	$.ajax({
		    		url: '/afood/editGoods',
		    		type: 'post',
		    		data: {
		    			"goodsId": $("#inputSeller").val(),
		    			"goodsType": $("#goodsType").val(),
		    			"goodsName": $("#goodsName").val(),
		    			"goodsPrice": $("#goodsPrice").val(),
		    			"goodsImg": $("#goodsImg").val()
		    		},
		    		success: function(res) {
		    			if(res.result == '666'){
		    				alert("菜品修改成功");
		    				$(".fadeModal").hide();  $(".editGoods").hide();
		    				findGoods();
		    			}else{
		    				alert("请输入正确的价格");
		    			}
		    		}
		    	});
		    }else{
		    	alert("请输入正确的价格");
		    }
	    }else if($(".addmodel-title").html() == "添加菜品"){
	    	if(!isNaN($("#goodsPrice").val())){
		    	$.ajax({
					url: '/afood/addGoods',
					type: 'post',
					data: {
						"goodsId": $("#inputSeller").val(),
						"goodsType": $("#goodsType").val(),
						"goodsName": $("#goodsName").val(),
						"goodsPrice": $("#goodsPrice").val(),
						"goodsImg": $("#goodsImg").val()
					},
					success: function(res) {
						if(res.result == '666'){
		    				alert("菜品添加成功");
		    				$(".fadeModal").hide();  $(".editGoods").hide();
		    				findGoods();
		    			}
					}
				});
		    }else{
		    	alert("请输入正确的价格");
		    }
	    }
    });

    //隐藏编辑框
    $(".addmodel-close").click(function() {
    	$(".fadeModal").hide();  $(".editGoods").hide();
    });
    $(".addmodel-submit button:eq(1)").click(function() {
    	$(".fadeModal").hide();  $(".editGoods").hide();
    });

    //订单管理
    $(".tab-4 .searchSeller").click(function() {
    	function searchOrder() {
    		$.ajax({
	    		url: "/orders/findOrder",
	    		type: "post",
	    		data: {
	    			"sellerId": $("#inputSeller4").val()
	    		},
	    		success: function(res) {
	    			var order = "";
	    			var orders = res.result[0].orders;
	    			var status = "";
	    			var handle = "";
	    			for(var i = 0; i < orders.length; i++) {
	    				if(orders[i].status == "0"){
	    					status = "未接单";
	    					handle = "<button class='btn btn-default btn-1'>接单</button>";
	    				}else if(orders[i].status == "1"){
	    					status = "已接单";
	    					handle = "√";
	    				}else if(orders[i].status == "2"){
	    					status = "已完成";
	    					handle = "√";
	    				}
	    				order += "<table class='table table-hover'><thead><tr>"
						       + "<th style='width:13%'>创建时间</th><th style='width:13%'>完成时间</th><th style='width:13%'>备注信息</th><th style='width:6%'>总额</th><th style='width:14%'>菜品</th><th>地址</th><th style='width:6%'>状态</th><th style='width:8%'>操作</th></tr></thead><tbody>";
						order += "<tr><td class='order-cTime'>" + orders[i].createTime + "</td>"
						       + "<td class='order-tTime'>" + orders[i].takeTime + "</td>"
						       + "<td class='order-remark'>" + orders[i].remark + "</td>"
						       + "<td class='order-totalPrice'>" + orders[i].totalPrice + "</td><td>"
						for(var j = 0; j < orders[i].goods.length; j++){
							order += "<div><span>" + orders[i].goods[j].name + "</span>"
							        + "<span>" + orders[i].goods[j].count + "</span></div>"
						}
						order += "</td><td>"
						for(var k = 0; k < orders[i].address.length; k++){
							order += "<div><span>" + orders[i].address[k].name + "</span>"
							        + "<span>" + orders[i].address[k].tel + "</span>"
							        + "<span>" + orders[i].address[k].address + "</span></div>"
						}
						order += "</td><td class='order-status'>" + status + "</td><td>" + handle + "</td></tr></tbody></table>";
	    			}
	    			$(".tab4-content").html(order);
	    			//接单功能
	    			$(".tab4-content button").on("click", function() {
	    				$.ajax({
	    					url: '/orders/takeOrder',
	    					type: 'post',
	    					data: {
	    						'sellerId': $("#inputSeller4").val()
	    					},
	    					success: function(res) {
	    						if(res.result == '已接单'){
	    							$.ajax({
	    								url: '/users/takeOrder',
	    								type: 'post',
	    								data: {},
	    								success: function(res) {
	    									if(res.result == '已接单'){
	    										alert("已接单");
				    							searchOrder();
	    									}
	    								}
	    							});
	    						}
	    					}
	    				});
	    			});
	    		}
	    	});
    	}
    	searchOrder();
    });

    //订单管理
    $(".tab-3 .searchRating").click(function() {
    	$.ajax({
    		url: "/aratings",
    		type: "post",
    		data: {
    			"ratingsId": $("#inputRating3").val()
    		},
    		success: function(res) {debugger;
    			var rating = "";
    			var ratings = res.result[0].ratings;
    			for(var i = 0; i < ratings.length; i++) {
    				rating += "<table class='table table-hover'><thead><tr>"
					       + "<th style='width:13%'>用户</th><th style='width:13%'>评论时间</th><th style='width:13%'>评论内容</th></tr></thead><tbody>";
					rating += "<tr><td class=''>" + ratings[i].username + "</td>"
					       + "<td class='order-tTime'>" + ratings[i].rateTime + "</td>"
					       + "<td class='order-remark'>" + ratings[i].text + "</td>"
					       + "</td></tr></tbody></table>";
    			}
    			$(".tab3-content").html(rating);
    			//接单功能
    			// $(".tab4-content button").on("click", function() {
    			// 	$.ajax({
    			// 		url: '/orders/takeOrder',
    			// 		type: 'post',
    			// 		data: {
    			// 			'sellerId': $("#inputSeller4").val()
    			// 		},
    			// 		success: function(res) {
    			// 			if(res.result == '已接单'){
    			// 				$.ajax({
    			// 					url: '/users/takeOrder',
    			// 					type: 'post',
    			// 					data: {},
    			// 					success: function(res) {
    			// 						if(res.result == '已接单'){
    			// 							alert("已接单");
			    // 							location.reload();
    			// 						}
    			// 					}
    			// 				});
    			// 			}
    			// 		}
    			// 	});
    			// });
    		}
    	});
    });

})