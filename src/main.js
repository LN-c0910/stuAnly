import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import global_ from '../config/global.js'
import router from './router';
import echarts from "echarts";
import china from "echarts/map/json/china.json"
import qs from 'qs'
import './http';
Vue.prototype.GLOBAL = global_;
Vue.use(ElementUI);
echarts.registerMap('china',china)
Vue.prototype.$echarts = echarts;
Vue.prototype.$qs = qs;
//json数组多字段排序
/**
 * @param {Object} arr: 被处理json数组
 * @param {Object} rev: 排序字段数组
 */
function sortByArr(arr, rev) {
	if (rev == undefined) {
		rev = 1;
	} else {
		rev = (rev) ? 1 : -1;
	}
	return function(a, b) {
		for (var i = 0; i < arr.length; i++) {
			let attr = arr[i]
			if (a[attr] != b[attr]) {
				if (a[attr] > b[attr]) {
					return rev * 1;
				} else {
					return rev * -1;
				}
			}
		}
	}
}

//eval替代方法
function evil(fn) {
    var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
    return new Fn('return ' + fn)();
}


function errorMsg(error) {
	switch (error.response.status) {
		case 400:
			return "Code 400:参数请求错误";
			break;
		case 401:
			return "Code 401:未授权,请重新登录";
			break;
		case 403:
			return "Code 403:拒绝访问";
			break;
		case 404:
			return "Code 404:查找的内容不存在";
			break;
		case 408:
			return "Code 408:请求超时";
			break;
		case 500:
			return "Code 500:服务器错误";
			break;
		case 501:
			return "Code 501:服务未实现";
			break;
		case 502:
			return "Code 502:网关错误";
			break;
		case 503:
			return "Code 503:服务不可用";
			break;
		case 504:
			return "Code 504:网络超时";
			break;
		case 505:
			return "Code 505:HTTP版本不受支持";
			break;
		default:
			return error.response.status;
	}
}

function getUrlParam(name) {
			let after = window.location.search;
			after = after.substr(1) || window.location.hash.split("?")[1];	        
	        if(after)
	        {
	            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	            var r = after.match(reg);
	            if(r != null)
	            {
	                return  decodeURIComponent(r[2]);
	            }
	            else
	            {
	                return "";
	            }
	        }
    }
Vue.prototype.$sortByArr = sortByArr;
Vue.prototype.$evil = evil;
Vue.prototype.$errmsg = errorMsg;
Vue.prototype.$param = getUrlParam;
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});