import {http, xdebug} from "../utils/utils";

export default {
    login({ param, success, fail }) {
        return http.post({
            url: '/api/admin/login',
            param: param,
            success: success,
            fail: fail
        });
    },
}
