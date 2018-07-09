// 此文件是由模板文件 ".dtpl/page/$rawModuleName.js.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage, wxp} from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    priceList: [
      {title: '93#汽油', price: 12.50},
      {title: '柴油', price: 23.33},
      {title: '63#汽油', price: 14.40}
    ],
    city: ''
  }

  async onLoad(options) {
  }

  onReady() {
    console.log('store-userInfo', this.store.userInfo)
    this.setDataSmart({city: this.store.userInfo.city})
  }
}
