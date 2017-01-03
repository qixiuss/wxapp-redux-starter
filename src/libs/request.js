import Promise from '../vendors/es6-promise.js';

function request(method = 'GET') {
    return function(url, data = {}) {
        return new Promise(function(resolve, reject) {
            wx.request({
                url,
                data,
                method,
                header: {
                    'Content-Type': 'application/json'
                },
                success: function(res) {
                    let statusCode = res.statusCode,
                        errMsg = res.errMsg,
                        data = res.data;

                    if (statusCode == 200 && data.meta && data.meta.status == 200) {
                        resolve(data.response);
                    } else {
                        reject('网路请求错误，请稍后再试~');
                    }
                },
                fail: function(err) {
                    reject('网路请求不符合规范，请检查域名是否符合要求~');
                }
            });
        })
    }
}

export const GET = request('GET');
export const POST = request('POST');
export const PUT = request('PUT');
export const DELETE = request('DELETE');
