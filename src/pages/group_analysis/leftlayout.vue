<template>
	<el-menu
	default-active="1-4-1" 
	class="el-menu-vertical-demo" 
	@open="handleOpen" 
	@close="handleClose" 
	:collapse="isCollapse" 
	background-color="#eeeeee"
	text-color="#337ab7"
	>
	<el-menu-item index="0" @click="toggle()">
	  <i :class="[isCollapse? 'el-icon-caret-right' : 'el-icon-caret-left']" ></i>
	  <span slot="title">{{isCollapse?"展开":"收起"}}</span>
	</el-menu-item>
	<el-menu-item index="1">
	  <i class="el-icon-search"></i>
	  <span slot="title">学生检索</span>
	</el-menu-item>
	  <el-submenu index="2">
	    <template slot="title">
	      <i class="el-icon-s-data"></i>
	      <span slot="title">成绩分析</span>
	    </template>
	    <el-menu-item-group>         
	      <el-menu-item index="1-1"><i class="el-icon-pie-chart"></i>学生排名</el-menu-item>
	      <el-menu-item index="1-2"><i class="el-icon-pie-chart"></i>班级排名</el-menu-item>
				<el-menu-item index="1-3"><i class="el-icon-pie-chart"></i>各班各科分数趋势</el-menu-item>
	    </el-menu-item-group>     
	  </el-submenu>
	  
	  <el-menu-item index="3" disabled>
	    <i class="el-icon-s-data" ></i>
	    <span slot="title">选课分析</span>
	  </el-menu-item>
	  <el-menu-item index="4" disabled>
	    <i class="el-icon-s-data"></i>
	    <span slot="title">考勤分析</span>
	  </el-menu-item>
	</el-menu>
</template>

<script>
	export default {
		name:"gpleft",
	    data() {
	      return {
	        isCollapse: true
	      }
	    },
	    methods: {
	      handleOpen(key, keyPath) {
	        console.log(key, keyPath);
	      },
	      handleClose(key, keyPath) {
	        console.log(key, keyPath);
	      },		
		  toggle(){
			  if(this.isCollapse){
				 this.isCollapse = false;
			  }else{
				this.isCollapse = true;
			  }
		  }
	    }
	  }
</script>

<style>
	*{
			font-weight: 500;
		}
	.el-menu-vertical-demo:not(.el-menu--collapse) {
	  width: 200px;
	  min-height: 600px;
	}
</style>
