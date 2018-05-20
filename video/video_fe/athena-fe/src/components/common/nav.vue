<template>
    <el-menu :default-active="defaultActive" :router="true" @select="select">
        <template v-for='item in rs'>
            <el-menu-item :index="item.index">{{item.title}}</el-menu-item>
        </template>
    </el-menu>
</template>
<script>
    export default{
        data(){
            return {
                currentIndex: 'index',
                "defaultActive": "index",
                rs: [
                    {
                        index:'index',indexPath:'/index',title:"静态资源服务"
                    },
                    {
                        index:'log',indexPath:'/log',title:"日志查询"
                    },
                    {
                        index:'releaseproject',indexPath:'/releaseproject',title:"项目发布"
                    }
                ]
            }
        },
        methods: {
            select(index) {
                this.currentIndex = index;
            }
        },
        created(){
            this.defaultActive = this.currentIndex;
        }
    }
</script>