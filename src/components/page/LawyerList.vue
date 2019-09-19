<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 律师管理</el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>律师列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="data" border class="table"
                      ref="multipleTable"
            >
                <el-table-column prop="id" label="id" sortable width="55">
                </el-table-column>
                <el-table-column prop="name" label="名称" >
                </el-table-column>

                <el-table-column prop="tel" label="手机号" width="120">
                </el-table-column>
                <el-table-column prop="profiles" label="简介" >
                </el-table-column>

                <el-table-column label="操作" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background
                               @current-change="handleCurrentChange"
                               layout="prev, pager, next"
                               :total="total">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import lawyerApi from '../../api/lawyer';
    export default {
        name: 'LawyerList',
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                page: 1,
                pageSize: 10,
                total: 0,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData;
            }
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
                lawyerApi.list({
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
            search() {
                this.is_search = true;
            },
            handleEdit(index, row) {
                this.$router.push({ path: '/editLawyer', query: { id: row.id } });
            },

        }
    }

</script>

<style lang="less" scoped>
    /deep/ .picImg {
        width: 100px;

    }

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


</style>
