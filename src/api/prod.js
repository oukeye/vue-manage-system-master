import {http, xdebug} from "../utils/utils";

export default {
    create({ param, success, fail }) {
        return http.post({
            url: '/api/prod/create',
            param: param,
            success: success,
            fail: fail
        });
    },
    edit({ param, success, fail }) {
        return http.post({
            url: '/api/prod/edit',
            param: param,
            success: success,
            fail: fail
        });
    },
    detail({ param, success, fail }) {
        return http.get({
            url: '/api/prod/detail',
            param: param,
            success: success,
            fail: fail
        });
    },
    list({ param, success, fail }) {
        return http.get({
            url: '/api/prod/list',
            param: param,
            success: success,
            fail: fail
        });
    },
}
