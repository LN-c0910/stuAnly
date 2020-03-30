<template>
<div>
	<el-menu
	  :default-active="activeIndex2"
	  class="el-menu-demo"
	  mode="horizontal"
	  @select="handleSelect"
	  background-color="#222222"
	  text-color="#fff"
	  active-text-color="#ffd04b">
	  <el-menu-item index="0" style="margin-right: 20px;"><i class="el-icon-s-home"></i>经济与管理学院</el-menu-item>
	  <el-submenu index="1" style="float: right;">
	    <template slot="title"><i class="el-icon-user-solid"></i>用户</template>
	    <el-menu-item index="1-1" style="text-align: center;">退出登录</el-menu-item>
	    <el-menu-item index="1-2" style="text-align: center;">返回学生管理系统</el-menu-item>      
	  </el-submenu>
	  <el-menu-item index="2"><router-link to="/index/dashboard">主页</router-link></el-menu-item>
	  <el-menu-item index="3"><router-link to="/analysis/personal">学生画像</router-link></el-menu-item>
			<el-menu-item index="4"><router-link to="/analysis/classes">班级画像</router-link></el-menu-item>
			<el-menu-item index="5"><router-link to="/analysis/teacher">教师分析</router-link></el-menu-item>
			<el-menu-item index="6"><router-link to="/analysis/group">群体分析</router-link></el-menu-item>
	</el-menu>
	<router-view></router-view>
</div>
</template>

<script>
	
	export default {
		name: "vlayout",
	    data() {
	      return {	        
			activeIndex2: '1'
	      }
	    },
	    methods: {
	      
		   handleSelect(key, keyPath) {
		       console.log(key, keyPath);
		   }
	    }
	  }
</script>

<style>
	a{
		text-decoration: none;
	}
</style>
