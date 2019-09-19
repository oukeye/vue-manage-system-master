<template>
    <div class="form-box">
        <el-form :model="form"
                 v-loading="loading"
                 label-width="80px" :rules="rules" ref="ruleForm">
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="tel">
                <el-input v-model="form.tel"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="profiles">
                <el-input v-model="form.profiles"></el-input>
            </el-form-item>

            <el-form-item label="图片">
                <el-upload
                    class="album-uploader"
                    action="/api/house/upload"
                    :show-file-list="false"
                    :data="{arrIndex:0,type:'lawyer'}"
                    :on-success="handlePicsSuccess"
                    :before-upload="beforePicsUpload">
                    <img v-if="form.album[0].url" :src="form.album[0].url" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="状态">
                <el-switch
                    v-model="form.status"
                    :active-value="1"
                    :inactive-value="0"
                    active-text="启用"
                    inactive-text="关闭">
                </el-switch>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleOnSubmit">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script type="text/ecmascript-6">
    import lawyerApi from '../../api/lawyer';
    import draggable from 'vuedraggable'
    import bus from '../common/bus';

    import {isPoneAvailable} from '../../utils/utils';
    let vm = null;
    export default {
        props: {
            pid: {
                default: 0
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
                loading:false,
                rules: {
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ],
                    tel: [
                        { required: true,validator: validateTel, message: '请输入手机号', trigger: 'blur' }
                    ],
                    profiles: [
                        { required: true, message: '请输入简介', trigger: 'blur' }
                    ],
                    album: [
                        { required: true, message: '请上传轮播图', trigger: 'blur' }
                    ]
                },
                form: {
                    name: '',
                    tel: '',
                    profiles: '',
                    status:0,
                    album: [
                        { url: '', url_tmp: '' },
                    ],
                },
                dragOptions: {
                    animation: 120,
                    scroll: true,
                    group: 'sortlist',
                    ghostClass: 'ghost-style'
                },
            }
        },
        components: {
            draggable
        },
        created(){
            vm = this;
            this.getDetail(this.pid);
        },
        methods: {
            showLoading(){
                this.loading = true;
            },
            hideLoading(){
                this.loading=false;
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
            onSubmit() {
                if (this.pid) {
                    this.edit();
                } else {
                    this.create();
                }

            },
            create(){
                vm.showLoading();
                lawyerApi.create({
                    param: this.form,
                    success: function (res) {
                        vm.hideLoading();
                        console.log(res);
                        if (res.code === 0) {
                            vm.$message.success('保存成功');
                            vm.closeCurrTag();
                        } else {
                            vm.$message.error(res.msg);
                        }
                    },
                    fail: function (res) {
                        console.log(res)
                        vm.hideLoading();
                    },
                });
            },
            edit(){
                vm.showLoading();
                lawyerApi.edit({
                    param: this.form,
                    success: function (res) {
                        vm.hideLoading();
                        console.log(res);
                        if (res.code === 0) {
                            vm.$message.success('保存成功');
                        } else {
                            vm.$message.error(res.msg);
                        }
                    },
                    fail: function (res) {
                        console.log(res)
                        vm.hideLoading();
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
                this.showLoading();
                lawyerApi.detail({
                    param: param,
                    success: function (res) {
                        vm.hideLoading();
                        if (res.code === 0) {
                            vm.form = res.data;
                            vm.initAlbumArray();
                        } else {
                            vm.$message.error(res.msg);
                        }
                    },
                    fail: function (res) {
                        console.log(res)
                        vm.hideLoading();
                    },
                });
            },
            handlePicsSuccess(res, file) {
                console.log(res, file);
                if (res.code === 0) {
                    var data = res.data;
                    vm.form.album[data.arrIndex].url = data.url;
                    vm.form.album[data.arrIndex].url_tmp = data.url_tmp;
                } else {
                    vm.$message.error(res.msg);
                }

            },
            beforePicsUpload(file) {
                console.log(file);
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';

                const isImageType = (isJPG || isPNG);
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isImageType) {
                    this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isImageType && isLt2M;
            },

            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            closeCurrTag(){
                bus.$emit('closeTag', this.$route.name);
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
    .form-box {
        width: 100%;
    }

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
