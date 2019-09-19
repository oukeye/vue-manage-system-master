<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 房东宣传页管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加宣传页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <edit-house ></edit-house>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import editHouse from '@/components/component/editHouse.vue'
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
            'edit-house':editHouse,
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