<template>
	<view class="e-picker">
		<picker mode="multiSelector" :range="range" :value="value" @change="change" @columnchange="columnchange">
			<slot></slot>
		</picker>
	</view>
</template>

<script>
	import * as utils from "./e-picker.js";
	let defaultValue;
	export default {
		name:'EPicker',
		data() {
			return {
				range: [],
				value: []
			};
		},
		props: {
			mode: {
				type: String,
				default: "date"
			},
			showValue: String,
			startYear: {
				type: [Number, String],
				default: 1949
			},
			endYear: {
				type: [String, Number],
				default: new Date().getFullYear()
			}
		},
		watch: {
			showValue(v) {
				this.init()
			}
		},
		created() {
			this.init();
		},
		methods: {
			init() {
				this.range = [];
				this.value = [];
				let l;
				defaultValue = utils.getLocalTime(this.mode)
				if (this.showValue) {
					defaultValue = this.showValue
				}
				utils.checkShowValue(this.mode, defaultValue);
				this.mode == "dateTime" ? (l = 6) : (l = 3);
				for (let i = 0; i < l; i++) {
					this.range.push([]);
					this.value.push(0);
					this.setColumns(i);
				}
			},
			setColumns(index) {
				const m = this.mode;
				if (m == "dateTime") {
					const showYear = defaultValue.substring(0, 4),
						showMonth = defaultValue.substring(5, 7),
						showDay = defaultValue.substring(8, 10);
					switch (index) {
						case 0:
							const s = +this.startYear,
								e = +this.endYear;
							for (let i = s; i < e + 1; i++) {
								this.range[index].push(i + "年");
							}
							this.value[index] = this.range[index].indexOf(showYear + "年");
							break;
						case 1:
							this.range[index] = utils.getArr(1);
							this.value[index] = this.range[index].indexOf(showMonth + "月");
							break;
						case 2:
							this.range[index] = utils.getDayArr(+showYear, +showMonth);
							this.value[index] = this.range[index].indexOf(showDay + "日");
							break;
						case 3:
							const show_h = defaultValue.substring(11, 13);
							this.range[index] = utils.getArr(3);
							this.value[index] = this.range[index].indexOf(show_h + "时");
							break;
						case 4:
							const show_m = defaultValue.substring(14, 16);
							this.range[index] = utils.getArr(4);
							this.value[index] = this.range[index].indexOf(show_m + "分");
							break;
						case 5:
							const show_s = defaultValue.substring(17, 19);
							this.range[index] = utils.getArr(5);
							this.value[index] = this.range[index].indexOf(show_s + "秒");
							break;
					}
				} else if(m=="time"){
					switch (index) {
						case 0:
							const show_h = defaultValue.substring(0, 2);
							this.range[index] = utils.getArr(3);
							this.value[index] = this.range[index].indexOf(show_h + "时");
							break;
						case 1:
							const show_m = defaultValue.substring(3, 5);
							this.range[index] = utils.getArr(4);
							this.value[index] = this.range[index].indexOf(show_m + "分");
							break;
						case 2:
							const show_s = defaultValue.substring(6, 8);
							this.range[index] = utils.getArr(5);
							this.value[index] = this.range[index].indexOf(show_s + "秒");
							break;
					}
				}else{
					const showYear = defaultValue.substring(0, 4),
						showMonth = defaultValue.substring(5, 7),
						showDay = defaultValue.substring(8, 10);
					switch (index) {
						case 0:
							const s = +this.startYear,
								e = +this.endYear;
							for (let i = s; i < e + 1; i++) {
								this.range[index].push(i + "年");
							}
							this.value[index] = this.range[index].indexOf(showYear + "年");
							break;
						case 1:
							this.range[index] = utils.getArr(1);
							this.value[index] = this.range[index].indexOf(showMonth + "月");
							break;
						case 2:
							this.range[index] = utils.getDayArr(+showYear, +showMonth);
							this.value[index] = this.range[index].indexOf(showDay + "日");
							break;
					}
				}
				this.$forceUpdate()
			},
			columnchange(e) {
				if (this.mode == "time") return;
				const column = e.detail.column,
					value = e.detail.value;
				if (column == 1 || !column) {
					this.value[column] = value;
				}
				const y = parseInt(this.range[0][this.value[0]]),
					m = parseInt(this.range[1][this.value[1]]);
				this.range[2] = utils.getDayArr(y, m);
				this.$forceUpdate()
			},
			change(e) {
				const value = e.detail.value;
				const timeArr = value.map((v, i) => {
					return this.range[i][v];
				});
				this.$emit("change", utils.getDateTimeValue(timeArr, this.mode));
			}
		}
	};
</script>
