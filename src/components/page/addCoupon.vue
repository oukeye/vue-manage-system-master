<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 优惠券管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加优惠券</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <edit-coupon  ref="addCoupon"></edit-coupon>

        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import editCoupon from '@/components/component/editCoupon.vue'
    let vm = null;
    export default {
        name: 'editCoupon',
        props:{

        },
        data: function () {
            return {
                couponId: 0,
            }
        },
        components: {
            'edit-coupon':editCoupon,
        },
        created(){
            vm = this;
            this.getQueryId();
        },

        activated(){
            this.getQueryId();
        },
        methods: {
            getQueryId(){
                var id = this.$route.query.id;
                if (id) {
                    this.couponId = id;
                }
            },
        }
    }
</script>

<style lang="less" scoped>

</style>