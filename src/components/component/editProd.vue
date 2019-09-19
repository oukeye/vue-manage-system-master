<template>
    <div class="form-box">
        <el-form :model="form" label-width="80px" :rules="rules" ref="ruleForm">
            <el-form-item label="店铺ID" prop="shopId">
                <el-input v-model="form.shop_id"></el-input>
            </el-form-item>
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="销售价格" prop="price">
                <el-input v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item label="市场价" prop="refer_price">
                <el-input v-model="form.refer_price"></el-input>
            </el-form-item>

            <el-form-item label="轮播首图" prop="album">
                <draggable v-model="form.album"  :options="dragOptions">
                    <transition-group tag="div" id="doing" class="item-ul">
                        <div v-for="(item,index) in form.album" class="drag-list" :key="index">
                            <el-upload
                                    class="album-uploader"
                                    action="/api/prod/uploadAlbum"
                                    :data="{arrIndex:index}"
                                    :show-file-list="false"
                                    :on-success="handleAlbumSuccess"
                                    >
                                <img v-if="item.url" :src="item.url" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </transition-group>
                </draggable>

            </el-form-item>
            <el-form-item label="描述图片" prop="album">
                <draggable v-model="form.descp"  :options="dragOptions">
                    <transition-group tag="div" id="descp">
                        <div v-for="(item,index) in form.descp" class="drag-descp-list" :key="index">
                            <el-upload
                                    class="descp-uploader"
                                    action="/api/prod/uploadAlbum"
                                    :data="{arrIndex:index}"
                                    :show-file-list="false"
                                    :on-success="handleDescpSuccess"
                                    >
                                <img v-if="item.url" :src="item.url" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <i v-if="item.url" class="el-icon-lx-delete remove-icon" @click="handleDescpRemove(index)"></i>

                        </div>
                    </transition-group>
                </draggable>

            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleOnSubmit">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script type="text/ecmascript-6">
    import publicityApi from '../../api/publicity';
    import prodApi from '../../api/prod';
    import draggable from 'vuedraggable'
    import bus from '../common/bus';

    import {isPoneAvailable} from '../../utils/utils';
    let vm = null;
    export default {
        props: {
            pid: 0,
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
                    price: [
                        { required: true, message: '请输入销售价', trigger: 'blur' }
                    ],
                    refer_price: [
                        { required: true, message: '请输入市场价', trigger: 'blur' }
                    ],
                    album: [
                        { required: true, message: '请上传轮播图', trigger: 'blur' }
                    ],
                    banner_url: [
                        { required: true, message: '请上传背景图', trigger: 'blur' }
                    ]
                },
                form: {
                    name: '',
                    price: '',
                    refer_price: '',
                    album: [
                        {url:'',url_tmp:''},
                        {url:'',url_tmp:''},
                        {url:'',url_tmp:''},
                        {url:'',url_tmp:''},
                        {url:'',url_tmp:''},
                        ],
                    descp: [ {url:'',url_tmp:''}],
                },
                dragOptions:{
                    animation: 120,
                    scroll: true,
                    group: 'sortlist',
                    ghostClass: 'ghost-style'
                },

                imageUrl: '',
                bannerUrl: '',
                dialogTableVisible: false,
                publicityHouseData: [],
                houseData: [],
                publicityHouseFrom: {
                    total: 1,
                    page: 1,
                    pageSize: 10,
                    tel: 0,
                    loading: false,
                    list: []
                },
                houseFrom: {
                    total: 1,
                    page: 1,
                    pageSize: 10,
                    tel: 0,
                    list: [],
                    loading: false
                },
                multipleSelection: [],
            }
        },
        components:{
            draggable
        },
        created(){
            vm = this;
            this.getDetail(this.pid);
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
                if (this.pid) {
                    this.edit();
                } else {
                    this.create();
                }

            },
            create(){
                prodApi.create({
                    param: this.form,
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
                prodApi.edit({
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

                if(!pid){
                    return;
                }
                var param = {
                    id: pid
                };
                let loading = this.showLoading();
                prodApi.detail({
                    param: param,
                    success: function (res) {
                        loading.close();
                        if (res.code === 0) {
                            vm.form = res.data;
                            vm.initDespArray();
                            vm.handleEmptyDescp();
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
            handleAlbumSuccess(res, file) {
                console.log(res, file);
                if (res.code === 0) {
                    var data = res.data;
                    vm.form.album[data.arrIndex].url = data.url;
                    vm.form.album[data.arrIndex].url_tmp = data.url_tmp;
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
            handleDescpRemove(index){
                vm.form.descp.splice(index,1);
                this.handleEmptyDescp();
            },
            handleEmptyDescp(){
               let hasEmptyItem =  vm.form.descp.some(function(item){
                    return !item.url ;
                });
               console.log('hasEmptyItem',hasEmptyItem);
               if(!hasEmptyItem){
                   vm.form.descp.push({url:'',url_tmp:''});
               }

            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            closeCurrTag(){
                bus.$emit('closeTag', this.$route.name);
            },
            initDespArray(){
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
    .drag-descp-list{
        position: relative;
        .remove-icon{
            font-size: 28px;
            color: #8c939d;
            width: 50px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            cursor: pointer;
            position: absolute;
            left:10px;
            top:10px;
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
    .ghost-style{
        display: inline-block;
        color: transparent;
        border-style: dashed
    }

</style>