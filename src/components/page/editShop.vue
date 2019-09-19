<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <edit-shop :pid="shopId" ref="editShop"></edit-shop>

        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import editShop from '@/components/component/editShop.vue'
    let vm = null;
    export default {
        name: 'addHouse',
        props:{

        },
        data: function () {
            return {
                shopId: 1,
            }
        },
        components: {
            'edit-shop':editShop,
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
                    this.shopId = id;
                }
            },
        }
    }
</script>

<style lang="less" scoped>

</style>