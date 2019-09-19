import {http} from "../utils/utils";

export default {
    create({ param, success, fail }) {
        return http.post({
            url: '/api/publicity/create',
            param: param,
            success: success,
            fail: fail
        });
    },
    edit({ param, success, fail }) {
        return http.post({
            url: '/api/publicity/edit',
            param: param,
            success: success,
            fail: fail
        });
    },
    publicityList({ param, success, fail }) {
        return http.get({
            url: 'api/publicity/list',
            param: param,
            success: success,
            fail: fail
        });
    },
    addPublicityHouse({ param, success, fail }) {
        return http.post({
            url: 'api/publicity/addHouse',
            param: param,
            success: success,
            fail: fail
        });
    },
    delPublicityHouse({ param, success, fail }) {
        return http.post({
            url: 'api/publicity/delHouse',
            param: param,
            success: success,
            fail: fail
        });
    },
    publicityHouseList({ param, success, fail }) {
        return http.get({
            url: 'api/publicity/house/list',
            param: param,
            success: success,
            fail: fail
        });
    },
    detail({ param, success, fail }) {
        return http.get({
            url: 'api/publicity/detail',
            param: param,
            success: success,
            fail: fail
        });
    },
    createQrCode({ param, success, fail }) {
        return http.post({
            url: '/api/publicity/qrcode/create',
            param: param,
            success: success,
            fail: fail
        });
    },
}
