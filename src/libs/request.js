import Promise from '../vendor/es6-promise.js';

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
                    resolve(res.data)
                },
                fail: function(err) {
                    reject(err)
                }
            });
        })
    }
}

export const get = request('GET');
export const post = request('POST');
export const put = request('PUT');
export const del = request('DELETE');
