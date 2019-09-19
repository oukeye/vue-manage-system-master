import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/publicityList',
                    name: 'publicityList',
                    component: resolve => require(['../components/page/PublicityList.vue'], resolve),
                    meta: { title: '房东宣传页列表' }
                },
                {
                    path: '/editPublicity',
                    name: 'editPublicity',
                    component: resolve => require(['../components/page/EditPublicity.vue'], resolve),
                    meta: { title: '编辑传页列表' }
                },
                {
                    path: '/addPublicity',
                    name: 'addPublicity',
                    component: resolve => require(['../components/page/AddPublicity.vue'], resolve),
                    meta: { title: '添加宣传页' }
                },
                {
                    path: '/serviceList',
                    name: 'serviceList',
                    component: resolve => require(['../components/page/serviceList.vue'], resolve),
                    meta: { title: '服务列表' }
                },
                {
                    path: '/serviceBannerList',
                    name: 'serviceBannerList',
                    component: resolve => require(['../components/page/serviceBannerList.vue'], resolve),
                    meta: { title: '服务列表' }
                },
                {
                    path: '/editService',
                    name: 'editService',
                    component: resolve => require(['../components/page/editService.vue'], resolve),
                    meta: { title: '编辑服务' }
                },
                {
                    path: '/noticeList',
                    name: 'noticeList',
                    component: resolve => require(['../components/page/noticeList.vue'], resolve),
                    meta: { title: '公告列表' }
                },
                {
                    path: '/serviceTypeList',
                    name: 'serviceTypeList',
                    component: resolve => require(['../components/page/serviceTypeList.vue'], resolve),
                    meta: { title: '服务类型列表' }
                },
                {
                    path: '/serviceContacts',
                    name: 'serviceContacts',
                    component: resolve => require(['../components/page/serviceContacts.vue'], resolve),
                    meta: { title: '服务联系人列表' }
                },
                {
                    path: '/houseList',
                    name: 'houseList',
                    component: resolve => require(['../components/page/HouseList.vue'], resolve),
                    meta: { title: '房源列表' }
                },
                {
                    path: '/editHouse',
                    name: 'editHouse',
                    component: resolve => require(['../components/page/EditHouse.vue'], resolve),
                    meta: { title: '编辑房源' }
                },
                {
                    path: '/addHouse',
                    name: 'addHouse',
                    component: resolve => require(['../components/page/addHouse.vue'], resolve),
                    meta: { title: '添加房源' }
                },
                {
                    path: '/prodList',
                    name: 'prodList',
                    component: resolve => require(['../components/page/ProdList.vue'], resolve),
                    meta: { title: '商品列表' }
                },
                {
                    path: '/addProd',
                    name: 'addProd',
                    component: resolve => require(['../components/page/addProd.vue'], resolve),
                    meta: { title: '添加商品' }
                },
                {
                    path: '/editProd',
                    name: 'editProd',
                    component: resolve => require(['../components/page/editProd.vue'], resolve),
                    meta: { title: '编辑商品' }
                },
                {
                    path: '/editShop',
                    name: 'editShop',
                    component: resolve => require(['../components/page/editShop.vue'], resolve),
                    meta: { title: '编辑店铺' }
                },
                {
                    path: '/addCoupon',
                    name: 'addCoupon',
                    component: resolve => require(['../components/page/addCoupon.vue'], resolve),
                    meta: { title: '添加优惠券' }
                },
                {
                    path: '/editCoupon',
                    name: 'editCoupon',
                    component: resolve => require(['../components/page/editCoupon.vue'], resolve),
                    meta: { title: '编辑优惠券' }
                },
                {
                    path: '/couponList',
                    name: 'couponList',
                    component: resolve => require(['../components/page/couponList.vue'], resolve),
                    meta: { title: '优惠券列表' }
                },
                {
                    path: '/addLawyer',
                    name: 'addLawyer',
                    component: resolve => require(['../components/page/addLawyer.vue'], resolve),
                    meta: { title: '添加律师' }
                },
                {
                    path: '/editLawyer',
                    name: 'editLawyer',
                    component: resolve => require(['../components/page/editLawyer.vue'], resolve),
                    meta: { title: '编辑律师' }
                },
                {
                    path: '/lawyerList',
                    name: 'lawyerList',
                    component: resolve => require(['../components/page/LawyerList.vue'], resolve),
                    meta: { title: '律师列表' }
                },
                {
                    path: '/userList',
                    name: 'userList',
                    component: resolve => require(['../components/page/userList.vue'], resolve),
                    meta: { title: '用户列表' }
                },
                {
                    path: '/houseApplyList',
                    name: 'houseApplyList',
                    component: resolve => require(['../components/page/HouseApplyList.vue'], resolve),
                    meta: { title: '房东房源申请' }
                },
                /*********************以下是demo开始**********************/
                {
                    path: '/icon',
                    name: 'icon',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    name: 'table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    name: 'tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    name: 'form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    name: 'editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    name: 'markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    name: 'upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    name: 'charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    name: 'drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    name: 'permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    name: '404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    name: '403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
