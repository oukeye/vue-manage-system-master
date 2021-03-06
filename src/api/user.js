import {http, xdebug} from "../utils/utils";

export default {
    login({ param, success, fail }) {
        return http.post({
            url: '/api/user/login',
            param: param,
            success: success,
            fail: fail
        });
    },

    userList({ param, success, fail }) {
        return http.get({
            url: '/api/user/list',
            param: param,
            success: success,
            fail: fail
        });
    },
}
