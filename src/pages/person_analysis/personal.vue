<template>
	<div>
		<el-drawer title="词云图设置(词条请用空格符分隔)" :visible.sync="drawer" :direction="direction" :beforeClose="drawerhandleClose">
			<el-form :label-position="labelPosition" label-width="80px" :model="wordcloud">
				<el-form-item label="添加停用词条">
					<el-input type="textarea" placeholder="每个词语请用空格隔开" v-model="wordcloud.stopwd" maxlength="30" show-word-limit>
					</el-input>
				</el-form-item>
				<el-form-item label="添加自定义词条">
					<el-input type="textarea" placeholder="每个词语请用空格隔开" v-model="wordcloud.userdict" maxlength="30" show-word-limit>
					</el-input>
				</el-form-item>
				<el-button @click="saveWordCloudSettings" style="float: right;margin-right: 5px;" type="primary" plain size="medium"
				 :disabled="flag==3?false:true">
					{{flag==3?'保存':'保存中'}}
				</el-button>
			</el-form>
		</el-drawer>
		<el-container>
			<el-main class="search">
				<el-form :inline="true" :model="stuForm" ref="stuForm" class="form-inline" style="margin: 0 auto;">
					<el-form-item label="学号查询">
						<el-autocomplete popper-class="my-autocomplete" v-model="state" :fetch-suggestions="querySearch" placeholder="请输入学号或姓名"
						 @select="handleSelect" :trigger-on-focus="false">
							<i class="el-icon-edit el-input__icon" slot="suffix">
							</i>
							<template slot-scope="{ item }">
								<div class="name">{{ item.name }}</div>
								<span class="addr">{{ item.value }}</span>
							</template>
						</el-autocomplete>
					</el-form-item>

					<el-form-item>
						<el-button type="primary" @click="onSubmitPerson">查询</el-button>
					</el-form-item>
				</el-form>
			</el-main>
		</el-container>
		<el-container>
			<el-aside width="450px">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>学生卡片</span>
					</div>
					<div>
						<el-table :data="tableData" style="width: 100%" :show-header='false'>
							<el-table-column prop="key" width="180">
							</el-table-column>
							<el-table-column prop="value">
							</el-table-column>
						</el-table>
					</div>
				</el-card>
			</el-aside>
			<el-main>
				<el-tag type="info" effect="dark">学生描述
					<el-button @click="drawer = true" style="float: right;background: none;color: #FFFFFF;margin-top: 1px;margin-left: 5px;"
					 plain size="mini">
						分析不准确?
					</el-button>
				</el-tag>

				<div><img :src="imagePathPrefix+imagePath" alt="" width="600">
				</div>

			</el-main>
		</el-container>
		<el-container>
			<el-main style="height: auto;">
				<el-tag type="info" effect="dark">学生行为</el-tag>
				<el-tabs v-model="activeName" @tab-click="stubehavior">
					<el-tab-pane label="学生成绩" name="stuscore">
						<el-container id="stuscoretab">
							<el-header>
								<el-select v-model="value" size="mini" value="2018-2019" @change="changeTyChart" style="float: left;">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-header>
							<el-container>
								<el-aside style="height: 100%;">
									<div id="mksradar" style="width: 290px;height: 290px;">1</div>
								</el-aside>

								<el-main style="height: 100%;">
									<el-carousel indicator-position="outside" height="350px" :autoplay="false">
										<el-carousel-item>
											<el-row :gutter="5">
												<el-col :span="8">
													<el-card shadow="hover">
														<div slot="header" class="clearfix">
															<span>学科平均分</span>
														</div>
														{{studentscore.avg}}<span style="font-size: 10px">分</span>
													</el-card>
												</el-col>
												<el-col :span="8">
													<el-card shadow="hover">
														<div slot="header" class="clearfix">
															<span>获得学分</span>
														</div>
														{{studentscore.credit}}<span style="font-size: 10px">分</span>
													</el-card>
												</el-col>
												<el-col :span="8">
													<el-card shadow="hover">
														<div slot="header" class="clearfix">
															<span>平均学分绩点</span>
														</div>
														{{studentscore.avgcreditjd}}
													</el-card>
												</el-col>
											</el-row>
											<br>
											<el-row :gutter="5">
												<el-col :span="8">
													<el-card shadow="hover">
														<div slot="header" class="clearfix">
															<span>智育分</span>
														</div>
														{{studentscore.knowledge}}<span style="font-size: 10px">分</span>
													</el-card>
												</el-col>
												<el-col :span="8">
													<el-card shadow="hover">
														<div slot="header" class="clearfix">
															<span>德育分</span>
														</div>
														{{studentscore.moral}}<span style="font-size: 10px">分</span>
													</el-card>
												</el-col>
												<el-col :span="8">
													<el-card shadow="hover">
														<div slot="header" class="clearfix">
															<span>体育分</span>
														</div>
														{{studentscore.sports}}<span style="font-size: 10px">分</span>
													</el-card>
												</el-col>
											</el-row>
										</el-carousel-item>
										<el-carousel-item>
											<el-row :gutter="5">
												<el-col :span="8">
													<el-card shadow="hover">
														<div slot="header" class="clearfix">
															<span>成绩Top1:{{studentscore.top1.name}}</span>
														</div>
														{{studentscore.top1.score}}<span style="font-size: 10px">分</span>
													</el-card>
												</el-col>
												<el-col :span="8">
													<el-card shadow="hover">
														<div slot="header" class="clearfix">
															<span>成绩Top2:{{studentscore.top2.name}}</span>
														</div>
														{{studentscore.top2.score}}<span style="font-size: 10px">分</span>
													</el-card>
												</el-col>
												<el-col :span="8">
													<el-card shadow="hover">
														<div slot="header" class="clearfix">
															<span>成绩Top3:{{studentscore.top3.name}}</span>
														</div>
														{{studentscore.top3.score}}<span style="font-size: 10px">分</span>
													</el-card>
												</el-col>
											</el-row>
											<br>
											<el-row :gutter="5">
												<el-col :span="8">
													<el-card shadow="hover">
														<div slot="header" class="clearfix">
															<span>最高分</span>
														</div>
														{{studentscore.topscore}}<span style="font-size: 10px">分</span>
													</el-card>
												</el-col>
												<el-col :span="8">
													<el-card shadow="hover">
														<div slot="header" class="clearfix">
															<span>专业排名</span>
														</div>
														{{studentscore.sorted}}
													</el-card>
												</el-col>
												<el-col :span="8">
													<el-card shadow="hover">
														<div slot="header" class="clearfix">
															<span>挂科率</span>
														</div>
														{{studentscore.fails}}<span style="font-size: 10px">%</span>
													</el-card>
												</el-col>
											</el-row>
										</el-carousel-item>
									</el-carousel>

								</el-main>
							</el-container>
						</el-container>
					</el-tab-pane>
					<el-tab-pane label="成绩走势" name="trend">
						<div id="trendchart" style="width: 1000px;height: 350px;">

						</div>
					</el-tab-pane>
					<el-tab-pane label="获奖/获证记录" name="reward">
						<el-container>
							<el-header>
								<el-select v-model="value" size="mini" value="2018-2019" @change="changeTyChart" style="float: left;">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-header>
							<el-container>
								<el-main>
								<el-timeline class="rewardRecords">
								    <el-timeline-item timestamp="2018/6/13" placement="top">
								      <el-card>
								        <h4>企业模拟经营活动二等奖</h4>
								        <p>校级 团队奖 获得于 2018/6/13</p>
								      </el-card>
								    </el-timeline-item>
								    <el-timeline-item timestamp="2018/5/16" placement="top">
								      <el-card>
								        <h4>长沙理工大学英语竞赛</h4>
								        <p>校级 个人奖 获得于 2018/5/16</p>
								      </el-card>
								    </el-timeline-item>
								    <el-timeline-item timestamp="2018/4/16" placement="top">
								      <el-card>
								        <h4>优秀志愿者</h4>
								        <p>校级 团队奖 获得于 2018/4/16</p>
								      </el-card>
								    </el-timeline-item>
								  </el-timeline>
								  </el-main>
							</el-container>
						</el-container>											
					</el-tab-pane>

					<el-tab-pane label="惩罚记录" name="punish">
						<el-container>
							<el-main>
							<el-timeline class="rewardRecords">
							    <el-timeline-item timestamp="2018/6/13" placement="top">
							      <el-card>
							        <h4>迟到</h4>
							        <p>通报批评 于 2018/6/13</p>
							      </el-card>
							    </el-timeline-item>
							    
							  </el-timeline>
							  </el-main>
						</el-container>
					</el-tab-pane>
					<el-tab-pane label="考勤记录" name="kq">
						
						<el-calendar v-model="datevalue" id="calendar">
						      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
						      <template
						       slot="dateCell"
						       slot-scope="{date, data}">
						        <!--自定义内容-->
						          <div>
						             <div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
						                <div v-for="item in calendarData">
						                   <div v-if="(item.months).indexOf(data.day.split('-').slice(1)[0])!=-1">
						                     <div v-if="(item.days).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
						                          <el-tooltip class="item" effect="dark" :content="item.things" placement="right">
						                               <div class="is-selected">{{item.things}}</div>
						                          </el-tooltip>
						                       </div>
						                    <div v-else></div>
						                   </div>
						               <div v-else></div>
						             </div>
						          </div>
						      </template>
						</el-calendar>
					</el-tab-pane>
				</el-tabs>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import wordcloudindex from './wordcloud1.js'
	import {
		Loading
	} from 'element-ui';
	export default {
		data() {
			return {
				stuForm: {
					stuid: ''
				},
				calendarData: [
				                    { months: ['09', '11'],days: ['15'],year:['2019'],things: '迟到' },
				                    { months: ['11'], days: ['20'],things: '缺勤' }
				                ],
				                datevalue: new Date(),
				 activities: [{
				          content: '活动按期开始',
				          timestamp: '2018-04-15'
				        }, {
				          content: '通过审核',
				          timestamp: '2018-04-13'
				        }, {
				          content: '创建成功',
				          timestamp: '2018-04-11'
				}],
				labelPosition: 'top',
				wordcloud: {
					stopwd: '',
					userdict: ''
				},
				flag: 3,
				studentscore: {
					avg: '无',
					credit: '无',
					avgcreditjd: '无',
					moral: '无',
					knowledge: '无',
					sports: '无',
					top1: {
						name: '无',
						score: '无'
					},
					top2: {
						name: '无',
						score: '无'
					},
					top3: {
						name: '无',
						score: '无'
					},
					topscore: '无',
					sorted: '无',
					fails: '无'

				},
				mks: [],
				savemsg: '保存',
				imagePathPrefix: 'http://192.168.184.1:5000/',
				imagePath: 'static/blank.png',
				searchinput: '',
				stuadvices: [], //搜索建议列表
				state: '', //搜索框值
				timeout: null,
				drawer: false,
				direction: 'ltr',
				activeName: 'stuscore',
				options: [{
						value: '0',
						label: '请选择学期'
					}, {
						value: '2017-2018',
						label: '2017-2018'
					},
					{
						value: '2018-2019',
						label: '2018-2019'
					}
				],
				value: '2018-2019',
				tableData: [{
					key: '学号',
					value: '暂无数据'
				}, {
					key: '姓名',
					value: '暂无数据'
				}, {
					key: '性别',
					value: '暂无数据'
				}, {
					key: '年级',
					value: '暂无数据'
				}, {
					key: '专业',
					value: '暂无数据'
				}, {
					key: '班级',
					value: '暂无数据'
				}, {
					key: '民族',
					value: '暂无数据'
				}, {
					key: '政治面貌',
					value: '暂无数据'
				}, {
					key: '家庭住址',
					value: '暂无数据'
				}, {
					key: '出生日期',
					value: '暂无数据',
				}, {
					key: '寝室',
					value: '暂无数据'
				}, {
					key: '学生类型',
					value: '暂无数据'
				}]

			}
		},
		methods: {
			onSubmitPerson() {
				let sno = this.state;
				let flag = true;
				if (sno.match(/^[0-9]*$/)) {
					let loadingInstance = Loading.service({
						fullscreen: true
					});
					this.$http.get("stuAnalysis/searchstu/" + sno)
						.then(({
							data
						}) => {
							this.tableData = [{
								key: '学号',
								value: data.studentno
							}, {
								key: '姓名',
								value: data.studentname
							}, {
								key: '性别',
								value: data.sex
							}, {
								key: '年级',
								value: data.termyear
							}, {
								key: '专业',
								value: data.major
							}, {
								key: '班级',
								value: data.class
							}, {
								key: '民族',
								value: data.mz
							}, {
								key: '政治面貌',
								value: data.zzmm
							}, {
								key: '家庭住址',
								value: data.address
							}, {
								key: '出生日期',
								value: data.birthday,
							}, {
								key: '寝室',
								value: data.buildingname + data.roomnum
							}, {
								key: '学生类型',
								value: data.stutype
							}]

							this.drawMksRadar(this.tableData[0]["value"], this.value);
							flag = true;
						})
						.catch(err => {
							alert(this.$errmsg(err));
							loadingInstance.close();
							this.tableData = [];
							flag = true;
						});
					this.$http.get("stuAnalysis/stuwordcloud/" + sno)
						.then(({
							data
						}) => {
							this.imagePath = data;
							loadingInstance.close();
						})
						.catch(err => {
							alert(this.$errmsg(err));
							this.imagePathPrefix = '';
							this.imagePath = '../../assets/blank.png';
						});
					this.getStudentScore(sno, '2018-2019');


				} else {
					alert("请输入学号进行查询");
					loadingInstance.close();
					this.tableData = [];
				}



			},
			stubehavior(tab, event) {
				console.log(tab.name);
				switch (tab.name) {
					case "stuscore":
						break;
					case "trend":
						this.drawSorcetrend();
						break;
					case "reward":

						break;
					case "punish":

						break;
					case "kq":

						break;
				}
			},
			changeTyChart() {

			},
			querySearch(queryString, cb) {
				var stuadvices = this.stuadvices;
				var results = queryString ? stuadvices.filter(this.createFilter(queryString)) : stuadvices;
				// 调用 callback 返回建议列表的数据
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					cb(results);
				}, 2000 * Math.random());
			},
			createFilter(queryString) {
				return (state) => {
					return (state.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			handleSelect(item) {
				console.log(item);
			},
			drawerhandleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						this.wordcloud.stopwd = '';
						this.wordcloud.userdict = '';
						done();
					})
					.catch(_ => {});

			},
			saveWordCloudSettings() {
				this.flag = 1;
				this.savemsg = '保存中';
				let stopwd = this.wordcloud.stopwd;
				let userdict = this.wordcloud.userdict;
				let stoplist = stopwd.split(" ");
				let userdictlist = userdict.split(" ");
				if (stoplist.length == 1 && stoplist[0].length == 0) {
					this.flag += 1;
				} else {
					this.$http.put("admin/addstopwords", this.$qs.stringify({
							"stopwd": stoplist
						}, {
							indices: false
						}))
						.then(({
							data
						}) => {
							this.addswdmsg = data;
							this.flag += 1;
						})
						.catch(err => {
							alert(this.$errmsg(err));
							this.flag += 1;
						});
				}
				if (userdictlist.length == 1 && userdictlist[0].length == 0) {
					this.flag += 1;
				} else {
					this.$http.put("admin/adduserdict", this.$qs.stringify({
							"userdict": userdictlist
						}, {
							indices: false
						}))
						.then(({
							data
						}) => {
							this.addudtmsg = data;
							this.flag += 1;
						})
						.catch(err => {
							alert(this.$errmsg(err));
							this.flag += 1;
						});
				}

			},

			/**
			 * @param {String} sno 学号
			 * @param {String} xuenian 学年
			 * 三育雷达图
			 */
			drawMksRadar(sno, xuenian) {
				
				let myChart = this.$echarts.init(document.getElementById("mksradar"));
				myChart.showLoading();
				this.$http.post("stuAnalysis/mks/" + xuenian + "/" + sno)
					.then(({
						data
					}) => {
						this.mks = [];
						this.mks.push(data["m"]);
						this.mks.push(data["k"]);
						this.mks.push(data["s"]);
						this.studentscore.moral = (data['m'] * 25).toFixed(2);
						this.studentscore.knowledge = (data['k'] * 70).toFixed(2);
						this.studentscore.sports = (data['s'] * 5).toFixed(2);
						let option = {
							title: {
								text: '学生综合评价',
								textStyle: {
									fontSize: 12
								}
							},
							tooltip: {},

							radar: {
								// shape: 'circle',
								name: {
									textStyle: {
										color: '#fff',
										backgroundColor: '#999',
										borderRadius: 3,
										padding: [3, 5]
									}
								},
								indicator: [{
										name: '德育',
										max: 1
									},
									{
										name: '智育',
										max: 1
									},
									{
										name: '体育',
										max: 1
									}
								]
							},
							series: [{
								name: '三育',
								type: 'radar',
								areaStyle: {
									normal: {}
								},
								data: [{
									value: this.mks,
									name: '三育'
								}]
							}]
						};
						myChart.hideLoading();
						myChart.setOption(option);
					})
					.catch(err => {
						myChart.hideLoading();
						alert(this.$errmsg(err));
					})
			},
			drawBlankRadar() {
				let myChart = this.$echarts.init(document.getElementById("mksradar"));
				let option = {
					title: {
						text: '学生综合评价',
						textStyle: {
							fontSize: 12
						}
					},
					tooltip: {},

					radar: {
						// shape: 'circle',
						name: {
							textStyle: {
								color: '#fff',
								backgroundColor: '#999',
								borderRadius: 3,
								padding: [3, 5]
							}
						},
						indicator: [{
								name: '德育',
								max: 1
							},
							{
								name: '智育',
								max: 1
							},
							{
								name: '体育',
								max: 1
							}
						]
					},
					series: [{
						name: '三育',
						type: 'radar',
						areaStyle: {
							normal: {}
						},
						data: [{
							value: this.mks,
							name: '三育'
						}]
					}]
				};
				myChart.setOption(option);
			},

			/**
			 * 获取学生成绩面板数据
			 */
			getStudentScore(sno, xuenian) {
				this.$http.post("stuAnalysis/courses/" + xuenian + "/" + sno + "/3")
					.then(({
						data
					}) => {
						this.studentscore.top1.name = data[0]['cname'];
						this.studentscore.top2.name = data[1]['cname'];
						this.studentscore.top3.name = data[2]['cname'];
						this.studentscore.top1.score = data[0]['score'];
						this.studentscore.top2.score = data[1]['score'];
						this.studentscore.top3.score = data[2]['score'];
						this.studentscore.topscore = data[0]['score'];
					})
					.catch(err => {
						alert(this.$errmsg(err));
					});

				this.$http.post("stuAnalysis/courses/" + xuenian + "/" + sno + "/50")
					.then(({
						data
					}) => {
						let sum = 0;
						let credit = 0;
						let creditjd = 0;
						data.map(d => {
							sum += d['score'];
							if (d['score'] >= 60) {
								credit += d['credit'];
								creditjd += d['credit'] * d['jd'];
							}
						});
						this.studentscore.avg = (sum / data.length).toFixed(2);
						this.studentscore.credit = credit.toFixed(2);
						this.studentscore.avgcreditjd = (creditjd / credit).toFixed(2);

					})
					.catch(err => {
						alert(this.$errmsg(err));
					});
					this.$http.get("stuAnalysis/rank/" + xuenian + "/" + sno)
					.then(({
						data
					}) => {
						this.studentscore.sorted = data;
					});
					this.$http.post("stuAnalysis/searchfailsRate/"+xuenian+"/"+sno)
							.then(({data}) => this.studentscore.fails = data*100);
			},
			
		
		/**
		 * 成绩趋势
		 *
		 */
		drawSorcetrend() {
			//TODO
			let myChart = this.$echarts.init(document.getElementById("trendchart"));
			let colors = ['#5793f3', '#d14a61', '#675bba'];
			let option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross'
					}
				},
				legend: {
					data: ['德育分', '智育分', '体育分']
				},
				xAxis: [{
					type: 'category',
					axisTick: {
						alignWithLabel: true
					},
					data: ['2017-2018', '2018-2019', '2019-2020']
				}],
				yAxis: [{
						type: 'value',
						name: '德育分',
						min: 15,
						max: 25,
						interval: 1,
						position: 'right',
						axisLine: {
							lineStyle: {
								color: colors[0]
							}
						},
						axisLabel: {
							formatter: '{value} '
						}
					},
					{
						type: 'value',
						name: '智育分',
						min: 60,
						max: 70,
						interval: 2,
						position: 'right',
						offset: 80,
						axisLine: {
							lineStyle: {
								color: colors[1]
							}
						},
						axisLabel: {
							formatter: '{value} '
						}
					},
					{
						type: 'value',
						name: '体育分',
						min: 0,
						max: 5,
						position: 'left',
						axisLine: {
							lineStyle: {
								color: colors[2]
							}
						},
						axisLabel: {
							formatter: '{value}'
						},
						interval: 1
					}
				],
				series: [{
						name: '德育分',
						type: 'line',
						data: [20, 21.5, 22]
					},
					{
						name: '智育分',
						type: 'line',
						yAxisIndex: 1,
						data: [62, 61.5, 62.5]
					},
					{
						name: '体育分',
						type: 'line',
						yAxisIndex: 2,
						data: [4.5, 4, 3.8]
					}
				]
			};

			myChart.setOption(option);
		}


	},
	components: {

		},
		mounted() {
			this.drawBlankRadar();
		
		},
		watch: {
			state(newv, oldv) {
				if (newv.match(/^[\u4e00-\u9fa5]+$/)) {
					if (newv.length > 10) {
						return;
					}
					let data = {
						"sname": newv
					}
					this.$http.post("stuAnalysis/searchadv", this.$qs.stringify(data))
						.then(({
							data
						}) => {
							this.stuadvices = data;
						})
						.catch(err => {
							if (err.response.status != 404) {
								alert(this.$errmsg(err));
							}

						})

				}
			},
			flag(n) {
				if (n == 3) {
					this.$message({
						message: '保存成功！',
						type: 'success'
					});
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.el-main,
	.el-aside {
		margin: 10px;
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		height: 500px;

	}

	.search {
		height: 100px;
	}

	.el-form-item {
		margin: 10px;
	}

	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.box-card {
		height: 99.5%;
		overflow-y: scroll;
	}



	.my-autocomplete li {
		line-height: normal;
		padding: 7px;
	}

	.name {
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.addr {
		font-size: 8px;
		color: #b4b4b4;
	}

	.highlighted .addr {
		color: #ddd;
	}

	.clearfix {
		font-size: 14px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.el-card {
		font-size: 50px;
	}
	.rewardRecords .el-card{
		font-size: 14px;
	}
	.is-selected{
	        color: red;
			line-height: 20px;
	        font-size: 16px;
	        margin-top: 5px;
			background-color: yellow;
	    }
</style>
