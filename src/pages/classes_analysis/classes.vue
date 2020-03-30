<template>
	<div>
		<el-main class="searchclass">
			<el-form :inline="true" :model="searchform" class="class-form-inline">
				<el-form-item label="年级">
					<el-select v-model="searchform.grade" placeholder="请选择年级">
						<el-option :label="item" :value="item" v-for="(item,i) in gradelist" :key="i"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="专业">
					<el-select v-model="searchform.major" placeholder="请选择专业">
						<el-option :label="item" :value="item" v-for="(item,i) in majorlist" :key="i"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="班级">
					<el-select v-model="searchform.class" placeholder="请选择班级">
						<el-option :label="item" :value="item" v-for="(item,i) in classlist" :key="i"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
				</el-form-item>
			</el-form>
		</el-main>
		<el-container class="all">
			<el-main class="all" style="height: auto;width: 400px;">
				<template>
					<el-tabs v-model="activeName" @tab-click="handleClick">
						<el-tab-pane label="概况" name="overview">
							<el-container>
								<el-main>
									<el-row :gutter="8">
										<el-col :span="12">
											<el-card shadow="always">
												<div slot="header" class="clearfix">
													<span>班级总人数</span>
												</div>
												<p style="font-size: 350%;">28</p>
											</el-card>
										</el-col>
										<el-col :span="12">
											<el-card shadow="hover">
												<div slot="header" class="clearfix">
													<span>性别统计</span>
												</div>
												<div id="sexcount" style="width: 280px;height: 280px;">性别统计</div>
											</el-card>
										</el-col>
									</el-row>
									<br>
									
								</el-main>
								<el-main>
									<div id="stuMap" style="width: 500px;height: 350px;"></div>
								</el-main>
							</el-container>
						</el-tab-pane>
						<el-tab-pane label="班级成员" name="members">班级成员</el-tab-pane>
						<el-tab-pane label="成绩" name="score">成绩</el-tab-pane>
						<el-tab-pane label="考勤" name="kq">考勤</el-tab-pane>
						<el-tab-pane label="任课老师信息" name="teacher">任课老师信息</el-tab-pane>
					</el-tabs>
				</template>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				searchform: {
					grade: '',
					class: '',
					major: ''
				},
				gradelist: ['2017', '2018'],
				majorlist: ['信息管理与信息系统'],
				classlist: ['1', '2'],
				activeName: 'overview'

			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			drawSexCount() {
				let myChart = this.$echarts.init(document.getElementById("sexcount"));
				let option = {
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c} ({d}%)'
					},
				
					series: [{
						name: '性别比例',
						type: 'pie',
						radius: '60%',
						center: ['45%', '35%'],
						data: [{
								value: 19,
								name: '男'
							},
							{
								value: 9,
								name: '女'
							}
						],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				};
				myChart.setOption(option);
			},
			autoopen(title1, msg) {
				const h = this.$createElement;

				this.$notify({
					title: title1,
					message: h('i', {
						style: 'color: red'
					}, msg)
				});
			},
			drawMap(){
				let myChart = this.$echarts.init(document.getElementById("stuMap"));
				let option = {
					title:{
						text:"学生分布",
						left:"left"
					},
				    tooltip : {
				        trigger: 'item'
				    },
				    legend: {
				        orient: 'vertical',
				        left: 'left',
				    },
				    visualMap: {
				        min: 0,
				        max: 2000,
				        left: 'left',
				        top: 'bottom',
				        text:['高','低'],           // 文本，默认为数值文本
				        calculable : true
				    },
				    toolbox: {
				        show: true,
				        orient : 'vertical',
				        left: 'right',
				        top: 'center',
				        feature : {
				            mark : {show: true},
				            dataView : {show: true, readOnly: false},
				            restore : {show: true},
				            saveAsImage : {show: true}
				        }
				    },
				    series : [
				        {
				            type: 'map',
				            mapType: 'china',
				            roam: false,
				            label: {
				                normal: {
				                    show: false
				                },
				                emphasis: {
				                    show: true
				                }
				            },
				            data:[
				                {name: '北京',value: Math.round(Math.random()*1000)},
				                {name: '天津',value: Math.round(Math.random()*1000)},
				                {name: '上海',value: Math.round(Math.random()*1000)},
				                {name: '重庆',value: Math.round(Math.random()*1000)},
				                {name: '河北',value: Math.round(Math.random()*1000)},
				                {name: '河南',value: Math.round(Math.random()*1000)},
				                {name: '云南',value: Math.round(Math.random()*1000)},
				                {name: '辽宁',value: Math.round(Math.random()*1000)},
				                {name: '黑龙江',value: Math.round(Math.random()*1000)},
				                {name: '湖南',value: Math.round(Math.random()*1000)},
				                {name: '安徽',value: Math.round(Math.random()*1000)},
				                {name: '山东',value: Math.round(Math.random()*1000)},
				                {name: '新疆',value: Math.round(Math.random()*1000)},
				                {name: '江苏',value: Math.round(Math.random()*1000)},
				                {name: '浙江',value: Math.round(Math.random()*1000)},
				                {name: '江西',value: Math.round(Math.random()*1000)},
				                {name: '湖北',value: Math.round(Math.random()*1000)},
				                {name: '广西',value: Math.round(Math.random()*1000)},
				                {name: '甘肃',value: Math.round(Math.random()*1000)},
				                {name: '山西',value: Math.round(Math.random()*1000)},
				                {name: '内蒙古',value: Math.round(Math.random()*1000)},
				                {name: '陕西',value: Math.round(Math.random()*1000)},
				                {name: '吉林',value: Math.round(Math.random()*1000)},
				                {name: '福建',value: Math.round(Math.random()*1000)},
				                {name: '贵州',value: Math.round(Math.random()*1000)},
				                {name: '广东',value: Math.round(Math.random()*1000)},
				                {name: '青海',value: Math.round(Math.random()*1000)},
				                {name: '西藏',value: Math.round(Math.random()*1000)},
				                {name: '四川',value: Math.round(Math.random()*1000)},
				                {name: '宁夏',value: Math.round(Math.random()*1000)},
				                {name: '海南',value: Math.round(Math.random()*1000)},
				                {name: '台湾',value: Math.round(Math.random()*1000)},
				                {name: '香港',value: Math.round(Math.random()*1000)},
				                {name: '澳门',value: Math.round(Math.random()*1000)}
				            ]
				        }
				    ]
				};
				
				myChart.setOption(option);
			}
		},
		mounted() {
			this.drawSexCount();
			this.drawMap();
			//获取年级列表
			// this.$http.get("/overview/listGrades")
			// 	.then(({
			// 		data
			// 	}) => {
			// 		this.gradelist.push.apply(this.gradelist, data);

			// 	})
			// 	.catch(err => {

			// 		console.log(err);
			// 		this.autoopen('错误', '网络错误,访问超时！');
			// 	});
		}
	}
</script>

<style scoped="scoped">
	.all,
	.searchclass {
		margin: 10px;
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		height: 500px;

	}

	.searchclass {
		height: 80px;
		background-color: #E9EEF3;
		padding: 0;
	}

	.class-form-inline {
		margin-top: 18px;
	}

	.el-card {
		width: 300px;
		height: 300px;
		padding: 0;
	}
</style>
