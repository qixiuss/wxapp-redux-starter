# 微信小程序模板【文档完善中】


## 模板介绍
- 集成了`Redux`，数据管理更方便
- 开发过程中，使用`xml`取代`wxml`，对开发工具更友好
- 开发过程中，使用`less`取代`wxss`，功能更强大
- 引入`es-promise`，以便可以创建并使用`Promise`
- 添加`promisify`工具函数，可以便捷的将官方`Api`转换成`Pormise`模式
- 引入`normalizr`，可以将数据扁平化，更方便进行数据管理
- 引入`babel`自动进行`ES2015`特性转换


## 如何使用最佳实践开发微信小程序？
#### 1. 先设计`Redux`数据结构
为了不让代码过于分散，该模板将`Redux`相关的代码全部放到了`redux`目录中，并且将关联的`action`和`reducer`逻辑放到同一个文件中。
```
// state
todo

// 普通action & action creator
todo

// 异步action
todo

// reducer
todo

// store
todo
```

#### 2. 微信小程序App & Page模板

```
// App 模板
import { Provider } from './vendors/weapp-redux.js';
import { store } from './redux/store.js';


let appConfig = {};

App(Provider(store())(appConfig))


// Page 模板
const {
    connect
} = require('../../vendors/weapp-redux.js')

let pageConfig = {}
let mapStateToData = state => ({})
let mapDispatchToPage = dispatch => ({})

pageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)
Page(pageConfig);
```

#### 3. 开发 `components`下的组件，强烈建议写成非状态组件
todo

## 如何运行项目？
1. `npm run dev`: 开发模式使用，构建项目并监听改动
使用微信小程序开发工具添加`dist`目录的时候，**最好先构建，再添加**，不然微信小程序开发工具可能会监听不到`dist`目录下的文件。

2. `npm run build`: 生产模式使用，构建项目

## 一些开发过程中的总结，欢迎反馈更多
✦ 官方swiper组件支持垂直滑动模式，简单设置vertical即可
```
<swiper vertical="true"></swiper>
```
✦ 微信小程序开发工具和VPN冲突，关闭微信小程序开发工具的代理/或关闭VPN即可

✦ 最新版微信小程序开发工具不再默认支持`Promise`，引入`es-promise`即可。
该模板已经默认引入了`es-promise`，并封装了简单的异步请求。
```
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
```



## 感谢
该模板参考并借鉴了以下两个开源项目，特此感谢！
[weapp-boilerplate](https://github.com/zce/weapp-boilerplate)
[wechat-weapp-redux](https://github.com/charleyw/wechat-weapp-redux)