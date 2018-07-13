// 此文件是由模板文件 ".dtpl/page/$rawModuleName.js.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage, wxp} from 'base/'
import md5 from 'md5'

@pagify()
export default class extends MyPage {
  data = {
  }

  async onLoad(options) {
    this.fly.get('https://fanyi-api.baidu.com/api/trans/vip/translate', {
      q: encodeURIComponent('nice'),
      from: 'auto',
      to: 'zh',
      appid: '20180712000184943',
      salt: 1,
      sign: md5('20180712000184943' + 'nice' + '1' + '52d3x1C27Ss3XxMbDCyP')
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
