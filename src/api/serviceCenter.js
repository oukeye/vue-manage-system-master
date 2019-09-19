import {http, xdebug} from "../utils/utils";

export default {
    create({ param, success, fail }) {
        return http.post({
            url: '/api/service_center/create',
            param: param,
            success: success,
            fail: fail
        });
    },
    edit({ param, success, fail }) {
        return http.post({
            url: '/api/service_center/edit',
            param: param,
            success: success,
            fail: fail
        });
    },
    detail({ param, success, fail }) {
        return http.get({
            url: '/api/service_center/detail',
            param: param,
            success: success,
            fail: fail
        });
    },
    serviceList({ param, success, fail }) {
        return http.get({
            url: '/api/service_center/queryList',
            param: param,
            success: success,
            fail: fail
        });
    },
}
