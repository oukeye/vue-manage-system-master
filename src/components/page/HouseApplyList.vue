<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 房东房源申请</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
         <!--   <div class="handle-box">
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>-->
            <el-table :data="tableData" border class="table"
                      ref="multipleTable"
            >
                <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <el-table-column prop="id" label="id" sortable width="150">
                </el-table-column>
<!--                <el-table-column prop="picUrl" label="首图" width="150">
                    <template slot-scope="scope">
                        <img :src="scope.row.picUrl" class="picImg">
                    </template>
                </el-table-column>-->
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="tel" label="电话">
                </el-table-column>
                <el-table-column prop="status" label="状态">
                </el-table-column>
                <el-table-column prop="create_time" label="创建时间">
                </el-table-column>

                <!--<el-table-column label="操作" width="180" align="center">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑-->
                        <!--</el-button>-->
                    <!--</template>-->
                <!--</el-table-column>-->
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
    import houseApi from '../../api/house';
    export default {
        name: 'basetable',
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                page: 1,
                pageSize: 10,
                total: 0,
                select_word: '',
                is_search: false,
            }
        },
        created() {
            this.getData();
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
                houseApi.applyList({
                    param: param,
                    success: function (res) {
                        console.log(res)

                        if (res.code === 0) {
                            _this.tableData = res.data.list;
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
                console.log(index, row)
                this.$router.push({ path: `/editHouse/${row.id}` }); // -> /editHouse/123
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
