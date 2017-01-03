// 仅提供默认值，不需要和page中的数据保持同步
let defaultData = {
        isPraised: false,
        praiseCount: 0,
        showPraiseIcon: false,
    },
    praiseCount = defaultData.praiseCount,
    isPraised = false,
    showPraiseIcon = false;

function _formatPraiseCount(praiseCount) {
    praiseCount = praiseCount || 0;

    if (praiseCount >= 1000) {
        praiseCount = (praiseCount / 1000).toFixed(2) + 'k';
    }

    return praiseCount;
}

function _setPageData() {
    var me = this;

    me.setData({
        toolbarData: {
            isPraised: isPraised,
            showPraiseIcon: showPraiseIcon,
            praiseCount: _formatPraiseCount(praiseCount)
        }
    });
}

// 初始化
function init(count, praised, show = false) {
    var me = this;

    showPraiseIcon = show;
    isPraised = praised;
    praiseCount = count;

    _setPageData.call(me);
}


// 切换点赞状态
function togglePraise() {
    var me = this;

    isPraised ? praiseCount-- : praiseCount++;
    isPraised = !isPraised;

    _setPageData.call(me);
}

function redirectToBack(wx, url) {
    wx.switchTab({
        url: url
    })
}

function navigateToBack(wx) {
    wx.navigateBack();
}

function returnBack(wx, url) {
    let navigateLength = getCurrentPages();
    
    if(navigateLength.length == 1){
        redirectToBack(wx, url);
    }else{
        navigateToBack(wx);
    }
}
module.exports = {
    defaultData,

    init,
    togglePraise,
    redirectToBack,
    navigateToBack,
    returnBack
}
