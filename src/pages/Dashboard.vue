<template>
	<div>

		<el-container>
			<el-main class="num">
				<el-row :gutter="10">
					<el-col :span="8">
						<el-card shadow="hover" style="background-color: #de2e2e;">
							<div>
								<p>{{boardlist[0]}}<span>人</span></p>
								<span>在库学生总人数</span>
							</div>
						</el-card>
					</el-col>
					<el-col :span="8">
						<el-card shadow="hover" style="background-color: #184794;">
							<div>
								<p>{{boardlist[1]}}<span>人</span></p>
								<span>在库本科生人数</span>
							</div>

						</el-card>
					</el-col>
					<el-col :span="8">
						<el-card shadow="hover" style="background-color: #184794;">
							<div>
								<p>{{boardlist[2]}}<span>人</span></p>
								<span>在库研究生生人数</span>
							</div>

						</el-card>
					</el-col>
				</el-row>
				<br>
				<el-row :gutter="10">
					<el-col :span="8">
						<el-card shadow="hover" style="background-color: orangered;">
							<div>
								<p>{{boardlist[3]}}<span>个</span></p>
								<span>在库本科专业种类数</span>
							</div>
						</el-card>
					</el-col>
					<el-col :span="8">
						<el-card shadow="hover" style="background-color: seagreen;">
							<div>
								<p>{{boardlist[4]}}<span>人</span></p>
								<span>在库学工办教师人数</span>
							</div>
						</el-card>
					</el-col>
					<el-col :span="8">
						<el-card shadow="hover" style="background-color: dimgrey;">
							<div>
								<p>{{boardlist[5]}}<span>个</span></p>
								<span>在库班级总数</span>
							</div>
						</el-card>
					</el-col>
				</el-row>
			</el-main>
		</el-container>
		<el-container>
			<el-main class="chart1">
				<el-tag type="info" effect="dark">学生概览</el-tag>

				<el-tabs v-model="activeName" @tab-click="stuOverView">
					<el-tab-pane label="性别统计" name="sexconunt">
						<el-select v-model="value" size="mini" placeholder="请选择年级" @change="changeSexChart">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<div id="sexchart" style="width: 600px;height: 350px;">

						</div>
					</el-tab-pane>
					<el-tab-pane label="民族分布" name="nationcount">
						<div id="nationchart" style="width: 600px;height: 350px;">

						</div>
					</el-tab-pane>
					<el-tab-pane label="年级人数统计" name="gradecount">
						<div id="gradecountchart" style="width: 600px;height: 350px;">

						</div>
					</el-tab-pane>
					<el-tab-pane label="政治面貌分布" name="politicalstatus">
						<div id="politicalstatuschart" style="width: 600px;height: 350px;">
						</div>
					</el-tab-pane>
				</el-tabs>
			</el-main>
			<el-main class="chart2">
				<el-tag type="info" effect="dark">在校教师数量</el-tag>
				<el-tabs v-model="tea_activename">
					<el-tab-pane label="年级分布" name="tea_grade_conunt">
						<div id="tea_grade_chart" style="width: 600px;height: 350px;">

						</div>
					</el-tab-pane>
				</el-tabs>
			</el-main>
		</el-container>
		<el-container>
			<el-main class="chart3">
				<el-tag type="info" effect="dark">生源地图</el-tag>
				<div id="stuMap" style="width: 600px;height: 350px;"></div>
			</el-main>
			<el-main class="chart4">
				<el-tag type="info" effect="dark">出勤率</el-tag>
				<div id="attendence" style="width: 600px;height: 350px;"></div>
			</el-main>
		</el-container>
		 <el-container>
			<el-main class="chart5" style="height: 80px;color: #000;font-weight: 800;">
				统计数据均排除空白数据和无效数据
			</el-main>
		</el-container>
	</div>
</template>

<script>
	// 引入 ECharts 主模块
	// var echarts = require('echarts/lib/echarts');
	// require('echarts/lib/chart/bar');
	// require('echarts/lib/chart/pie');

	export default {
		name: "dashboard",
		data() {
			return {
				boardlist: [],
				activeName: 'sexconunt',
				tea_activename: 'tea_grade_conunt',
				automsgtitle: "注意",
				automsg: "该网站数据基于经管学院学生管理系统数据库!\n,为非官方数据，仅作参考！",
				options: [{
					value: '0',
					label: '全学院'
				}],
				value: '',
				gradelist: ['全学院'],
				nationseries: [],
				gradeStuSeries: []
			}
		},
		methods: {
			stuOverView(tab, event) {
				// console.log(tab, event);

				switch (tab.name) {
					case "sexconunt":
						this.changeSexChart(0);
						break;
					case "nationcount":
						this.drawNationChart();
						break;
					case "gradecount":
						this.drawGradeNumChart();
						break;
					case "politicalstatus":
						this.drawPoliticalStatusChart();
						break;
				}


				// console.log(tab.name);
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

			changeSexChart(year) {
				// console.log(year);
				//发送请求 
				this.drawSexChart(year, this.bnum, this.gnum, 0);
				this.$http.get("/overview/sexcount/grade/" + year)
					.then(({
						data
					}) => {

						this.bnum = data.bnum;
						this.gnum = data.gnum;
						if (year == '0') {
							year = '全学院';
						}
						this.drawSexChart(year, this.bnum, this.gnum, 1);
					})
					.catch(err => {
						console.log(err);
						this.autoopen('错误', '网络错误,访问超时！');
					});

			},
			//性别图表
			/*
				title1:String 标题开头
				bnum:Number 男生人数
				gnum:Number 女生人数
				loading:Boolean 加载动画开关
			*/
			drawSexChart(title1, bnum, gnum, loading) {


				let myChart = this.$echarts.init(document.getElementById("sexchart"));

				// 指定图表的配置项和数据
				let option = {
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b}: {c} ({d}%)'
					},
					title: {
						text: title1 + '级性别比例',
						x: 'center'
					},
					legend: {
						orient: 'vertical',
						left: 10,
						data: ['男', '女']
					},
					series: [{
						name: title1 + '级性别比例',
						type: 'pie',
						radius: ['50%', '70%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: 'center'
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '30',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: [{
								value: bnum,
								name: '男'
							},
							{
								value: gnum,
								name: '女'
							}
						]
					}]
				};
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);

				myChart.showLoading();

				if (loading) {
					myChart.hideLoading();
				}

			},

			/**
			 *	民族图表
			 */
			drawNationChart() {
				let myChart = this.$echarts.init(document.getElementById("nationchart"));
				myChart.showLoading();
				this.$http.get("overview/nation")
					.then(({
						data
					}) => {
						this.nationseries = [];
						let glists = Object.keys(data);
						// console.log(glists);
						for (let i = 0; i < glists.length; i++) {
							let resdata = [];
							let nationname = Object.keys(data[glists[i]]);
							nationname.map(nname => {
								resdata.push({
									name: nname,
									value: data[glists[i]][nname]
								})
							})
							// console.log(resdata);
							this.nationseries.push({
								name: (glists[i] == '0' ? '全学院' : glists[i]) ,
								type: 'treemap',
								breadcrumb: {
									show: false
								},
								data: resdata
							})

						}
						let option = {
							tooltip: {},
							title: {
								top: 5,
								left: 'center',
								text: '民族分布',
								borderRadius: [5, 5, 0, 0]
							},
							legend: {
								data: this.gradelist,
								selectedMode: 'single',
								bottom: 0,
								itemGap: 2,
								type:'scroll'//设置legend滚动轴的出现
							},
							series: this.nationseries
						};
						myChart.hideLoading();
						myChart.setOption(option);
					})
					.catch(err => {
						console.log(err);
						this.autoopen('错误', '网络错误,访问超时！');
					})
			},

			/**
			 * 年级人数统计图表
			 */
			drawGradeNumChart() {
				let gradedata = [];
				let myChart = this.$echarts.init(document.getElementById("gradecountchart"));
				myChart.showLoading();
				this.$http.get("overview/grades")
					.then(({
						data
					}) => {
						for (let i = 0; i < Object.keys(data).length; i++) {
							gradedata.push({
								name: Object.keys(data)[i],
								value: Object.values(data)[i]
							})
						}
						let option = {

							tooltip: {
								trigger: 'item',
								formatter: '{a} <br/>{b} : {c} ({d}%)'
							},
							visualMap: {
								show: false,
								min: 700,
								max: 900,
								inRange: {
									colorLightness: [0, 1]
								}
							},
							series: [{
								name: '年级人数统计',
								type: 'pie',
								radius: '70%',
								center: ['50%', '50%'],
								data: gradedata.sort(function(a, b) {
									return a.value - b.value;
								}),
								roseType: 'radius',

							}]
						};
						myChart.hideLoading();
						myChart.setOption(option);
					})
					.catch(err => {
						console.log(err);
						this.autoopen('错误', '网络错误,访问超时！');
					})
			},
			/**
			 * 政治面貌统计
			 */
			drawPoliticalStatusChart() {

				let myChart = this.$echarts.init(document.getElementById("politicalstatuschart"));
				myChart.showLoading();
				this.$http.get("overview/ps")
					.then(({
						data
					}) => {
						let psseries = []; //初始化图表列表
						let datalist = {}; //初始化图表数据
						let map = {};
						let dest = [];
						//根据termYear,psname排序
						let sortdata = data.sort(this.$sortByArr(["termYear", "psname"]));
						//根据termYear将json分组
						sortdata.forEach(i => {
							if (i.termYear == null) i.termYear = '全学院';
							if (!map[i.psname]) {
								dest.push({
									psname: i.psname,
									content: [i]
								})
								map[i.psname] = "existed";
							} else {
								dest.forEach(j => {
									if (j.psname == i.psname) {
										j.content.push(i);
									}
								})

							}
						});
						// console.log(map);


						// console.log(datalist);
						// console.log(dest);

						dest.forEach(d => {
							//初始化数据集合									
							this.gradelist.forEach(g => datalist[g] = 0);

							d['content'].forEach(c => {
								datalist[c.termYear] = (c.counts);
							})
							psseries.push({
								name: d.psname,
								type: 'bar',
								stack: '总量',
								label: {
									show: false,
									position: 'insideRight'
								},
								data: Object.values(datalist)
							})

						})
						let option = {
							tooltip: {
								trigger: 'axis',
								axisPointer: {
									type: 'shadow'
								}
							},
							legend: {
								type:'scroll',// 设置legend滚动轴的出现
								data: ['党员', '共青团员', '积极分子', '群众', '预备党员']
							},
							grid: {
								left: '3%',
								right: '4%',
								bottom: '3%',
								containLabel: true
							},
							xAxis: {
								type: 'value'
							},
							yAxis: {
								type: 'category',
								data: Object.keys(datalist)
							},
							series: psseries
						};
						myChart.hideLoading();
						myChart.setOption(option);

					})
					.catch(err => {
						console.log(err);
						this.autoopen('错误', '网络错误,访问超时！');
					});

			},

			/**
			 * 教师年级分布  //TODO 无数据，静态数据演示图
			 */
			drawTeacherGradeChart() {
				//TODO
				let myChart = this.$echarts.init(document.getElementById("tea_grade_chart"));
				let option = {
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c} ({d}%)'
					},
					title: {
						text: "在库教师数量(数据库暂无教师数据，下图为演示数据)",
						left: "center"
					},
					legend: {
						type: 'scroll',
						orient: 'vertical',
						right: 10,
						top: 20,
						bottom: 20,
						data: ['2014', '2015', '2016', '2017', '2018']
					},
					series: [{
						name: '在校教师数量(暂无数据，图为演示数据)',
						type: 'pie',
						radius: '70%',
						center: ['40%', '50%'],
						data: [{
								value: 30,
								name: '2014'
							},
							{
								value: 40,
								name: '2015'
							},
							{
								value: 50,
								name: '2016'
							},
							{
								value: 60,
								name: '2017'
							},
							{
								value: 70,
								name: '2018'
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

			/**
			 * 	生源地图
			 */
			dramStuMap() {
				let myChart = this.$echarts.init(document.getElementById("stuMap"));
				myChart.showLoading();
				this.$http.get("overview/stumap")
					.then(({
						data
					}) => {
						let addrData = this.$evil(data);

						let option = {
							tooltip: {
								trigger: 'item'
							},
							legend: {
								orient: 'vertical',
								left: 'left',
								data: ['全学院'],
								type:'scroll'
							},
							visualMap: {
							      // 左下角定义 在选中范围中的视觉元素 渐变地区颜色
							      type: 'piecewise', // 类型为分段型
							      top: "bottom",
							      right: 10,
							      splitNumber: 6,
							      seriesIndex: [0],
							      itemWidth: 20, // 每个图元的宽度
							      itemGap: 2,    // 每两个图元之间的间隔距离，单位为px
							      pieces: [      // 自定义每一段的范围，以及每一段的文字   
							        { gte: 500, label: '500人以上', color: '#c1484e' },
							        { gte: 300, lte: 499, label: '300-499人', color: '#d57b6e' },
									{ gte: 100, lte: 299, label: '100-299人', color: '#d57b6e' },
							        { gte: 10, lte: 99, label: '10-99人', color: '#df9a7e' },
							        { lte: 9, label: '1-9人', color: '#f5eda5' },
									// 不指定 min，表示 min 为无限大（-Infinity）。
							      ],
							      textStyle: {
							        color: '#737373'
							      }
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
								name: '全学院',
								type: 'map',
								mapType: 'china',
								roam: false,								
								zoom: 1.2,
								label: {
									normal: {
										show: true
									},
									emphasis: {
										show: false
									}
								},
								data: addrData
							}]
						};
						myChart.hideLoading();
						myChart.setOption(option);
					})

			},
		
			/**
			 * 到勤率折线图
			 * 暂无数据，仅演示
			 */
			drawAttendChart(){
				//TODO
				let myChart = this.$echarts.init(document.getElementById("attendence"));
				let option = {
				     title: {
				            text: '近7天学院到勤率(演示数据)',
				            subtext: '(单位：%)',
				            left: 'center'
				        },
				    xAxis: {
				        type: 'category',
				        data: ['2019-12-01', '2019-12-02', '2019-12-03', '2019-12-04', '2019-12-05', '2019-12-06', '2019-12-07']
				    },
				    yAxis: {
				        type: 'value',
				        min:80,
				        max:100
				    },
				    tooltip: {
				        trigger: 'axis'
				    },
				    series: [{
				        data: [98, 85, 96,90, 92, 92, 86],
				        type: 'line',
				        smooth: true
				    }]
				};
				
				myChart.setOption(option);
			}
		},
		mounted() {

			//提示信息
			this.autoopen(this.automsgtitle, this.automsg);
			//数据面板显示
			this.$http.get("/overview/showBoard")
				.then(({
					data
				}) => {
					this.boardlist = data;
					console.log(this.boardlist);
				})
				.catch(err => {
					console.log(err);
					this.autoopen('错误', '网络错误,访问超时！');
				});
			//性别图表显示
			this.changeSexChart('0');
			//获取年级列表
			this.$http.get("/overview/listGrades")
				.then(({
					data
				}) => {
					this.gradelist.push.apply(this.gradelist, data);
					data.map(grade => {
						let label = grade;
						if (grade.length == 2){
							label = grade + "研究生";
						}
						this.options.push({
							'value': grade,
							'label': label
						})
					})
				})
				.catch(err => {
					console.log(err);
					this.autoopen('错误', '网络错误,访问超时！');
				});

			//教师分布图
			this.drawTeacherGradeChart();
			//生源地图
			this.dramStuMap();
			
			this.drawAttendChart();

		}


	}
</script>

<style scoped="scoped">
	.num,
	.el-main {
		margin: 10px;
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		height: 500px;
		width: 500px;
	}

	.num {
		height: 400px;

	}

	.num div {

		height: 165px;
		color: #fff;
	}

	.num div p {
		font-size: 30px;
	}

	.num div p>span {
		font-size: 50%;
	}

	.el-tag {
		text-align: center;
	}

	.el-select {
		float: right;
		z-index: 10;
	}
</style>
