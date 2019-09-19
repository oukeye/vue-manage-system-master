<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加添加</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <edit-prod ></edit-prod>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import editProd from '@/components/component/editProd.vue'
    let vm = null;
    export default {
        name: 'addHouse',
        props:{

        },
        data: function () {
            return {
                houseId: 0,
            }
        },
        components: {
            'edit-prod':editProd,
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
                    this.houseId = id;
                }
            },
        }
    }
</script>

<style lang="less" scoped>

</style>