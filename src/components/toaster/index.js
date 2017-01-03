// 仅提供默认值，不需要和page中的数据保持同步
let defaultData = {
    status: 'hide',
    text: ''
};
let timer;
// 绑定page的作用域，修改page的数据
// 显示toaster

function show(text, duration = 3000) {
    var me = this;

    timer && clearTimeout(timer);
    me.setData({
        toasterData: {
            status: 'show',
            text: text
        }
    });

    timer = setTimeout(function() {
        me.setData({
            toasterData: defaultData
        });
    }, duration);
}

// 隐藏toaster
function hide() {
    var me = this;

    me.setData({
        toasterData: defaultData    
    });
}

module.exports = {
    defaultData,

    show,
    hide
}
