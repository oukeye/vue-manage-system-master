<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 房东宣传页管理</el-breadcrumb-item>
                <el-breadcrumb-item>编辑宣传页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <edit-publicity :pid="pid" ref="editPublicity"></edit-publicity>
        </div>


    </div>
</template>

<script type="text/ecmascript-6">
    import EditPublicity from '../../components/component/editPublicity.vue'
    let vm = null;
    export default {
        name: 'EditPublicity',
        data: function () {
            return {
                pid: 0
            }
        },
        components: {
            'edit-publicity': EditPublicity
        },
        created(){
            vm = this;
            this.getQueryId();
        },
        activated(){
            this.getQueryId();
            if( this.$refs.editPublicity){
                this.$refs.editPublicity.getDetail(this.pid);
            }
        },
        methods: {
            getQueryId(){
                var id = this.$route.query.id;
                if (id) {
                    this.pid = id;
                }
                console.log('getQueryId',this.pid)
            },
        }
    }
</script>

<style lang="less" scoped>

    /deep/ .avatar-uploader {
        .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            width: 178px;
            height: 178px;
            &:hover {
                border-color: #409EFF;
            }
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }

    /deep/ .banner-uploader {
        width: 375px;
        height: 313px;
        .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            width: 375px;
            height: 313px;
            &:hover {
                border-color: #409EFF;
            }
        }
        .banner-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 313px;
            text-align: center;
        }
        .banner {
            width: 375px;
            height: 313px;
            display: block;
        }
    }
</style>