<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 服务管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加服务</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <edit-service :pid="serviceId" ref="editService"></edit-service>

        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import editService from '@/components/component/editService.vue'
    let vm = null;
    export default {
        name: 'AddService',
        props:{

        },
        data: function () {
            return {
                serviceId: 0,
            }
        },
        components: {
            editService,
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
                    this.serviceId = id;
                }
            },
        }
    }
</script>

<style lang="less" scoped>

</style>