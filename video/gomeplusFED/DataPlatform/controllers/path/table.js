/**
 * @author yanglei
 * @date 20160811
 * @fileoverview 报表导出
 */

module.exports = {
    table() {
        return {
            id : 0,
            name : "社交报表",
            path : "/socialAnalysis/table",
            display : true,
            defaultData : [
                {
                    type : "table",
                    title : "我的报表",
                    query_api : "/socialAnalysis/tableOne"
                }
            ]
        };
    },
    rebate_total() {
        return {
            id : 4,
            name : "返利报表",
            path : "/socialAnalysis/rebate",
            display : true,
            defaultData : [
                {
                    type : "table",
                    title : "总体返利情况",
                    query_api : "/socialAnalysis/rebateOne"
                }
            ]
        };
    },
    rebate_total_new() {
        return {
            name : "返利报表",
            path : "/socialAnalysis/rebateNew",
            display : true,
            defaultData : [
                {
                    type : "table",
                    title : "新增返利",
                    query_api : "/socialAnalysis/rebateNewOne"
                }
            ]
        };
    },
    data_table_day() {
        return {
            id : 1,
            name : "数据日报",
            path : "/socialAnalysis/dataTableDay",
            display : true,
            defaultData : [
                {
                    type : "table",
                    title : "总体数据情况",
                    query_api : "/socialAnalysis/dataTableDayZero"
                },
                {
                    type : "table",
                    title : "总体数据情况",
                    query_api : "/socialAnalysis/dataTableDayOne"
                },
                {
                    type : "table",
                    title : "新增数据情况",
                    query_api : "/socialAnalysis/dataTableDayTwo"
                }
            ]
        };
    },
    data_table_week() {
        return {
            id : 2,
            name : "数据周报",
            path : "/socialAnalysis/dataTableWeek",
            display : true,
            defaultData : [
                {
                    type : "table",
                    title : "总体数据情况",
                    query_api : "/socialAnalysis/dataTableWeekZero"
                },{
                    type : "table",
                    title : "总体数据情况",
                    query_api : "/socialAnalysis/dataTableWeekOne"
                }
            ]
        };
    },
    data_table_month() {
        return {
            id : 3,
            name : "数据月报",
            path : "/socialAnalysis/dataTableMonth",
            display : true,
            defaultData : [
                {
                    type : "table",
                    title : "总体数据情况",
                    query_api : "/socialAnalysis/dataTableMonthZero"
                },{
                    type : "table",
                    title : "总体数据情况",
                    query_api : "/socialAnalysis/dataTableMonthOne"
                }
            ]
        };
    },
    data_table_day_order() {
        return {
            name : "数据报表",
            path : "/socialAnalysis/dataTableDayOrder",
            display : true,
            defaultData : [
                {
                    type : "table",
                    title : "订单数据",
                    query_api : "/socialAnalysis/dataTableDayOrderOne"
                }
            ]
        };
    },
    data_table_week_order() {
        return {
            name : "数据报表",
            path : "/socialAnalysis/dataTableWeekOrder",
            display : true,
            defaultData : [
                {
                    type : "table",
                    title : "订单数据",
                    query_api : "/socialAnalysis/dataTableWeekOrderOne"
                }
            ]
        };
    },
    data_table_month_order() {
        return {
            name : "数据报表",
            path : "/socialAnalysis/dataTableMonthOrder",
            display : true,
            defaultData : [
                {
                    type : "table",
                    title : "订单数据",
                    query_api : "/socialAnalysis/dataTableMonthOrderOne"
                }
            ]
        };
    },
    data_table_day_user() {
        return {
            name : "数据报表",
            path : "/socialAnalysis/dataTableDayUser",
            display : true,
            defaultData : [
                {
                    type : "table",
                    title : "用户数据",
                    query_api : "/socialAnalysis/dataTableDayUserOne"
                }
            ]
        };
    },
    data_table_week_user() {
        return {
            name : "数据报表",
            path : "/socialAnalysis/dataTableWeekUser",
            display : true,
            defaultData : [
                {
                    type : "table",
                    title : "用户数据",
                    query_api : "/socialAnalysis/dataTableWeekUserOne"
                }
            ]
        };
    },
    data_table_month_user() {
        return {
            name : "数据报表",
            path : "/socialAnalysis/dataTableMonthUser",
            display : true,
            defaultData : [
                {
                    type : "table",
                    title : "用户数据",
                    query_api : "/socialAnalysis/dataTableMonthUserOne"
                }
            ]
        };
    },
    data_table_day_shop() {
        return {
            name : "数据报表",
            path : "/socialAnalysis/dataTableDayShop",
            display : true,
            defaultData : [
                {
                    type : "table",
                    title : "商铺数据",
                    query_api : "/socialAnalysis/dataTableDayShopOne"
                }
            ]
        };
    },
    data_table_week_shop() {
        return {
            name : "数据报表",
            path : "/socialAnalysis/dataTableWeekShop",
            display : true,
            defaultData : [
                {
                    type : "table",
                    title : "商铺数据",
                    query_api : "/socialAnalysis/dataTableWeekShopOne"
                }
            ]
        };
    },
    data_table_month_shop() {
        return {
            name : "数据报表",
            path : "/socialAnalysis/dataTableMonthShop",
            display : true,
            defaultData : [
                {
                    type : "table",
                    title : "商铺数据",
                    query_api : "/socialAnalysis/dataTableMonthShopOne"
                }
            ]
        };
    },
    data_table_day_vshop() {
        return {
            name : "数据报表",
            path : "/socialAnalysis/dataTableDayVshop",
            display : true,
            defaultData : [
                {
                    type : "table",
                    title : "美店数据",
                    query_api : "/socialAnalysis/dataTableDayVshopOne"
                }
            ]
        };
    },
    data_table_week_vshop() {
        return {
            name : "数据报表",
            path : "/socialAnalysis/dataTableWeekVshop",
            display : true,
            defaultData : [
                {
                    type : "table",
                    title : "美店数据",
                    query_api : "/socialAnalysis/dataTableWeekVshopOne"
                }
            ]
        };
    },
    data_table_month_vshop() {
        return {
            name : "数据报表",
            path : "/socialAnalysis/dataTableMonthVshop",
            display : true,
            defaultData : [
                {
                    type : "table",
                    title : "美店数据",
                    query_api : "/socialAnalysis/dataTableMonthVshopOne"
                }
            ]
        };
    },
    data_table_day_dataRebate() {
        return {
            name : "数据报表",
            path : "/socialAnalysis/dataTableDayDataRebate",
            display : true,
            defaultData : [
                {
                    type : "table",
                    title : "返利数据",
                    query_api : "/socialAnalysis/dataTableDayDataRebateOne"
                }
            ]
        };
    },
    data_table_week_dataRebate() {
        return {
            name : "数据报表",
            path : "/socialAnalysis/dataTableWeekDataRebate",
            display : true,
            defaultData : [
                {
                    type : "table",
                    title : "返利数据",
                    query_api : "/socialAnalysis/dataTableWeekDataRebateOne"
                }
            ]
        };
    },
    data_table_month_dataRebate() {
        return {
            name : "数据报表",
            path : "/socialAnalysis/dataTableMonthDataRebate",
            display : true,
            defaultData : [
                {
                    type : "table",
                    title : "返利数据",
                    query_api : "/socialAnalysis/dataTableMonthDataRebateOne"
                }
            ]
        };
    }
};