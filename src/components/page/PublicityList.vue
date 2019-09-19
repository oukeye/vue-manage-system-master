<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 房东宣传页列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
        <!--    <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="handleAddLandlordUser">添加房东</el-button>
            </div>-->
            <el-table
                    :data="tableData"
                    v-loading='loading'
                    border
                    class="table"
                    ref="multipleTable"
            >

                <el-table-column prop="id" label="id" sortable width="150">
                </el-table-column>
                <el-table-column prop="name" label="名称" width="120">
                </el-table-column>
                <el-table-column prop="tel" label="手机号" width="120">
                </el-table-column>

                <el-table-column prop="introduce" label="介绍" >
                </el-table-column>
                <el-table-column prop="introduce" label="二维码" >

                    <template slot-scope="scope">
                        <img :src="scope.row.qr_code_url" class="qrcode">
                        <el-button type="text" icon="el-icon-edit" @click="createQrCode(scope.row)">生成
                        </el-button>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                       <!-- <el-button type="text" icon="el-icon-delete" class="red"
                                   @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>-->
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"
                               :total="total">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import publicityApi from '../../api/publicity';
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
                loading:false,
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
                _this.loading = true;
                publicityApi.publicityList({
                    param: param,
                    success: function (res) {
                        console.log(res);
                        _this.loading = false;
                        if (res.code === 0) {
                            _this.tableData = res.data.data;
                            _this.total = res.data.total;
                        }
                    },
                    fail: function () {
                        _this.loading = false;
                    },
                });
            },
            handleEdit(index, row) {
                this.$router.push({ path: '/editPublicity', query: { id: row.id } });
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            },

            createQrCode(row){
                var _this = this;
                var param = {
                    id: row.id,
                };
                _this.loading = true;
                publicityApi.createQrCode({
                    param: param,
                    success: function (res) {
                        console.log(res);
                        _this.loading = false;
                        if (res.code === 0) {
                            _this.getData();
                        }
                    },
                    fail: function () {
                        _this.loading = false;
                    },
                });
            }
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

    .qrcode{
        width:80px
    }



</style>
