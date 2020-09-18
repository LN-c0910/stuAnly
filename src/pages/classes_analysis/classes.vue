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
									<el-row :gutter="8">
										<el-col :span="12">
											<el-card shadow="always">
												<div slot="header" class="clearfix">
													<span>民族统计</span>
												</div>
												<div id="nationcount" style="width: 280px;height: 280px;">民族统计</div>
											</el-card>
										</el-col>
										<el-col :span="12">
											<el-card shadow="hover">
												<div slot="header" class="clearfix">
													<span>政治面貌</span>
												</div>
												<div id="pscount" style="width: 280px;height: 280px;">政治面貌统计</div>
											</el-card>
										</el-col>
									</el-row>
								</el-main>
								<el-main>
									<div id="stuMap" style="width: 500px;height: 350px;"></div>
								</el-main>
							</el-container>
						</el-tab-pane>
						<el-tab-pane label="班级成员" name="members">
							<el-container>
								<el-main>
							<el-table :data="stuList" style="width: 100%" max-height="500"> 
								<el-table-column fixed prop="sno" label="学号" width="150">
								</el-table-column>
								<el-table-column prop="name" label="姓名" width="120">
								</el-table-column>
								<el-table-column prop="sex" label="性别" width="120">
								</el-table-column>
								<el-table-column prop="nation" label="民族" width="120">
								</el-table-column>
								<el-table-column prop="birthday" label="出生日期" width="120">
								</el-table-column>
								<el-table-column prop="ps" label="政治面貌" width="120">
								</el-table-column>
								<el-table-column prop="department" label="寝室" width="200">
								</el-table-column>
								<el-table-column prop="tel" label="手机" width="100">
								</el-table-column>
								<el-table-column prop="qq" label="QQ" width="100">
								</el-table-column>
								  <el-table-column
								      fixed="right"
								      label="操作"
								      width="50">
								      <template slot-scope="scope">
								        <el-button
								          @click.native.prevent="viewRow(scope.$index, stuList)"
								          type="text"
								          size="small">
								          描述
								        </el-button>
								      </template>
								    </el-table-column>
							</el-table>
							
							</el-main>
							
							</el-container>
							<el-pagination
							  small
							  layout="prev, pager, next"
							  :total="50">
							</el-pagination>
						</el-tab-pane>
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
				gradelist: ['请选择年级','2017', '2018'],
				majorlist: ['请选择专业','信息管理与信息系统'],
				classlist: ['1', '2'],
				activeName: 'overview',
				stuList: [{
					sno: '201744070130',
					name: '王小虎',
					sex: '男',
					nation: '汉族',
					birthday: '1999-9-10',
					ps: '共青团员',
					department: '弘毅轩三A517',
					tel: 13415770507,
					qq: 1417522511
				}, {
					sno: '201744070130',
					name: '王小虎',
					sex: '男',
					nation: '汉族',
					birthday: '1999-9-10',
					ps: '共青团员',
					department: '弘毅轩三A517',
					tel: 13415770507,
					qq: 1417522512
				}, {
					sno: '201744070130',
					name: '王小虎',
					sex: '男',
					nation: '汉族',
					birthday: '1999-9-10',
					ps: '共青团员',
					department: '弘毅轩三A517',
					tel: 13415770507,
					qq: 1417522511
				}, {
					sno: '201744070130',
					name: '王小虎',
					sex: '男',
					nation: '汉族',
					birthday: '1999-9-10',
					ps: '共青团员',
					department: '弘毅轩三A517',
					tel: 13415770507,
					qq: 1417522511
				}, {
					sno: '201744070130',
					name: '王小虎',
					sex: '男',
					nation: '汉族',
					birthday: '1999-9-10',
					ps: '共青团员',
					department: '弘毅轩三A517',
					tel: 13415770507,
					qq: 1417522511
				}]

			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			/**
			 * @param {Object} index
			 * @param {Object} rows
			 * 跳转学生画像
			 */
			viewRow(index, rows){
				let newWindow = window.open("_blank");
				let sno = rows[index]["sno"];
				newWindow.location = "/#/analysis/personal?sno="+sno;
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
			drawNationCount() {
				let myChart = this.$echarts.init(document.getElementById("nationcount"));
				let option = {
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c} ({d}%)'
					},

					series: [{
						name: '民族比例',
						type: 'pie',
						radius: '60%',
						center: ['45%', '35%'],
						data: [{
								value: 19,
								name: '汉族'
							},
							{
								value: 9,
								name: '壮族'
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
			drawPsCount() {
				let myChart = this.$echarts.init(document.getElementById("pscount"));
				let option = {
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c} ({d}%)'
					},

					series: [{
						name: '政治面貌',
						type: 'pie',
						radius: '60%',
						center: ['45%', '35%'],
						data: [{
								value: 19,
								name: '团员'
							},
							{
								value: 9,
								name: '党员'
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
			drawMap() {
				let myChart = this.$echarts.init(document.getElementById("stuMap"));
				let option = {
					title: {
						text: "学生分布",
						left: "left"
					},
					tooltip: {
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
						text: ['高', '低'], // 文本，默认为数值文本
						calculable: true
					},
					toolbox: {
						show: true,
						orient: 'vertical',
						left: 'right',
						top: 'center',
						feature: {
							mark: {
								show: true
							},
							dataView: {
								show: true,
								readOnly: false
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
						}
					},
					series: [{
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
						data: [{
								name: '北京',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '天津',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '上海',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '重庆',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '河北',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '河南',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '云南',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '辽宁',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '黑龙江',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '湖南',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '安徽',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '山东',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '新疆',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '江苏',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '浙江',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '江西',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '湖北',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '广西',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '甘肃',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '山西',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '内蒙古',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '陕西',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '吉林',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '福建',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '贵州',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '广东',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '青海',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '西藏',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '四川',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '宁夏',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '海南',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '台湾',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '香港',
								value: Math.round(Math.random() * 1000)
							},
							{
								name: '澳门',
								value: Math.round(Math.random() * 1000)
							}
						]
					}]
				};

				myChart.setOption(option);
			}
		},
		mounted() {
			this.drawSexCount();
			this.drawMap();
			this.drawNationCount();
			this.drawPsCount();
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
	.searchclass {
		margin: 10px;
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		height: 500px;

	}

	.all {
		margin: 10px;
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		min-height: 500px;
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
