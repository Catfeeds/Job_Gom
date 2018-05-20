<template>
	<div class="tableC">
    <div>
      <div class="fB">
        <div class="th" v-for="key in columns"
          @click="sortBy(key)"
          :class="{active: sortKey == key}">
          {{key | capitalize}}
          <span class="arrow" :class="(sortOrders[key] > 0 ? 'asc' : 'dsc')">
          </span>
        </div>
      </div>
    </div>
    <div>
      <div class="tr" v-for="entry in data
        | filterBy filterKey
        | orderBy sortKey sortOrders[sortKey]">
	  <!--<div class="tr" v-for="entry in data">-->
		<div class="fB showmore" @click="showMore($event, $index, entry)" data-requested="true" data-index={{$index}}>
			<div class="td" v-for="key in columns">{{entry[key]}}</div>
		</div>
		<div class="relate">
			<!--<form-component :form.sync="entry.data" :paconfig.sync="entry.pconfig" :formindex="$index" @click="change(entry.pconfig)"></form-component>-->
			<table class="table table-striped table-hover table-condensed">
				<tr v-for="item in entry.data">
					<th track-by="$index" v-for="val in entry.data[$index].value">{{val}}</th>
				</tr>
			</table>
			<v-pagination v-if="entry.pconfig" :pagination-config.sync="entry.pconfig" @click="change(entry)"></v-pagination>
			<!--<v-pagination :pagination-config.sync="pageconfig"></v-pagination>-->
		</div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import actions from 'actions';
import store from 'store';
import Vue from 'vue';
import formComponent from './from.vue';
export default {
	name: 'grid-template',
	props: {
		data: Array,
		columns: Array,
		filterKey: String,
		formcontentprop: Object
	},
	components: {
		formComponent
	},
	data() {
		var sortOrders = {};
		if (this.columns) {
			this.columns.forEach(function(key) {
				sortOrders[key] = 1;
			});
		}
		return {
			sortKey: '',
			sortOrders: sortOrders,
			pageconfig: {
				currentPage: 1,
				itemsPerPage: 5,
				pagesLength: 1,
				totalItems: 1,
				onChange: ''
			}
		};
		// this.columns.forEach(function(key) {
		// 	sortOrders[key] = 1;
		// });
	},
	ready() {},
	events: {},
	methods: {
		sortBy(key) {
			this.sortKey = key;
			this.sortOrders[key] = this.sortOrders[key] * -1;
		},
		showMore(e, index, entry) {
			const dom = e.target;
			$(dom).parent().next('div').slideToggle();
			const showmore = $('.showmore').eq(index);
			let requested = showmore.attr('data-requested');
			if (requested === 'true' && entry !== {}) {
				showmore.attr('data-requested', 'false');
				this.getComponentData(entry);
			}
		},
		change(entry) {
			this.getComponentData(entry);
		},
		getComponentData(entry) {
			let _this = this;
			let getParams = {
				'type': 'formContent',
				'dataid': this.formcontentprop.dataid,
				'dataidc': this.formcontentprop.dataidc,
				// 'id': parseInt(this.$route.params.id),
				'id': this.formcontentprop.id,
				'indexval': entry,
				'legend': this.formcontentprop.legend
			};
			getParams.legend.page_index = entry.pconfig.currentPage;
			getParams.legend.page_size = entry.pconfig.itemsPerPage;
			getParams.indexval = entry;

			// delete getParams.indexval.data;
			// delete getParams.indexval.pconfig;

			var getParam = {
				'data': JSON.stringify(getParams)
			};
			if (getParam.data === '{}') {
				return false;
			}
			let entryData = [];
			this.$http({
				url: 'getComponentData',
				method: 'POST',
				emulateJSON: true,
				body: getParam
			}).then((res) => {
				return res.json();
			}).then((res) => {
				if (res.data !== '' && res.data.result) {
					Vue.set(entry, 'data', res.data.result.series[0].data);
					entry.pconfig.totalItems = res.data.result.series[0].total;
					entry.pconfig.onChange = function() {};
					entry.pconfig.pagesLength = 5;
					Vue.set(entry, 'pconfig', entry.pconfig);
				} else {
					actions.alert(store, {
						show: true,
						msg: '无内容！请选择其它字段或其它数据源',
						type: 'warning',
						dismissible: true,
						delay: 1000
					});
				}
			});
		}
	}
};
</script>
<style>
.relate{
	width: 100%;
	text-align: center;
	display: none;
	padding:20px 0;
}

.tableC {
  border: 2px solid #335166;
  border-radius: 3px;
  background-color: #fff;
  width: 100%
}

.th {
  background-color: #2f4554;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -user-select: none;
  flex-grow: 1
}

.fB{
	display: -webkit-flex; /* Safari */
	display: flex;
	flex-wrap: nowrap;
	width: 100%;
	border-bottom: 1px solid #335166;
}

.td {
  background-color: #ffffff;
  flex-grow: 1
}

.tr{
	width: 100%;
}

.th, .td {
  min-width: 120px;
  padding: 10px 20px;
}

.th.active {
  color: #fff;
}

.th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>
