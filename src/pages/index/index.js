/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {pagify, wxp, MyPage} from 'base/'
import towxml from 'towxml'

const toWxml = new towxml()

// 把这个 class 转化成 微信的 Page 参数，并且注入全局 store
@pagify()
export default class extends MyPage {
  data = {
    conterStart: 10,
    toastVisble: false,

    motto: '',
    canIUseOpenButton: wxp.canIUse('button.open-type.getUserInfo'),
    topTabs: ['头条', '八卦', '周边'],
    tabcurIndex: 0,
    newsDatas: []
  }

  curTab = 'ask'

  //tab点击状态true：已点击，false：未点击
  enterItem = {
    ask: true,
    share: false,
    job: false
  }

  //新闻当前分页
  pageIndexs = {
    ask: 1,
    share: 1,
    job: 1
  }

  onShow() {
    this.setDataSmart({motto: 'Hello World'})
  }

  onClickAvatarImage() {
    // 跳转到 logs 页面
    this.app.$url.logs.go({id: 1})
    this.setDataSmart({motto: '开始跳转到 logs 页面'})
  }

  onClickOpenButton(e) {
    // 轻松修改全局数据
    this.store.userInfo = e.detail.userInfo

    // 组件内数据还是用 setDataSmart
    this.setDataSmart({motto: '点击了『获取头像昵称』按钮'})
  }

  showToast() {
    this.setDataSmart({toastVisble: true})
  }
  hideToast() {
    this.setDataSmart({toastVisble: false})
  }

  increase() {
    this.setDataSmart({conterStart: this.data.conterStart + 1})
  }

  gotoPrice() {
    this.app.$url.oilPrice.go();
  }

  gotoMap() {
    this.app.$url.gasStationMap.go();
  }

  topTabsTap(index) {
    // console.log('顶部选项卡序号', index.detail);
    const thisTemp = this;
    this.setDataSmart({tabcurIndex: index.detail});
    switch (index.detail) {
      case 0:
        this.curTab = 'ask'
        break;
      case 1:
        this.curTab = 'share'
        break;
      case 2:
        this.curTab = 'job'
        break;
      default:
        break;
    }

    //非首次进入tab不调用接口
    if (this.enterItem[this.curTab]) {
      return
    }

    this.enterItem[this.curTab] = true

    this.fly.get('https://cnodejs.org/api/v1/topics', {
      page: this.pageIndexs[this.curTab],
      tab: this.curTab,
      limit: 20,
      mdrender: true,
    })
    .then(function (response) {
      thisTemp.setDataSmart({[thisTemp.curTab]: response.data.data})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onReachBottom() {
    const thisTemp = this
    this.pageIndexs[this.curTab] += 1
    this.fly.get('https://cnodejs.org/api/v1/topics', {
      page: this.pageIndexs[this.curTab],
      tab: this.curTab,
      limit: 20,
      mdrender: true,
    })
    .then(function (response) {
      thisTemp.setDataSmart({[thisTemp.curTab]: thisTemp.data[thisTemp.curTab].concat(response.data.data)})
      console.log(thisTemp.data[thisTemp.curTab])
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  async onLoad(options) {
    // // 使用 require 加载图片
    // console.log('可以使用 require 的方法加载图片: %o', require('images/heart@3x.png'))
    // // 轻松读取全局数据
    // console.log('当前 Store: %o', this.store)
    // if (!this.store.userInfo && !this.data.canIUseOpenButton) {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   let {userInfo} = await wxp.getUserInfo()
    //   this.store.userInfo = userInfo
    // }
    const thisTemp = this
    
    this.fly.get('https://cnodejs.org/api/v1/topics', {
      page: 1,
      tab: 'ask',
      limit: 20,
      mdrender: true,
    })
    .then(function (response) {
      thisTemp.setDataSmart({['ask']: response.data.data})
      //富文本渲染数据
      console.log(toWxml.html2wxml(response.data.data[0].content))
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
