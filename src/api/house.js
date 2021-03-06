import {http,xdebug} from "../utils/utils";

export default {
    createHouse({ param, success, fail }) {
        return http.post({
            url: '/api/house/create',
            param: param,
            success: success,
            fail: fail
        });
    },
    editHouse({ param, success, fail }) {
        return http.post({
            url: '/api/house/edit',
            param: param,
            success: success,
            fail: fail
        });
    },
    houseList({ param, success, fail }) {
        return http.post({
            url: '/api/admin/house/list',
            param: param,
            success: success,
            fail: fail
        });
    },
    applyList({ param, success, fail }) {
        return http.get({
            url: '/api/admin/house/apply/list',
            param: param,
            success: success,
            fail: fail
        });
    },
    detailForEdit({ param, success, fail }) {
        return http.post({
            url: '/api/house/detailForEdit',
            param: param,
            success: success,
            fail: fail
        });
    },
    publicityHouseList({ param, success, fail }) {
        return http.post({
            url: '/api/house/publicity/list',
            param: param,
            success: success,
            fail: fail
        });
    },
    publicityHouseEditList({ param, success, fail }) {
        return http.post({
            url: 'api/house/publicity/edit/list',
            param: param,
            success: success,
            fail: fail
        });
    },
    changeStatus({ param, success, fail }) {
        return http.post({
            url: 'api/house/changeStatus',
            param: param,
            success: success,
            fail: fail
        });
    }
}
