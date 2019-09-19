import {http, xdebug} from "../utils/utils";

export default {
    create({ param, success, fail }) {
        return http.post({
            url: '/api/notice/create',
            param: param,
            success: success,
            fail: fail
        });
    },
    edit({ param, success, fail }) {
        return http.post({
            url: '/api/notice/edit',
            param: param,
            success: success,
            fail: fail
        });
    },
    detail({ param, success, fail }) {
        return http.get({
            url: '/api/notice/detail',
            param: param,
            success: success,
            fail: fail
        });
    },

    queryList({ param, success, fail }) {
        return http.get({
            url: 'api/notice/queryList',
            param: param,
            success: success,
            fail: fail
        });
    },
}
