<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 房源管理</el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>房源列表</el-breadcrumb-item>
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
                <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <el-table-column prop="id" label="id" sortable width="150">
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
                <el-table-column prop="rooms" label="厅" width="120">
                </el-table-column>
                <el-table-column prop="toilet" label="卫" width="120">
                </el-table-column>
                <el-table-column prop="house_floor" label="楼" width="120">
                </el-table-column>
                <el-table-column prop="building_floor" label="层" width="120">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        <span>{{getStatusName(scope.row.status)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-edit" @click="changeStatus(scope.row)"
                                  >{{scope.row.status==1?'下架':'上架'}}
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
            getStatusName(val){
                switch (val) {
                    case 0:
                        return '已下架';
                        break;
                    case 1:
                        return '已上架';
                        break;
                    default:
                        return '';
                        break
                }
            },
            getData() {
                var _this = this;
                let data = {};

                if (this.select_word) {
                    data['tel'] = this.select_word;
                }
                var param = {
                    page: this.page,
                    pageSize: this.pageSize,
                    data: data,
                };
                houseApi.houseList({
                    param: param,
                    success: function (res) {
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

                this.page = 1;
                this.getData();
            },
            handleEdit(index, row) {
                this.$router.push({ path: '/editHouse', query: { id: row.id } });
            },
            changeStatus(house){
                var param = {
                    id: house.id,
                    status: house.status == 1 ? 0 : 1
                };
                let _this = this;
                let message=param.status==1?'上架':'下架';
                houseApi.changeStatus({
                    param: param,
                    success: function (res) {
                        if (res.code === 0) {
                            _this.$message.success(`${message}成功`);
                            _this.getData();
                        }
                    },
                    fail: function () {
                    },
                });
            }

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
