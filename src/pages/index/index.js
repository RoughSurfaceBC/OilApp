/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {pagify, wxp, MyPage} from 'base/'

// 把这个 class 转化成 微信的 Page 参数，并且注入全局 store
@pagify()
export default class extends MyPage {
  data = {
    conterStart: 10,
    toastVisble: false,

    motto: '',
    canIUseOpenButton: wxp.canIUse('button.open-type.getUserInfo'),
    topTabs: ['头条', '八卦', '周边'],
    tabcurIndex: 0
  }

  onShow() {
    this.setDataSmart({motto: 'Hello World'})
    console.log(this.store.userInfo);
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
    console.log('showToast')
    this.setDataSmart({toastVisble: true})
  }
  hideToast() {
    console.log('hideToast')
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
    this.setDataSmart({tabcurIndex: index.detail});
  }

  async onLoad(options) {
    // 使用 require 加载图片
    console.log('可以使用 require 的方法加载图片: %o', require('images/heart@3x.png'))
    // 轻松读取全局数据
    console.log('当前 Store: %o', this.store)
    if (!this.store.userInfo && !this.data.canIUseOpenButton) {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      let {userInfo} = await wxp.getUserInfo()
      this.store.userInfo = userInfo
    }
  }
}
