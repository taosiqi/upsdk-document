# 云闪付小程序踩坑记录。

### 踩坑记录1  

[官方文档](https://opentools.95516.com/applet/#/ ) 网上资料少，文档也写的一言难尽，云闪付有个qq群**457767672**，里面有他们的技术人员，一点要先加群！！！

### 踩坑记录2  

先找老板或者运维要台测试服务器，云闪付的开发者工具一言难尽,关键时刻还是只能真机测试。

### 踩坑记录3  

引入前端SDK，不建议使用npm上面第三方的sdk插件，直接index.html引入upsdk，简单粗暴无副作用  
`<script type="text/javascript" src="https://open.95516.com/s/open/js/upsdk.js"></script>`

### 踩坑记录4 

使用upsdk.config初始化sdk，新版本已经废弃掉了，不用去折腾这个了，和后端折腾这个折腾了好久
![*](https://static-1253419794.cos.ap-nanjing.myqcloud.com/img/1629357268708.png)

### 踩坑记录5

upsdk.getLocationGps获取用户地理位置，ios和安卓返回结果不一致，安卓返回的一个字符串，ios返回的对象 
`let position = typeof res === 'string' ? JSON.parse(res) : res` 自己注意判断下

### 踩坑记录6

vue的授权按钮组件 https://open.95516.com/s/open/components/vue-cup-ui.zip  
react的授权按钮组件 https://open.95516.com/s/open/components/react-cup-ui.zip  
组件丢到项目文件夹  
![](https://static-1253419794.cos.ap-nanjing.myqcloud.com/img/1629359760786.png)

```javascript
//mainjs
import VueCupUI from './static/vue-cup-ui/lib/vue-cup-ui.umd.js'
import './static/vue-cup-ui/lib/vue-cup-ui.css'
Vue.use(VueCupUI)
```



```vue
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

