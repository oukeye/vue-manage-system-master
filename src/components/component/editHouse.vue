<template>
    <div class="form-box">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="介绍">
                <el-input type="textarea" rows="5" v-model="form.introduce"></el-input>
            </el-form-item>
            <el-form-item label="价格">
                <el-input v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item label="押金">
                <el-col class="line" :span="2">押</el-col>
                <el-col :span="10">
                    <el-input v-model="form.deposit"></el-input>
                </el-col>
                <el-col class="line" :span="2">付</el-col>
                <el-col :span="10">
                    <el-input v-model="form.payment"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="水费">
                <el-input v-model="form.water_price"></el-input>
            </el-form-item>
            <el-form-item label="电费">
                <el-input v-model="form.electricity_price"></el-input>
            </el-form-item>
            <el-form-item label="联系人">
                <el-col class="line" :span="2">姓名</el-col>
                <el-col :span="10">
                    <el-input v-model="form.contacts"></el-input>
                </el-col>
                <el-col class="line" :span="2">电话</el-col>
                <el-col :span="10">
                    <el-input v-model="form.tel"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="地址">
                <el-input type="textarea" rows="5" v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="坐标">
                <el-col class="line" :span="2">经度</el-col>
                <el-col :span="10">
                    <el-input v-model="form.longitude"></el-input>
                </el-col>
                <el-col class="line" :span="2">纬度</el-col>
                <el-col :span="10">
                    <el-input v-model="form.latitude"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="配置">
                <el-checkbox-group v-model="furnitureArray">
                    <el-checkbox border
                                 :label="furniture.id"
                                 v-for="(furniture,index) in form.furnitureLis"
                                 :key="index"
                                 :checked="furniture.isSelect"
                    >{{furniture.name}}
                    </el-checkbox>
                </el-checkbox-group>

            </el-form-item>
            <el-form-item label="户型">
                <el-col class="line" :span="2">室</el-col>
                <el-col :span="6">
                    <el-input v-model="form.rooms"></el-input>
                </el-col>
                <el-col class="line" :span="2">厅</el-col>
                <el-col :span="6">
                    <el-input v-model="form.halls"></el-input>
                </el-col>
                <el-col class="line" :span="2">卫</el-col>
                <el-col :span="6">
                    <el-input v-model="form.toilet"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="房子类型">
                <el-input v-model="form.house_style"></el-input>
            </el-form-item>
            <el-form-item label="面积">
                <el-input v-model="form.acreage"></el-input>
            </el-form-item>
            <el-form-item label="朝向">
                <el-radio-group v-model="form.orientation">
                    <el-radio label="东"></el-radio>
                    <el-radio label="南"></el-radio>
                    <el-radio label="西"></el-radio>
                    <el-radio label="北"></el-radio>
                    <el-radio label="南北"></el-radio>
                    <el-radio label="东西"></el-radio>
                    <el-radio label="东南"></el-radio>
                    <el-radio label="西南"></el-radio>
                    <el-radio label="东北"></el-radio>
                    <el-radio label="西北"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="楼层">
                <el-col :span="10">
                    <el-input v-model="form.house_floor"></el-input>
                </el-col>
                <el-col class="line" :span="2">楼 ，共</el-col>
                <el-col :span="10">
                    <el-input v-model="form.building_floor"></el-input>
                </el-col>
                <el-col class="line" :span="2">层</el-col>
            </el-form-item>
            <el-form-item label="饲养宠物">
                <el-switch
                        v-model="form.pet"
                        :active-value="1"
                        :inactive-value="0">
                </el-switch>
            </el-form-item>
            <el-form-item label="停车位">
                <el-input v-model="form.parking_space"></el-input>
            </el-form-item>

            <el-form-item label="首图">
                <el-upload
                        class="avatar-uploader"
                        action="/api/house/upload"
                        :show-file-list="false"
                        :on-success="handlePicsSuccess"
                        :before-upload="beforePicsUpload">
                    <img v-if="form.picUrl" :src="form.picUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item label="图片模块">
                <div class="toolBar">
                    <el-row>
                        <el-button type="primary" icon="el-icon-plus" @click="addBanner">添加</el-button>
                    </el-row>
                </div>
                <div class="bannerBox" v-for="(banner,index) in form.house_banner">
                    <el-row class="bannerItemToolBar">
                        <el-button type="primary" icon="el-icon-delete" @click="delBanner(index)">删除
                        </el-button>
                    </el-row>
                    <el-row class="bannerItem">
                        <el-col class="line" :span="2">名称</el-col>
                        <el-col :span="10">
                            <el-input v-model="banner.name"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="bannerItem">
                        <el-col class="line" :span="2">权重</el-col>
                        <el-col :span="10">
                            <el-input v-model="banner.weight"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="bannerItem">
                        <el-col class="line" :span="2">全景图</el-col>
                        <el-col :span="20">

                            <el-upload
                                    class="avatar-uploader"
                                    action="/api/house/upload"
                                    :data="{arrIndex:index}"
                                    :show-file-list="false"
                                    :on-success="handlePanoramaSuccess"
                                    :before-upload="beforePanoramaUpload">
                                <img v-if="banner.panoramaUrl" :src="banner.panoramaUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-col>
                    </el-row>
                    <el-row class="bannerItem">
                        <el-col class="line" :span="2">
                            <div class="">轮播图</div>
                            <div class="">
                                <el-button type="primary" icon="el-icon-plus" circle
                                           @click="addBannerItem(index)"></el-button>
                            </div>

                        </el-col>
                        <el-col :span="22">
                            <div class="bannerItemBox" v-for="(item,itemIndex) in banner.items"
                                 :key="itemIndex">
                                <el-upload
                                        class="bannerItem-uploader"
                                        action="/api/house/upload"
                                        :data="{arrIndex:index,itemIndex:itemIndex}"
                                        :show-file-list="false"
                                        :on-success="handleBannerSuccess"
                                        :before-upload="beforeBannerUpload">
                                    <img v-if="item.imgUrl" :src="item.imgUrl" class="bannerItemImg">
                                    <i v-else class="el-icon-plus bannerItem-uploader-icon"></i>
                                </el-upload>
                                <el-row class="itemBar">
                                    <el-col class="line" :span="12">
                                        <el-input v-model="item.weight" class="itemWeight"></el-input>
                                    </el-col>
                                    <el-col class="line" :span="6">
                                        <el-button icon="el-icon-delete" circle
                                                   @click="delBannerItem(index,itemIndex)"></el-button>
                                    </el-col>

                                </el-row>
                            </div>

                        </el-col>
                    </el-row>
                </div>

            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
    import VueCropper  from 'vue-cropperjs';
    import bus from '../common/bus';
    import houseApi from '../../api/house'
    let vm = null;
    export default {
        name: 'baseform',
        props: {
            houseId: 0,
        },
        data: function () {
            return {
                options: [
                    {
                        value: 'guangdong',
                        label: '广东省',
                        children: [
                            {
                                value: 'guangzhou',
                                label: '广州市',
                                children: [
                                    {
                                        value: 'tianhe',
                                        label: '天河区'
                                    },
                                    {
                                        value: 'haizhu',
                                        label: '海珠区'
                                    }
                                ]
                            },
                            {
                                value: 'dongguan',
                                label: '东莞市',
                                children: [
                                    {
                                        value: 'changan',
                                        label: '长安镇'
                                    },
                                    {
                                        value: 'humen',
                                        label: '虎门镇'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: 'hunan',
                        label: '湖南省',
                        children: [
                            {
                                value: 'changsha',
                                label: '长沙市',
                                children: [
                                    {
                                        value: 'yuelu',
                                        label: '岳麓区'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                furnitureArray: [],
                form: {
                    introduce: '',
                    price: '',
                    deposit: '',
                    payment: '',
                    water_price: '',
                    electricity_price: '',
                    contacts: '',
                    tel: '',
                    address: '',
                    longitude: '',
                    latitude: '',
                    house_furniture: [],
                    rooms: '',
                    halls: '',
                    toilet: '',
                    acreage: '',
                    orientation: '',
                    house_floor: '',
                    building_floor: '',
                    pet: 1,
                    parking_space: '',
                    pic_id: 0,
                    picUrl: '',
                    house_banner: [],
                    furnitureLis: []
                },
                imageUrl: '',
                bannerUrl: ''
            }
        },
        components: {
            VueCropper
        },
        created(){
            vm = this;
            // vm.detailForEdit(this.houseId);
        },
        methods: {
            onSubmit() {

                this.form.furniture = this.furnitureArray;
                var param = {
                    house: this.form,
                    houseBanner: this.form.house_banner,
                };

                const loading = this.showLoading();
                if (this.houseId) {
                    houseApi.editHouse({
                        param: param,
                        success: function (res) {
                            loading.close();
                            if (res.code === 0) {
                                vm.$alert('修改成功', '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        vm.closeCurrTag();
                                    }
                                });
                            } else {
                                vm.$message.error(res.msg);
                            }
                        },
                        fail: function (err) {
                            loading.close();
                        }
                    })
                } else {
                    houseApi.createHouse({
                        param: param,
                        success: function (res) {
                            loading.close();
                            if (res.code === 0) {
                                vm.$alert('添加成功', '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        vm.closeCurrTag();
                                    }
                                });
                            } else {
                                vm.$message.error(res.msg);
                            }
                        },
                        fail: function (err) {
                            loading.close();
                        }
                    })
                }
            },
            addBannerItem(index){
                var obj = {
                    imgUrl: '',
                    img_id: '',
                    weight: 0
                };
                this.form.house_banner[index].items.unshift(obj);
            },
            delBannerItem(index, itemIndex){
                this.form.house_banner[index].items.splice(itemIndex, 1);
            },
            addBanner(){
                var obj = {
                    name: '',
                    weight: '',
                    panorama_id: '',
                    panoramaUrl: '',
                    items: []
                };

                this.form.house_banner.unshift(obj);
            },
            delBanner(index){
                this.form.house_banner.splice(index, 1);
            },
            handlePicsSuccess(res, file) {
                if (res.code === 0) {
                    this.$set(vm.form, 'picUrl', res.data.url);
                    this.$set(vm.form, 'pic_id', res.data.id);
                } else {
                    vm.$message.error(res.msg);
                }

            },
            beforePicsUpload(file) {
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
            handlePanoramaSuccess(res, file)  {
                if (res.code === 0) {
                    var data = res.data;
                    vm.form.house_banner[data.arrIndex].panoramaUrl = data.url;
                    vm.form.house_banner[data.arrIndex].panorama_id = data.id;
                } else {
                    vm.$message.error(res.msg);
                }
            },
            beforePanoramaUpload(file) {
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
            handleBannerSuccess(res, file)  {
                if (res.code === 0) {
                    var data = res.data;
                    vm.form.house_banner[data.arrIndex].items[data.itemIndex].imgUrl = data.url;
                    vm.form.house_banner[data.arrIndex].items[data.itemIndex].img_id = data.id;
                    vm.form.house_banner[data.arrIndex].items[data.itemIndex].weight = 0;
                } else {
                    vm.$message.error(res.msg);
                }
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
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            detailForEdit(houseId){
                var param = {
                    id: houseId
                };
                const loading = this.showLoading();
                houseApi.detailForEdit({
                    param: param,
                    success: function (res) {
                        loading.close();
                        if (res.code == 0) {
                            if (res.data.id) {
                                vm.form = res.data;
                            } else {
                                vm.$set(vm.form, 'furnitureLis', res.data.furnitureLis);
                            }
                            vm.form.pet = 1

                        } else {
                            vm.$message.error(res.msg);
                        }

                    },
                    fail: function () {
                        loading.close();
                    }
                })
            },
            closeCurrTag(){
                bus.$emit('closeTag', this.$route.name);
            },
            showLoading(){
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });

                return loading;
            }
        }
    }
</script>

<style lang="less" scoped>
    .form-box {
        width: 850px;;
    }

    .toolBar {
        padding-bottom: 10px;
    }

    .bannerBox {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        padding: 10px;
        margin-bottom: 10px;
        .bannerItem {
            margin-bottom: 10px;
            .bannerItemBox {
                display: inline-block;
                vertical-align: middle;
                margin-right: 10px;
                margin-bottom: 10px;
                .itemWeight {
                    display: inline-block;
                    vertical-align: middle;
                }
                /deep/ .bannerItem-uploader {

                    .bannerItem-uploader-icon {
                        font-size: 28px;
                        color: #8c939d;
                        width: 100%;
                        height: 178px;
                        line-height: 178px;
                        text-align: center;
                    }
                    .bannerItemImg {
                        width: 100%;
                        height: 100%;
                    }
                }
                .bannerItemImg {
                    width: 340px;
                    height: 288px;
                    display: block;
                }
            }

        }
        .bannerItemToolBar {
            text-align: right;
        }
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
</style>