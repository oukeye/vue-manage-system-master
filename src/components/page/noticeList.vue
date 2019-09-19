<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 公告列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="handleAddLandlordUser">添加公告
                </el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">

                <el-table-column prop="id" label="id" sortable width="150">
                </el-table-column>
                <el-table-column prop="title" label="标题">
                </el-table-column>
                <el-table-column prop="start_time" label="时间" width="180">
                </el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑
                        </el-button>
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
                <el-form-item label="标题">
                    <el-input v-model="editForm.title"></el-input>
                </el-form-item>
                <el-form-item label="时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="editForm.start_time"
                                    value-format="yyyy-M-d HH:mm:ss " style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="内容">
                    <quill-editor ref="myTextEditor" v-model="editForm.content" :options="editorOption"></quill-editor>
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
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import noticeApi from '../../api/notice';
    import {quillEditor} from 'vue-quill-editor';

    let editForm = {
        title: '',
        start_time: '',
        content: '',
    };
    export default {
        name: 'noticeList',
        components: {
            quillEditor
        },
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
                noticeApi.queryList({
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

            handleAddLandlordUser(index, row) {
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
                this.editForm = Object.assign({}, row);
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
                noticeApi.create({
                    param: this.editForm,
                    success: function (res) {

                        if (res.code === 0) {
                            _this.$message.success(res.msg);
                            _this.editVisible = false;
                            _this.initEditForm();
                            _this.getData();
                        } else {
                            _this.$message.error(res.msg)
                        }
                    },
                    fail: function (res) {
                        console.log(res)
                    },
                });
            },
            editNotice(){
                let _this = this;
                noticeApi.edit({
                    param: this.editForm,
                    success: function (res) {

                        if (res.code === 0) {
                            _this.$message.success(res.msg);
                            _this.editVisible = false;
                            _this.initEditForm();
                            _this.getData();
                        }else{
                            _this.$message.error(res.msg);
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
