import {http, xdebug} from "../utils/utils";

export default {
    create({ param, success, fail }) {
        return http.post({
            url: '/api/service_banner/create',
            param: param,
            success: success,
            fail: fail
        });
    },
    edit({ param, success, fail }) {
        return http.post({
            url: '/api/service_banner/edit',
            param: param,
            success: success,
            fail: fail
        });
    },
    detail({ param, success, fail }) {
        return http.get({
            url: '/api/service_banner/detail',
            param: param,
            success: success,
            fail: fail
        });
    },
    queryList({ param, success, fail }) {
        return http.get({
            url: '/api/service_banner/queryList',
            param: param,
            success: success,
            fail: fail
        });
    },
}
