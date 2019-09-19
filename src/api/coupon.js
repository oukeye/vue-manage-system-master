import {http, xdebug} from "../utils/utils";

export default {
    create({ param, success, fail }) {
        return http.post({
            url: '/api/coupon/create',
            param: param,
            success: success,
            fail: fail
        });
    },
    edit({ param, success, fail }) {
        return http.post({
            url: '/api/coupon/edit',
            param: param,
            success: success,
            fail: fail
        });
    },
    detail({ param, success, fail }) {
        return http.get({
            url: '/api/coupon/detail',
            param: param,
            success: success,
            fail: fail
        });
    },

    list({ param, success, fail }) {
        return http.get({
            url: 'api/coupon/list',
            param: param,
            success: success,
            fail: fail
        });
    },
}
