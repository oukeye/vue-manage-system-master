<template>
    <div class="form-box">
        <el-form :model="form" label-width="80px" :rules="rules" ref="ruleForm">
            <el-form-item label="券名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="使用说明" prop="instructions">
                <el-input v-model="form.instructions"></el-input>
            </el-form-item>
            <el-form-item label="有效日期" prop="validity_time">

                <el-date-picker
                        v-model="form.validity_time"
                        type="datetime"
                        value-format="yyyy-M-d HH:mm:ss "
                        placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-switch
                        active-value="1"
                        inactive-value="0"
                        v-model="form.status"

                       >
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
    import couponApi from '../../api/coupon';
    import draggable from 'vuedraggable'
    import bus from '../common/bus';

    import {isPoneAvailable} from '../../utils/utils';
    import {formatDate} from '../../utils/date';
    let vm = null;
    export default {
        props: {
            couponId: {
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
                rules: {
                    name: [
                        { required: true, message: '请输入券名称', trigger: 'blur' }
                    ],
                    instructions: [
                        { required: true, message: '请输入使用说明', trigger: 'blur' }
                    ],
                    validity_datetime: [
                        { required: true, message: '请输入有效日期', trigger: 'blur' }
                    ]
                },
                form: {
                    name: '',
                    instructions: '',
                    validity_time: '',
                }
            }
        },
        components: {
            draggable
        },
        created(){
            vm = this;
            this.getDetail(this.couponId);
        },
        methods: {
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
            onSubmit() {
                if (this.couponId) {
                    this.edit();
                } else {
                    this.create();
                }

            },
            create(){
                let _param = JSON.parse(JSON.stringify(this.form));


                // _param.validity_time = formatDate(_param.validity_time,'yyyy-M-d hh:mm:ss')

                couponApi.create({
                    param: _param,
                    success: function (res) {
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
                    },
                });
            },
            edit(){
                couponApi.edit({
                    param: this.form,
                    success: function (res) {
                        console.log(res);
                        if (res.code === 0) {
                            vm.$message.success('保存成功');
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
                console.log('getDetail',pid);

                if (!pid) {
                    return;
                }
                var param = {
                    id: pid
                };
                let loading = this.showLoading();
                couponApi.detail({
                    param: param,
                    success: function (res) {
                        loading.close();
                        if (res.code === 0) {
                            vm.form = res.data;
                            if(res.data.validity_time){
                                // vm.form.validity_time = new Date(res.data.validity_time)
                            }
                            console.log(vm.form);

                        } else {
                            vm.$message.error(res.msg);
                        }
                    },
                    fail: function (res) {
                        console.log(res)
                        loading.close();
                    },
                });
            },

            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            closeCurrTag(){
                bus.$emit('closeTag', this.$route.name);
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