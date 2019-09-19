<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 房东宣传页列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="handleAddLandlordUser">添加房东</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" >

                <el-table-column prop="id" label="id" sortable width="150">
                </el-table-column>
                <el-table-column prop="uname" label="昵称" >
                </el-table-column>
                <el-table-column prop="tel" label="手机号" width="120">
                </el-table-column>

                <el-table-column prop="status" label="身份" width="120">
                </el-table-column>
                <el-table-column prop="create_time" label="时间" sortable width="180">
                </el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        无
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
        <el-dialog title="添加房东" :visible.sync="addVisible" width="30%">
            <el-form ref="addForm" :model="addForm" label-width="50px">
                <el-form-item label="昵称">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="手机">
                    <el-input v-model="addForm.tel"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" >确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script type="text/ecmascript-6">
    import userApi from '../../api/user';
    export default {
        name: 'userList',
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                page: 1,
                pageSize: 10,
                total: 0,
                addVisible: false,
                addForm:{
                    name:'',
                    tel:'',
                    avatar_id:'',
                    avatar_url:''
                }
            }
        },
        created() {
            this.getData();
        },
        computed: {
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
                userApi.userList({
                    param: param,
                    success: function (res) {
                        if (res.code === 0) {
                            _this.tableData = res.data.list;
                            _this.total = res.data.totalPage;
                        }
                    },
                    fail: function () {
                    },
                });
            },

            handleAddLandlordUser(index, row) {
                this.addVisible = true;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            },
            // 确定删除
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



</style>
