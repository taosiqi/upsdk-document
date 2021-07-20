# js-upsdk

云闪付、银联小程序SDK，基于银联SDK打包，暂时只在Vue上面实验，实际React应该也是可以使用的。因为银联sdk没有使用版本固定，本次编译使用的是2021年7月16的版本，尽量做到一周一更，也可以自行编译使用。

## 使用方法（Vue为例）
第一步
```bash
$ npm install js-upsdk -S
```

第二步

在main.js中使用

```javascript
import upsdk from 'js-upsdk'
upsdk.config({
  appId: '', 
  nonceStr: '', 
  timestamp: '', 
  signature: '', 
  debug: true, 
})
```
| 参数      | 是否必须 | 说明                                                         |
| --------- | -------- | ------------------------------------------------------------ |
| appId     | 是       | 接入方的唯一标识                                             |
| nonceStr  | 是       | 生成签名的随机串                                             |
| timestamp | 是       | 生成签名的时间戳                                             |
| signature | 是       | 签名值，签名因子包括( appId , nonceStr , secret , timestamp )， 签名方法：SHA-256 参见示例代码 |
| debug     | 否       | 是否开启调试模式，本地调试时可以开启，页面会有`upconsole` 调试窗口，且会把错误信息alert出来 |


## 用法示例

文档会在使用中逐一补充
