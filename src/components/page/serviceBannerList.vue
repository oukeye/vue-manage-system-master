<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 服务列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="handleAddLandlordUser">添加广告
                </el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">

                <el-table-column prop="id" label="id" sortable width="150">
                </el-table-column>
                <el-table-column prop="name" label="名称" width="120">
                </el-table-column>
                <el-table-column prop="album" label="图片" width="220">
                    <template slot-scope="scope">
                        <img :src="scope.row.albumUrl" class="album">
                    </template>
                </el-table-column>

                <el-table-column prop="weight" label="权重" width="120">
                </el-table-column>
                <el-table-column prop="link" label="链接">
                </el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        {{scope.row.status===1?'隐藏':'显示'}}
                    </template>
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
        <edit-service-banner :title="editServiceStatusName"  ref="editServiceBanner" @success="editServiceSuccess"></edit-service-banner>

    </div>
</template>

<script type="text/ecmascript-6">
    import serviceBannerApi from '../../api/serviceBanner';
    import editServiceBanner from '@/components/component/editServiceBanner.vue'

    export default {
        name: 'userList',
        components: {
            editServiceBanner,
        },
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                page: 1,
                pageSize: 10,
                total: 0,
                editServiceVisible: false,
                editServiceStatus: 'add',
            }
        },
        created() {
            this.getData();
        },
        computed: {
            editServiceStatusName(){
                return this.editServiceStatus === 'add' ? '添加' : '编辑';
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
                serviceBannerApi.queryList({
                    param: param,
                    success: function (res) {
                        if (res.code === 0) {
                            _this.tableData = res.data.data;
                            _this.total = res.data.totalPage;
                        }
                    },
                    fail: function () {
                    },
                });
            },
            handleAddLandlordUser(index, row) {
                this.$refs.editServiceBanner.show();
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            },
            handleEdit(row){
                this.$refs.editServiceBanner.show(row.id);
                this.editServiceStatus = 'edit';
            },
            editServiceSuccess(){
                this.$refs.editServiceBanner.hide();
                this.getData();
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
    .album{
        width:50px;
        height:50px;

    }




</style>
