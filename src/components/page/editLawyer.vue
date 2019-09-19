<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 律师管理</el-breadcrumb-item>
                <el-breadcrumb-item>编辑律师</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <edit-lawyer :pid="lawyerId" ref="editLawyer"></edit-lawyer>

        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import editLawyer from '@/components/component/editLawyer.vue'
    let vm = null;
    export default {
        name: 'editLawyer',
        props:{

        },
        data: function () {
            return {
                lawyerId: 1,
            }
        },
        components: {
            'edit-lawyer':editLawyer,
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
                    this.lawyerId = id;
                }
            },
        }
    }
</script>

<style lang="less" scoped>

</style>
