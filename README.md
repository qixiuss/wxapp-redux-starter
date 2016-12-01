# 微信小程序模板【文档完善中】


## 模板介绍
- 集成了Redux，数据管理更方便
- 开发过程中，使用xml取代wxml，对开发工具更友好
- 开发过程中，使用less取代wxss，功能更强大
- 引入es-promise，以便可以创建并使用Promise
- 添加promisify工具函数，可以便捷的将官方Api转换成Pormise模式
- 引入normalizr，可以将数据扁平化，更方便进行数据管理
- 引入`babel`自动进行`ES2015`特性转换


## 如何使用最佳实践开发微信小程序？
1. 先设计redux数据结构
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

2. 微信小程序App & Page模板
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

3. components，强烈建议写成非状态组件
todo

## 如何运行项目？
1. `npm run dev`: 开发模式使用，构建项目并监听改动
使用微信小程序开发工具添加dist目录的时候，**最好先构建，再添加**，不然微信小程序开发工具可能会监听不到dist目录下的文件。

2. `npm run build`: 生产模式使用，构建项目

## 感谢
该模板参考并借鉴了以下两个开源项目，特此感谢！
[weapp-boilerplate](https://github.com/zce/weapp-boilerplate)
[wechat-weapp-redux](https://github.com/charleyw/wechat-weapp-redux)