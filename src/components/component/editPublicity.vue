<template>
    <div class="form-box">
        <el-form :model="form" label-width="80px" :rules="rules" ref="ruleForm">
            <el-form-item label="房东姓名" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="房东电话" prop="tel">
                <el-input v-model="form.tel"></el-input>
            </el-form-item>
            <el-form-item label="介绍" prop="introduce">
                <el-input type="textarea" rows="5" v-model="form.introduce"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="avatar_url">
                <el-upload
                        class="avatar-uploader"
                        action="/api/house/upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="form.avatar_url" :src="form.avatar_url" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="海报" prop="banner_url">
                <el-upload
                        class="banner-uploader"
                        action="/api/house/upload"
                        :show-file-list="false"
                        :on-success="handleBannerSuccess"
                        :before-upload="beforeBannerUpload">
                    <img v-if="form.banner_url" :src="form.banner_url" class="banner">
                    <i v-else class="el-icon-plus banner-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="房源列表">
                <div class="toolBar">
                    <el-row>
                        <el-button type="primary" icon="el-icon-plus" @click="showHouseTable">添加</el-button>
                    </el-row>
                </div>
                <el-table :data="publicityHouseFrom.list"
                            v-loading="publicityHouseFrom.loading"
                          border class="table"
                          ref="multipleHouseTable"
                >
                    <el-table-column prop="id" label="房源ID" sortable width="150">
                    </el-table-column>
                    <el-table-column prop="picUrl" label="首图" width="150">
                        <template slot-scope="scope">
                            <img :src="scope.row.picUrl" class="picImg">
                        </template>
                    </el-table-column>
                    <el-table-column prop="contacts" label="联系人" width="120">
                    </el-table-column>
                    <el-table-column prop="tel" label="手机号" width="120">
                    </el-table-column>
                    <el-table-column prop="rooms" label="房" width="120">
                    </el-table-column>
                    <el-table-column prop="halls" label="厅" width="120">
                    </el-table-column>
                    <el-table-column prop="toilet" label="卫" width="120">
                    </el-table-column>
                    <el-table-column prop="house_floor" label="楼" width="120">
                    </el-table-column>
                    <el-table-column prop="building_floor" label="层" width="120">
                    </el-table-column>
                    <el-table-column prop="address" label="地址">
                    </el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-delete"
                                       @click="handlePublicityHouseDel(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination background @current-change="handleCurrentPublicityHouseChange"
                                   layout="prev, pager, next"
                                   :total="publicityHouseFrom.total">
                    </el-pagination>
                </div>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleOnSubmit">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>

        <el-dialog title="房源列表" :visible.sync="dialogTableVisible" width="80%">
            <el-table ref="publicityHouseTable"
                      :data="houseFrom.list"
                      border tooltip-effect="dark"
                      style="width: 100%"
                      v-loading="houseFrom.loading"
                      @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column property="id" label="id" width="100"></el-table-column>
                <el-table-column label="首图" width="150">
                    <template slot-scope="scope">
                        <img :src=" scope.row.picUrl" class="picImg">
                    </template>
                </el-table-column>
                <el-table-column property="rooms" label="房间数量" width="100"></el-table-column>
                <el-table-column property="halls" label="大厅数量" width="100"></el-table-column>
                <el-table-column property="toilet" label="卫生间数量" width="100"></el-table-column>
                <el-table-column property="address" label="地址"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"
                               :total="houseFrom.total">
                </el-pagination>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="addPublicityHouse">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import publicityApi from '../../api/publicity';
    import houseApi from '../../api/house';
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
                        { required: true, message: '请输入房东名称', trigger: 'blur' }
                    ],
                    tel: [
                        { validator: validateTel, message: '请输入手机号', trigger: 'blur' }
                    ],
                    introduce: [
                        { required: true, message: '请输入介绍', trigger: 'blur' }
                    ],
                    avatar_url: [
                        { required: true, message: '请上传头像', trigger: 'blur' }
                    ],
                    banner_url: [
                        { required: true, message: '请上传背景图', trigger: 'blur' }
                    ]
                },
                form: {
                    name: '',
                    tel: '',
                    introduce: '',
                    avatar_id: '',
                    avatar_url: '',
                    banner_id: '',
                    banner_url: '',
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
        components: {},
        created(){
            vm = this;
            this.getDetail(this.pid);
            this.queryPublicityHouseData();
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
                publicityApi.create({
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
            edit(){
                publicityApi.edit({
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
            handleAvatarSuccess(res, file) {
                this.$set(vm.form, 'avatar_url', res.data.url);
                this.$set(vm.form, 'avatar_id', res.data.id);
            },
            beforeAvatarUpload(file) {
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
            handleBannerSuccess(res, file) {
                this.$set(vm.form, 'banner_url', res.data.url);
                this.$set(vm.form, 'banner_id', res.data.id);
            },
            beforeBannerUpload(file) {
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
            getDetail(pid){

                if(!pid){
                    return;
                }
                var param = {
                    id: pid
                };
                let loading = this.showLoading();
                publicityApi.detail({
                    param: param,
                    success: function (res) {
                        loading.close();
                        if (res.code === 0) {
                            vm.form = res.data;
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
            showHouseTable(){
                this.dialogTableVisible = true;
                this.queryHouseList();
            },
            handleCurrentChange(val){
                this.houseFrom.page = val;
                this.queryHouseList();
            },
            queryHouseList(){
                var param = {
                    page: this.houseFrom.page,
                    pageSize: this.houseFrom.pageSize,
                    tel: this.form.tel
                };
                vm.houseFrom.loading = true;
                houseApi.publicityHouseEditList({
                    param: param,
                    success: function (res) {
                        console.log(res);
                        vm.houseFrom.loading = false;
                        vm.houseFrom.list = res.data.list;
                        vm.houseFrom.total = res.data.total;

                        vm.publicityHouseTableInit(vm.houseFrom.list);
                    },
                    fail: function () {
                        vm.$message.warning('网络繁忙,请重试');
                        vm.houseFrom.loading = false;
                    }
                });
            },
            handleCurrentPublicityHouseChange(val){
                this.publicityHouseFrom.page = val;
                this.queryPublicityHouseData();
            },
            queryPublicityHouseData(){

                if(!this.pid){
                    return;
                }

                var param = {
                    page: this.publicityHouseFrom.page,
                    pageSize: this.publicityHouseFrom.pageSize,
                    id: this.pid
                };
                vm.publicityHouseFrom.loading = true;

                publicityApi.publicityHouseList({
                    param: param,
                    success: function (res) {
                        console.log(res);
                        if (res.code === 0) {
                            vm.publicityHouseFrom.loading = false;
                            vm.$set(vm.publicityHouseFrom, 'list', res.data.data);
                            vm.$set(vm.publicityHouseFrom, 'total', res.data.total);
                        } else {
                            vm.$message.error(res.msg);
                        }

                    },
                    fail: function () {
                        vm.$message.warning('网络繁忙,请重试');
                        vm.publicityHouseFrom.loading = false;
                    }
                });
            },
            publicityHouseTableInit(rows){
                vm.$nextTick(() => {
                    rows.forEach(row => {
                        console.log(row.publicity_i);
                        if (row.publicity_id) {
                            vm.$refs.publicityHouseTable.toggleRowSelection(row, true);
                        } else {
                            // vm.$refs.publicityHouseTable.clearSelection(row,false);
                        }
                    });
                });
            },
            handleSelectionChange(val){
                console.log(val);
                vm.multipleSelection = val;
            },
            addPublicityHouse(){
                if (!(vm.multipleSelection && vm.multipleSelection.length > 0)) {
                    vm.dialogTableVisible = false;
                    return;
                }

                let data = vm.multipleSelection.map(function (item) {
                    let _item = {
                        house_id: item.id,
                        publicity_id: vm.pid
                    };
                    return _item;
                });

                let param = {
                    data: data,
                    id: vm.pid,
                };

                publicityApi.addPublicityHouse({
                    param,
                    success(res){
                        if (res.code === 0) {
                            vm.$message.success('添加成功');
                            vm.dialogTableVisible = false;
                            vm.queryPublicityHouseData();
                        } else {
                            vm.$message.error(res.msg);
                        }
                    },
                    fail(){
                        vm.$message.error('网络繁忙,请重试');
                    },
                });
            },
            handlePublicityHouseDel(index, row){
                console.log(index, row.pivot.id);
                let param = {
                    id: row.pivot.id,
                    publicity_id: row.pivot.publicity_id
                };
                publicityApi.delPublicityHouse({
                    param,
                    success(res){
                        if (res.code === 0) {
                            vm.$message.success('删除成功');
                            vm.dialogTableVisible = false;
                            vm.queryPublicityHouseData();
                        } else {
                            vm.$message.error(res.msg);
                        }
                    },
                    fail(){
                        vm.$message.error('网络繁忙,请重试');
                    },
                });
            }
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

    /deep/ .picImg {
        height: 50px;

    }

</style>