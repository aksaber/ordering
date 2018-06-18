let http = require('http'); //该模块可以加载任意接口

let util = require('util');

http.get('http://www.imooc.com/u/card', function(res) {
	let data = '';
	//res.on()接收数据的变化
	res.on('data', function(chunk) {
		data += chunk;
	});
	//监听什么时候接收完数据
	res.on('end', function() {
		//let result = JSON.parse(data);
		let inspect = util.inspect(data);
		console.log('result: ' + inspect);
	})
});