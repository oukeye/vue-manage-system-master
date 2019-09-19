<template>
    <el-dialog :title="title" width="30%" :visible.sync="visible" >
        <el-form :model="form"
                 label-width="80px"
                 v-loading="loading"
                 :rules="rules"
                 ref="ruleForm">
            <el-form-item label="服务名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="权重" prop="weight">
                <el-input v-model="form.weight"></el-input>
            </el-form-item>
            <el-form-item label="图标" prop="album">
                <el-upload
                        class="album-uploader"
                        action="/api/prod/uploadAlbum"
                        :show-file-list="false"
                        :on-success="handleAlbumSuccess"
                >
                    <img v-if="form.albumUrl" :src="form.albumUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="链接" prop="link">
                <el-input v-model="form.link"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="link">
                <el-switch
                        v-model="form.status"
                        active-value="0"
                        inactive-value="1">
                </el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleOnSubmit">提交</el-button>
                <el-button @click="handleCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script type="text/ecmascript-6">
    import serviceBannerApi from '../../api/serviceBanner';
    import bus from '../common/bus';

    import {isPoneAvailable} from '../../utils/utils';
    let vm = null;

    let form = {
        name: '',
        weight: '',
        link: '',
        album: '',
        albumUrl: '',
        status: '0'
    };
    export default {
        props: {
            title: {
                type: [String],
                default: ''
            },
        },
        data: function () {
            var validateTel = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else if (!isPoneAvailable(value)) {
                    callback(new Error('手机号码格式不正确'));
                } else {
                    callback();
                }
            };
            return {
                rules: {
                    name: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' }
                    ],
                    album: [
                        { required: true, message: '请上传轮播图', trigger: 'blur' }
                    ],
                    link: [
                        { required: true, message: '请输入链接地址', trigger: 'blur' }
                    ]
                },
                form: Object.assign({}, form),
                visible:false,
                loading:true,
                pid:0
            }
        },
        components: {},
        created(){
            vm = this;

        },
        computed:{

        },
        methods: {
            show(pid){
                this.pid = pid || 0;
                this.initForm();
                this.visible = true;
                if(pid){
                    this.getDetail(pid);
                }else{
                    this.initForm();
                    this.loading = false;
                }
            },
            hide(){
                this.initForm();
                this.visible = false;
            },
            initForm(){
                this.form = Object.assign({}, form);
            },
            showLoading(){
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });

                return loading;
            },
            handleOnSubmit(){
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        vm.onSubmit();
                    } else {
                        return false;
                    }
                });
            },
            handleCancel(){
               this.hide();
            },
            onSubmit() {
                if (this.pid) {
                    this.edit();
                } else {
                    this.create();
                }

            },
            create(){
                serviceBannerApi.create({
                    param: this.form,
                    success: function (res) {
                        console.log(res);
                        if (res.code === 0) {
                            vm.$message.success('保存成功');
                            vm.$emit('success');
                            vm.initForm();
                        } else {
                            vm.$message.error(res.msg);
                        }
                    },
                    fail: function (res) {
                        console.log(res)
                    },
                });
            },
            edit(){
                serviceBannerApi.edit({
                    param: this.form,
                    success: function (res) {
                        console.log(res);
                        if (res.code === 0) {
                            vm.$message.success('保存成功');
                            vm.initForm();
                            vm.$emit('success');
                        } else {
                            vm.$message.error(res.msg);
                        }
                    },
                    fail: function (res) {
                        console.log(res)
                    },
                });
            },
            getDetail(pid){

                if (!pid) {
                    return;
                }
                var param = {
                    id: pid
                };
               this.loading = true;
                serviceBannerApi.detail({
                    param: param,
                    success: function (res) {
                        vm.loading = false;
                        if (res.code === 0) {

                            vm.form = res.data;
                            vm.form.status = vm.form.status + '';
                            vm.initAlbumArray();
                        } else {
                            vm.$message.error(res.msg);
                        }
                    },
                    fail: function (res) {
                        console.log(res)
                        vm.loading = false;
                    },
                });
            },
            handleAlbumSuccess(res, file) {
                console.log(res, file);
                if (res.code === 0) {
                    var data = res.data;
                    vm.form.album = data.url_tmp;
                    vm.form.albumUrl = data.url;
                } else {
                    vm.$message.error(res.msg);
                }
            },
            handleDescpSuccess(res, file) {
                console.log(res, file);
                if (res.code === 0) {
                    var data = res.data;
                    vm.form.descp[data.arrIndex].url = data.url;
                    vm.form.descp[data.arrIndex].url_tmp = data.url_tmp;
                    vm.handleEmptyDescp();
                } else {
                    vm.$message.error(res.msg);
                }
            },
            handleAlbumRemove(index){
                vm.form.album.splice(index, 1, { url: '', url_tmp: '' });

            },

            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            initAlbumArray(){
                let len = vm.form.album.length;

                if (len < 5) {
                    let _arr = [];
                    let addLen = 5 - len;
                    for (let i = 0; i < addLen; i++) {
                        _arr.push({ url: '', url_tmp: '' });
                    }
                    console.log(_arr);
                    vm.form.album = vm.form.album.concat(_arr);
                    console.log(vm.form.album);
                }
            },
        }
    }
</script>

<style lang="less" scoped>


    .toolBar {
        margin-bottom: 10px;
    }

    /deep/ .album-uploader {
        .el-upload {
            background-color: #fbfdff;
            border: 1px dashed #c0ccda;
            border-radius: 6px;
            box-sizing: border-box;
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

    /deep/ .descp-uploader {

        .el-upload {
            background-color: #fbfdff;
            border: 1px dashed #c0ccda;
            border-radius: 6px;
            box-sizing: border-box;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            width: 300px;
            height: 300px;
            &:hover {
                border-color: #409EFF;
            }
        }

        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 300px;
            text-align: center;
        }

        .avatar {
            width: 300px;
            display: block;
        }
    }

    .drag-descp-list {
        position: relative;
        .remove-icon {
            font-size: 28px;
            color: #8c939d;
            width: 50px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            cursor: pointer;
            position: absolute;
            left: 10px;
            top: 10px;
            z-index: 1;;
            &:hover {
                color: #f56c6c;
            }
        }
    }

    .drag-list {
        display: inline-block;
        vertical-align: middle;
        /*border: 1px #e1e4e8 solid;*/
        padding: 10px;
        /*margin: 5px 0 10px;*/
        list-style: none;
        background-color: #fff;
        border-radius: 6px;
        cursor: pointer;
        -webkit-transition: border .3s ease-in;
        transition: border .3s ease-in;
        width: 200px;
        text-align: center;
    }

    .drag-list:hover {
        /*border: 1px solid #20a0ff;*/
    }

    .drag-title {
        font-weight: 400;
        line-height: 25px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }

    .ghost-style {
        display: inline-block;
        color: transparent;
        border-style: dashed
    }

</style>