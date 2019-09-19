import {http, xdebug} from "../utils/utils";

export default {
    create({ param, success, fail }) {
        return http.post({
            url: '/api/lawyer/create',
            param: param,
            success: success,
            fail: fail
        });
    },
    edit({ param, success, fail }) {
        return http.post({
            url: '/api/lawyer/edit',
            param: param,
            success: success,
            fail: fail
        });
    },
    detail({ param, success, fail }) {
        return http.get({
            url: '/api/lawyer/detail',
            param: param,
            success: success,
            fail: fail
        });
    },

    list({ param, success, fail }) {
        return http.get({
            url: 'api/lawyer/list',
            param: param,
            success: success,
            fail: fail
        });
    },
}
