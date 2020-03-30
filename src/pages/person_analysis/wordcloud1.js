require('echarts-wordcloud');
import 'echarts/theme/macarons.js'
export default {
	name: 'wordcloudindex',
	data: () => ({
		word_cloud_view: null,
		word_cloud_options: {},
		word_list: [{
 			    name: "大三",
 			    value: "666"
 			}, {
 			    name: "英语能力",
 			    value: "520"
 			}, {
 			    name: "迟到",
 			    value: "999"
 			}, {
 			    name: "雅思",
 			    value: "888"
 			}, {
 			    name: "竞赛",
 			    value: "777"
 			}, {
 			    name: "网络安全",
 			    value: "688"
 			}, {
 			    name: "一次供水问题",
 			    value: "588"
 			}, {
 			    name: "阅读",
 			    value: "516"
 			}, {
 			    name: "会计师",
 			    value: "515"
 			}, {
 			    name: "环境保护",
 			    value: "483"
 			},{
 			    name: "大三",
 			    value: "666"
 			}, {
 			    name: "英语能力",
 			    value: "520"
 			}, {
 			    name: "迟到",
 			    value: "999"
 			}, {
 			    name: "雅思",
 			    value: "888"
 			}, {
 			    name: "竞赛",
 			    value: "777"
 			}, {
 			    name: "网络安全",
 			    value: "688"
 			}, {
 			    name: "一次供水问题",
 			    value: "588"
 			}, {
 			    name: "阅读",
 			    value: "516"
 			}, {
 			    name: "会计师",
 			    value: "515"
 			}, {
 			    name: "环境保护",
 			    value: "483"
 			}]

	}),
	methods: {
		draw_word_cloud_view() {
			if (this.word_cloud_view) {
				this.word_cloud_view.dispose();
			}
			this.word_cloud_view = document.getElementById('word_cloud_view_id') &&
				this.$echarts.init(document.getElementById('word_cloud_view_id'), 'macarons');
			this.word_cloud_view.showLoading();	
			this.word_cloud_view && this.word_cloud_view.setOption(this.word_cloud_options);
			this.word_cloud_view.hideLoading();
		},
		init_view_data() {
			let word_cloud_series = [{
				type: 'wordCloud',
				shape: 'circle',
				//maskImage: maskImage,
				left: 'center',
				top: 'center',
				width: '100%',
				height: '100%',
				right: null,
				bottom: null,
				sizeRange: [6, 60],
				rotationRange: [-45, 90],
				autoSize: {
					enable: true,
					minSize: 6
				},
				textPadding: 0,
				// rotationStep: 45,
				// gridSize: 8,
				drawOutOfBound: false,
				textStyle: {
					normal: {
						fontFamily: 'sans-serif',
						fontWeight: 'bold',
						// Color can be a callback function or a color string
						color: function() {
							// Random color
							return 'rgb(' + [
								Math.round(Math.random() * 256),
								Math.round(Math.random() * 256),
								Math.round(Math.random() * 256)
							].join(',') + ')';
						}
					},
					emphasis: {
						shadowBlur: 10,
						shadowColor: '#333'
					}
				},
				data: this.word_list
			}]

			this.word_cloud_options = {
				series: word_cloud_series
			}
			this.word_cloud_view.setOption(this.word_cloud_options)
		},
	},
	mounted() {
		this.draw_word_cloud_view()
		this.init_view_data()
	},
	render(h) {
		return h('div', {
			attrs: {
				id: 'word_cloud_view_id'
			},
			style: {
				height: '90%'
			}
		})
	}
}
