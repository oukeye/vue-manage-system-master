<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 服务类型列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="handleAdd">添加类型
                </el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">

                <el-table-column prop="id" label="id" sortable width="150">
                </el-table-column>
                <el-table-column prop="name" label="名称">
                </el-table-column>
                <el-table-column prop="status" label="状态" width="180">
                    <template slot-scope="scope">
                        <span>{{scope.row.status==0?'正常':'停用'}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleEditContacts(scope.row)">编辑联系人</el-button>
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
            <el-form ref="editForm" :model="editForm" label-width="50px">
                <el-form-item label="名称">
                    <el-input v-model="editForm.name"></el-input>
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

    import serviceTypeApi from '../../api/serviceType';

    let editForm = {
        name: '',
        status: '0',
    };
    export default {
        name: 'serviceTypeList',

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
                content: '',
                editorOption: {
                    placeholder: '请输入公告内容'
                }
            }
        },
        created() {
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
                    page: this.page,
                    pageSize: this.pageSize,
                    data: [],
                };
                serviceTypeApi.queryList({
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
            handleEditContacts(row){
                this.$router.push({ path: '/serviceContacts', query: { id: row.id } });
            },
            handleSubmit(){
                if (this.editStatus === 'add') {
                    this.createNotice();
                } else {
                    this.editNotice();
                }
            },
            initEditForm(){
                this.editForm = Object.assign({}, editForm);
            },
            createNotice(){
                let _this = this;
                serviceTypeApi.create({
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
            editNotice(){
                let _this = this;
                serviceTypeApi.edit({
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
        }
    }

</script>

<style scoped>
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
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .album{
        width:50px;
        height:50px;

    }















</style>
