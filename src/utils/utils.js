/**
 * Created by Administrator on 2017/6/14.
 */
import axios from "axios";
import router from "../router";
import jwt from "jwt-simple";
import md5 from "md5";

import _isPoneAvailable from './isPoneAvailable';

const CHANNEL = 1;
// const xdebug = '';
const xdebug = '?XDEBUG_SESSION_START=10994';

var login = function () {
    window.localStorage.setItem('token', '');
    router.push('/login');

};

let setDifTime = function (resTime) {
    if (resTime) {
        var nowTime = Math.round(new Date() / 1000);
        difTime = nowTime - parseInt(resTime);
    }
};

let difTime = 0;

axios.interceptors.request.use(function (config) {    // 这里的config包含每次请求的内容
    config.headers.channel = CHANNEL;
    config.headers['content-type'] = 'application/json;charset=utf-8';
    let token = window.localStorage.getItem('token');

    if (token) {
        config.headers.token = token;
    }
    return config
}, function (err) {
    return Promise.reject(err)
});

export const http = {
    post ({ url, param, success, fail }) {
        let params = {};
        if (param) {
            params = {
                ...param
            }
        }
        url = url + xdebug;

        axios.post(url, params)
            .then(function (ret) {
                setDifTime(ret.data.time);
                if (ret.data.code === 10001) {
                    login();
                }
                success && success(ret.data)
            })
            .catch(function (error) {
                console.log(error)
                fail && fail(error);
            })
    },
    get ({ url, param, success, fail }) {
        let params = {};
        if (param && param !== {}) {
            params = {
                params: {
                    ...param
                }
            }
        }
        url = url + xdebug;

        axios.get(url, params)
            .then(function (ret) {

                setDifTime(ret.data.time);

                if (ret.data.code === 10001) {
                    login();
                }
                success && success(ret.data)
            }).catch(function (error) {
            console.log(error);
            fail && fail(error);
        })
    }

};

let userAgent = md5(window.navigator.userAgent);

export const checkToken = function ({ token, success, fail }) {

    if (!token) {

        fail && fail();

    } else {
        try {
            var decoded = jwt.decode(token, '', true);
            console.log('checkToken', decoded);
            var nowTime = Math.round(new Date() / 1000) - difTime;

            if (!decoded.exp || decoded.exp < nowTime || userAgent !== decoded.data.t) {

                window.localStorage.setItem('token', '');

                fail && fail();
            } else {
                success && success();
            }
        } catch (e) {

            window.localStorage.setItem('token', '');

            fail && fail();
        }
    }
};

export const isPoneAvailable = _isPoneAvailable;

