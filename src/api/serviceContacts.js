import {http, xdebug} from "../utils/utils";

export default {
    create({ param, success, fail }) {
        return http.post({
            url: '/api/service_contacts/create',
            param: param,
            success: success,
            fail: fail
        });
    },
    edit({ param, success, fail }) {
        return http.post({
            url: '/api/service_contacts/edit',
            param: param,
            success: success,
            fail: fail
        });
    },
    detail({ param, success, fail }) {
        return http.get({
            url: '/api/service_contacts/detail',
            param: param,
            success: success,
            fail: fail
        });
    },
    queryListByTypeId({ param, success, fail }) {
        return http.get({
            url: '/api/service_contacts/queryListByTypeId',
            param: param,
            success: success,
            fail: fail
        });
    },
}
