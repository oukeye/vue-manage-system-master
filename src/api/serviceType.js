import {http, xdebug} from "../utils/utils";

export default {
    create({ param, success, fail }) {
        return http.post({
            url: '/api/service_type/create',
            param: param,
            success: success,
            fail: fail
        });
    },
    edit({ param, success, fail }) {
        return http.post({
            url: '/api/service_type/edit',
            param: param,
            success: success,
            fail: fail
        });
    },
    detail({ param, success, fail }) {
        return http.get({
            url: '/api/service_type/detail',
            param: param,
            success: success,
            fail: fail
        });
    },
    queryList({ param, success, fail }) {
        return http.get({
            url: '/api/service_type/queryList',
            param: param,
            success: success,
            fail: fail
        });
    },
}
