# 云闪付小程序踩坑记录。

### 踩坑记录1 

> [官方文档](https://opentools.95516.com/applet/#/)      
> [银联开放平台接入技术gitee](https://gitee.com/openunionpay)    

网上资料少，文档也写的一言难尽，云闪付有个qq群**457767672**，里面有他们的技术人员，一点要先加群！！！也可以去他们的gitee上面提issues.

### 踩坑记录2 

先找老板或者运维要台测试服务器，云闪付的开发者工具一言难尽,关键时刻还是只能真机测试。

### 踩坑记录3 

引入前端SDK，不建议使用npm上面第三方的sdk插件，直接index.html引入upsdk，简单粗暴无副作用<script type="text/javascript" src="https://open.95516.com/s/open/js/upsdk.js"></script>

### 踩坑记录4 

使用upsdk.config初始化sdk，小程序里面可以不用初始化（小程序打开webview，webview想要使用小程序能力，可能需要用到，没尝试过），不用去折腾这个了，和后端折腾这个折腾了好久。![img](https://cdn.nlark.com/yuque/0/2021/png/1023559/1629360349028-06c662ff-f78a-43fa-a10f-37bd9f8a52bf.png)

### 踩坑记录5

upsdk.getLocationGps获取用户地理位置，ios和安卓返回结果不一致，安卓返回的一个字符串，ios返回的对象 let position = typeof res === 'string' ? JSON.parse(res) : res 自己注意判断下

### 踩坑记录6

授权组件文档 https://opentools.95516.com/applet/#/docs/develop/oauth?id=_020203![img](https://cdn.nlark.com/yuque/0/2021/png/1023559/1629360349061-875a452f-0e4d-43d3-bc47-d00cc09b5015.png)

```
//mainjs
import VueCupUI from './static/vue-cup-ui/lib/vue-cup-ui.umd.js'
import './static/vue-cup-ui/lib/vue-cup-ui.css'
Vue.use(VueCupUI)
<!--登陆页面-->
<template>
  <UPButton class="login" scope="scope.mobile" @click="getPhoneNumber">
        云闪付用户一键登录
   </UPButton>
</template>

<script>
export default {
  methods: {
    // 获取手机号
    getPhoneNumber(e, err, result) {
      if (err) {
        console.log('授权失败，请重试')
        return
      }
      if (result && result.code) {
        // 同意授权，拿到code，让后端处理下面的流程
        this.loginByAuth(result.code)
      }
    },
  },
}
</script>
```

### 踩坑记录7

自带的upconsole调试工具功能比较少，可以搭配eruda使用 https://www.npmjs.com/package/eruda



### 踩坑记录8

ios下，从首页进入第二个页面，然后点击胶囊的重新载入按钮，这个时候会回到首页，但是导航栏会显示一个返回按钮，upsdk.setTitleStyle({backBtnVisible: 0})也无法去除，官方回复是框架问题



### 踩坑记录9

```
async pay() {
      let tn = await getTN()
      upsdk.pay({
        tn,
        success: function() {
          payTime = setInterval(() => {
            //  轮训后端接口，查询支付状态
          }, 1000)
        },
        fail: function(err) {
          console.log('err=>', err.msg)
        },
      })
    },
```
