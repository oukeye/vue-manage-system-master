<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened :router="true">
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index" >
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index" >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index" >
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index" >
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index" >
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script type="text/ecmascript-6">
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: '/dashboard',
                        title: '系统首页'
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: '/user',
                        title: '用户管理',
                        subs: [
                            {
                                index: '/userList',
                                title: '用户列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: '2',
                        title: '宣传页管理',
                        subs: [
                            {
                                index: '/publicityList',
                                title: '房东宣传页列表'
                            },
                            {
                                index: '/addPublicity',
                                title: '添加宣传页'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: '3',
                        title: '房源管理',
                        subs: [
                            {
                                index: '/houseList',
                                title: '房源列表'
                            },
                            {
                                index: '/addHouse',
                                title: '添加房源'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'prodIndex',
                        title: '商品管理',
                        subs: [
                            {
                                index: '/prodList',
                                title: '商品列表'
                            },
                            {
                                index: '/addProd',
                                title: '添加商品'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'couponAdmin',
                        title: '优惠券管理',
                        subs: [
                            {
                                index: '/couponList',
                                title: '优惠券列表'
                            },
                            {
                                index: '/addCoupon',
                                title: '添加优惠券'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'shopIndex',
                        title: '店铺管理',
                        subs: [
                            {
                                index: '/editShop',
                                title: '编辑店铺'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'lawyerAdmin',
                        title: '律师管理',
                        subs: [
                            {
                                index: '/lawyerList',
                                title: '律师列表'
                            },
                            {
                                index: '/addLawyer',
                                title: '添加律师'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: '/HouseApplyList',
                        title: '房东房源申请'
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'serviceIndex',
                        title: '服务管理',
                        subs: [
                            {
                                index: '/noticeList',
                                title: '公告列表'
                            },{
                                index: '/serviceList',
                                title: '村服务列表'
                            },{
                                index: '/serviceBannerList',
                                title: '广告列表'
                            },{
                                index: '/serviceTypeList',
                                title: '服务类型列表'
                            }
                        ]
                    },
                    /*{
                        icon: 'el-icon-lx-cascades',
                        index: 'table',
                        title: '基础表格'
                    },
                     {
                        icon: 'el-icon-lx-copy',
                        index: 'tabs',
                        title: 'tab选项卡'
                    },
                    {
                        icon: 'el-icon-lx-calendar',
                        index: '3form',
                        title: '表单相关',
                        subs: [
                            {
                                index: 'form',
                                title: '基本表单'
                            },
                            {
                                index: '3-2',
                                title: '三级菜单',
                                subs: [
                                    {
                                        index: 'editor',
                                        title: '富文本编辑器'
                                    },
                                    {
                                        index: 'markdown',
                                        title: 'markdown编辑器'
                                    },
                                ]
                            },
                            {
                                index: 'upload',
                                title: '文件上传'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-emoji',
                        index: 'icon',
                        title: '自定义图标'
                    },
                    {
                        icon: 'el-icon-lx-favor',
                        index: 'charts',
                        title: 'schart图表'
                    },
                    {
                        icon: 'el-icon-rank',
                        index: 'drag',
                        title: '拖拽列表'
                    },
                    {
                        icon: 'el-icon-lx-warn',
                        index: '6',
                        title: '错误处理',
                        subs: [
                            {
                                index: 'permission',
                                title: '权限测试'
                            },
                            {
                                index: '404',
                                title: '404页面'
                            }
                        ]
                    }*/
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        },
        methods:{

        },
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
