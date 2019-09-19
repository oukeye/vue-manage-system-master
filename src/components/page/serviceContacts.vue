<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 服务人列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="handleAdd">添加服务人
                </el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">

                <el-table-column prop="id" label="id" sortable width="150">
                </el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="introduction" label="简介"></el-table-column>
                <el-table-column prop="tel" label="手机号"></el-table-column>
                <el-table-column prop="price" label="价格说明"></el-table-column>
                <el-table-column prop="status" label="状态" width="180">
                    <template slot-scope="scope">
                        <span>{{scope.row.status==0?'正常':'停用'}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"
                               :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="editStatusName" :visible.sync="editVisible" width="30%">
            <el-form ref="editForm" :model="editForm" label-width="100px">
                <el-form-item label="头像">
                    <el-upload
                            class="album-uploader"
                            action="/api/prod/uploadAlbum"
                            :show-file-list="false"
                            :on-success="handleAlbumSuccess"
                    >
                        <img v-if="editForm.albumUrl" :src="editForm.albumUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input v-model="editForm.introduction"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="editForm.tel"></el-input>
                </el-form-item>
                <el-form-item label="价格说明">
                    <el-input v-model="editForm.price"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch
                            v-model="editForm.status"
                            active-value="0"
                            inactive-value="1"></el-switch>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script type="text/ecmascript-6">

    import serviceContactsApi from '../../api/serviceContacts';
    let vm;
    let editForm = {
        type_id: '',
        album: '',
        albumUrl: '',
        name: '',
        introduction: '',
        tel: '',
        price: '',
    };
    export default {
        name: 'serviceContactsList',

        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                page: 1,
                pageSize: 10,
                total: 0,
                editVisible: false,
                editStatus: 'add',
                editForm: Object.assign({}, editForm),
                type_id:''
            }
        },
        created() {
            vm = this;
            this.getQueryId();
            this.getData();
        },
        activated(){
            this.getQueryId();
            this.getData();
        },
        computed: {
            editStatusName(){
                return this.editStatus === 'add' ? '添加' : '编辑'
            },
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.page = val;
                this.getData();
            },
            getData() {
                var _this = this;
                var param = {
                    type_id: this.type_id,
                    page: this.page,
                    pageSize: this.pageSize,
                    data: [],
                };
                serviceContactsApi.queryListByTypeId({
                    param: param,
                    success: function (res) {
                        if (res.code === 0) {
                            _this.tableData = res.data.data;
                            _this.total = res.data.total;
                        }
                    },
                    fail: function () {
                    },
                });
            },
            handleAdd(index, row) {
                this.editVisible = true;
                this.editStatus = 'add';
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            },
            handleEdit(row){
                this.editVisible = true;
                this.editStatus = 'edit';
                row.status = row.status + '';
                this.editForm = Object.assign({}, row);
            },
            handleSubmit(){
                if (this.editStatus === 'add') {
                    this.createServiceContacts();
                } else {
                    this.editServiceContacts();
                }
            },
            initEditForm(){
                this.editForm = Object.assign({}, editForm);
            },
            createServiceContacts(){
                let _this = this;
                this.editForm.type_id = this.type_id;
                serviceContactsApi.create({
                    param: this.editForm,
                    success: function (res) {

                        if (res.code === 0) {
                            _this.$message.success(res.msg);
                            _this.editVisible = false;
                            _this.initEditForm();
                            _this.getData();
                        } else {
                            _this.$message.error(res.msg);
                        }
                    },
                    fail: function (res) {
                        console.log(res)
                    },
                });
            },
            editServiceContacts(){
                let _this = this;
                serviceContactsApi.edit({
                    param: this.editForm,
                    success: function (res) {
                        _this.$message.success(res.msg);
                        if (res.code === 0) {
                            _this.editVisible = false;
                            _this.initEditForm();
                            _this.getData();
                        }
                    },
                    fail: function (res) {
                        console.log(res)
                    },
                });
            },
            getQueryId(){
                var id = this.$route.query.id;
                if (id) {
                    this.type_id = id;
                }
            },
            handleAlbumSuccess(res, file) {
                console.log(res, file);
                if (res.code === 0) {
                    var data = res.data;
                    vm.editForm.albumUrl = data.url;
                    vm.editForm.album = data.url_tmp;
                } else {
                    vm.$message.error(res.msg);
                }
            },
        }
    }

</script>

<style lang="less" scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .del-dialog-cnt {
        font-size: 16px;
        text-align: center
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .album {
        width: 50px;
        height: 50px;

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
            width: 50px;
            height: 50px;
            &:hover {
                border-color: #409EFF;
            }
        }
        .avatar-uploader-icon {
            font-size: 18px;
            color: #8c939d;
            width: 50px;
            height: 50px;
            line-height: 50px;
            text-align: center;
        }
        .avatar {
            width: 50px;
            height: 50px;
            display: block;
        }
    }


</style>
