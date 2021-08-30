<template>
  <div id="app">
    <van-collapse v-model="activeNames">
      <van-collapse-item title="界面" name="1">
        <van-button type="primary" block @click="setletStyle"
          >切换主题</van-button
        >
        <van-button type="primary" block @click="setTitleStyle"
          >返回按钮隐藏</van-button
        >
        <van-button type="primary" block @click="setBarVisible"
          >隐藏标题栏</van-button
        >
        <van-button type="primary" block @click="setGradient"
          >设置渐变色</van-button
        >
        <van-button type="primary" block @click="setTitleContent"
          >设置标题内容</van-button
        >
      </van-collapse-item>
      <van-collapse-item title="导航" name="2">
        <van-button type="primary" block @click="getLocation"
          >获取经纬度</van-button
        >
        <van-button type="primary" block @click="getCity">获取城市</van-button>
        <van-button type="primary" block @click="Navigate">导航</van-button>
      </van-collapse-item>
      <van-collapse-item title="支付" name="3">
        <van-button type="primary" block @click="scanQR">云闪付主扫</van-button>
        <van-button type="primary" block @click="qrCode">云闪付被扫</van-button>
      </van-collapse-item>
      <van-collapse-item title="设备" name="4">
        <van-button type="primary" block @click="getLight"
          >获取屏幕亮度</van-button
        >
        <van-button type="primary" block @click="setLight"
          >调节屏幕亮度</van-button
        >
        <van-button type="primary" block @click="changeScreenShote"
          >打开截屏权限(仅限android)</van-button
        >
        <van-button type="primary" block @click="monitor"
          >监听屏幕截屏(仅限ios)</van-button
        >
        <van-button type="primary" block @click="remove"
          >移除监听屏幕截屏(仅限ios)</van-button
        >
        <van-button type="primary" block @click="Photo">拍照</van-button>
        <van-button type="primary" block @click="getFile">获取文件</van-button>
      </van-collapse-item>
      <van-collapse-item title="操作" name="5">
        <van-button type="primary" block @click="toast">弹窗</van-button>
        <van-button type="primary" block @click="openApp"
          >打开小程序</van-button
        >
        <van-button type="primary" block @click="closeApp"
          >关闭小程序</van-button
        >
        <van-button type="primary" block @click="collectApp"
          >关注小程序</van-button
        >
        <van-button type="primary" block @click="addCard">绑卡</van-button>
        <van-button type="primary" block @click="addApp">添加到首页</van-button>
        <van-button type="primary" block @click="createWeb"
          >打开页面</van-button
        >
        <van-button type="primary" block @click="getUserDate"
          >获取退出账号时间</van-button
        >
      </van-collapse-item>
      <van-collapse-item title="分享" name="6">
        <van-button type="primary" block @click="showShare"
          >分享内容</van-button
        >
        <van-button type="primary" block @click="wakeShare"
          >唤起分享</van-button
        >
        <van-button type="primary" block @click="openBlue"
          >初始化蓝牙</van-button
        >
        <van-button type="primary" block @click="closeBlue"
          >关闭蓝牙</van-button
        >
        <van-button type="primary" block @click="queryData"
          >查询数据</van-button
        >
      </van-collapse-item>
      <van-collapse-item title="联登" name="7">
        <UPButton
          class="customBtn"
          @click="btnClick"
          scope="scope.mobile"
          :style="{ width: '6rem', height: '2.4rem', backgroundColor: 'red' }"
        >
          授权button
        </UPButton>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  name: "App",
  setup() {
    let data = reactive({
      style: "black",
      isShow: "true",
      Bar: 1,
      activeNames: ["0"],
    });
    let param = toRefs(data);
    function btnClick(event, err, result) {
      console.log(event, err, result);
    }

    function setletStyle() {
      upsdk.pluginReady(function () {
        if (data.style == "black") {
          upsdk.setTitleStyle({
            appletStyle: "white",
          });
          data.style = "white";
        } else {
          upsdk.setTitleStyle({
            appletStyle: "black",
          });
          data.style = "black";
        }
      });
    }

    function setTitleStyle() {
      upsdk.pluginReady(function () {
        if (data.isShow) {
          upsdk.setTitleStyle({
            backBtnVisible: "0",
          });
          data.isShow = false;
        } else {
          upsdk.setTitleStyle({
            backBtnVisible: "1",
          });
          data.isShow = true;
        }
      });
    }

    function setBarVisible() {
      upsdk.pluginReady(function () {
        console.log(data.Bar);
        if (data.Bar == "1") {
          upsdk.setTitleStyle({
            appletTitleBarVisible: "0",
          });
          data.Bar = "0";
        } else {
          upsdk.setTitleStyle({
            appletTitleBarVisible: "1",
          });
          data.Bar = "1";
        }
      });
    }

    function setGradient() {
      upsdk.pluginReady(function () {
        upsdk.setTitleStyle({
          navBackgroundColor: "0x8FFFFFFF",
          appletTitleGradientOrient: "top",
          appletTitleGradientStartColor: "0x8FFFFFFF",
          appletTitleGradientEndColor: "0x88888888",
        });
      });
    }

    function setTitleContent() {
      upsdk.pluginReady(function () {
        upsdk.setNavigationBarTitle({
          title: "我换名字了",
        });
      });
    }

    function getLocation() {
      upsdk.getLocationGps({
        success: function (data) {
          console.log(data);
        },
        fail: function (data) {
          console.log(data);
        },
      });
    }

    function getCity() {
      upsdk.pluginReady(function () {
        upsdk.getLocationCity({
          success: function (cityCd) {
            upsdk.showFlashInfo({
              msg: cityCd,
            });
          },
        });
      });
    }
    function Navigate() {
      upsdk.pluginReady(function () {
        upsdk.navi({
          sLat: "31.23958", // 起点纬度
          sLon: "121.499763", // 起点经度
          sName: "上海东方明珠", // 起点名称
          dLat: "39.917854", // 终点维度
          dLon: "116.397006", // 终点经度
          dName: "北京故宫", // 终点名称
          success: function (res) {
            console.log(res);
          },
          fail: function (msg) {
            console.log(msg);
          },
        });
      });
    }

    function scanQR() {
      upsdk.pluginReady(function () {
        upsdk.scanQRCodeNew();
      });
    }

    function qrCode() {
      upsdk.pluginReady(function () {
        upsdk.qrCodePay();
      });
    }

    function scanQRCode() {
      upsdk.pluginReady(function () {
        upsdk.scanQRCode({
          scanType: ["qrCode", "barCode"],
          success: function (result) {
            alert("Scan result = " + result); //result返回地址
          },
        });
      });
    }

    function getLight() {
      upsdk.pluginReady(function () {
        upsdk.getScreenBrightness({
          success: function (data) {
            upsdk.showFlashInfo({
              msg: data,
            });
          },
          fail: function (msg) {
            console.log(msg);
          },
        });
      });
    }

    function setLight() {
      upsdk.pluginReady(function () {
        upsdk.setScreenBrightness({
          brightness: "1.0",
          success: function (data) {
            console.log(data);
          },
          fail: function (msg) {
            console.log(msg);
          },
        });
      });
    } //调节好亮度后无法再调节

    function changeScreenShot() {
      upsdk.pluginReady(function () {
        upsdk.changeScreenShot({
          switch: true, // true表示禁止截屏，false表示允许截屏
          success: function () {},
          fail: function (msg) {
            console.log(msg);
          },
        });
      });
    } //仅限android使用

    function monitor() {
      upsdk.pluginReady(function () {
        upsdk.monitorScreenShot({
          success: function () {},
        });
      });
    } //仅限ios使用

    function remove() {
      upsdk.pluginReady(function () {
        upsdk.removeScreenShot({
          success: function () {},
        });
      });
    }

    function Photo() {
      upsdk.pluginReady(function () {
        upsdk.chooseImage({
          maxWidth: "400", //目标图片宽度, 默认500,可选
          maxHeight: "400", //目标图片高度, 默认1000,可选
          sourceType: "1", //1|2|3, 仅允许拍照|仅允许从手机相册中选图|拍照或从手机相册中选图都支持, 默认为3’，可选
          success: function (data) {
            if (data.base64) {
              console.log(data); // 目标图片采用base64编码.
            }
          },
        });
      });
    }

    function getFile() {
      upsdk.pluginReady(function () {
        upsdk.chooseFileFromAlbum({
          maxSize: "524288", //不支持*号，此处为512*1024byte
          sourceType: "02", // 00:仅支持视频文件，例如mp4、mov等。01：仅支持图片文件，例如png、jpg等。02：支持视频+图片文件
          success: function (data) {
            console.log(data.url);
            upsdk.readAlbumData({
              //获取文件base64编码
              url: data.url,
              bufferSize: "524288",
              fromOffset: "0", //每块的开始位置，第一块为0，第二块为1*bufferSize,依次类推
              success: function (data) {
                console.log(data);
              },
              fail: function (err) {
                console.log(err);
                // {code:'00',msg:'参数错误'}
                // {code:'01',msg:'内部错误'}
                // {code:'02',msg:'权限失败'}
                // {code:'03',msg:'用户选择的文件超过最大值'}
                // {code:'04',msg:'其他错误'}
              },
            });
          },
          fail: function (err) {
            console.log(err);
            // {code:’00’,msg:’参数错误’}
            // {code:’01’,msg:’内部错误’}
            // {code:’02’,msg:’权限失败’}
            // {code:’03’,msg:’用户选择的文件超过最大值’}
            // {code:’04’,msg:’其他错误’}
          },
        });
      });
    }
    function toast() {
      upsdk.pluginReady(function () {
        upsdk.showFlashInfo({
          msg: "我是弹窗",
        });
      });
    }

    function openApp() {
      upsdk.pluginReady(function () {
        upsdk.openApplet({
          appId: "2618afce47553ed3",
          //param： ‘key1=1&key2=2’,  //可选，拼在小程序首页url后的查询参数
          isFinish: "1", // 可选, “1”表示关闭当前页面 非“0"不做处理, 默认为0
          //toLink:'url', //可选，打开小程序时打开指定页，url不做编码，url要求域名在小程序安全域名范围内，仅支持云闪付9.0以上版本
          fail: function (code) {
            console.log(code);
            //code=101表示appId为空,code=102表示找不到该应用
          },
        });
      });
    }

    function closeApp() {
      upsdk.pluginReady(function () {
        upsdk.closeWebApp();
      });
    }

    function collectApp() {
      upsdk.pluginReady(function () {
        upsdk.collectCurrentApplet({
          success: function (data) {
            console.log(data);
            // 成功回调 data={"code":"00"}
            // 用户点击了关注，且关注成功了
          },
          fail: function (error) {
            console.log(error);
            // 失败回调 error={"code":"", msg:””}
            // ‘01’: 当前小程序已经关注
            // ‘02’: 环境错误（在非小程序页面调用或者当前小程序运行异常）
            // ‘03’: 网络异常（网络错误或者服务器响应错误）
            // ‘04’: 用户取消（用户点击右上角X）
            // ‘05’: 其它异常
          },
        });
      });
    }

    function addCard() {
      upsdk.pluginReady(function () {
        upsdk.addBankCard({
          success: function () {},
          fail: function () {},
        });
      });
    }
    function addApp() {
      upsdk.pluginReady(function () {
        upsdk.addCommonApp({
          url: "http://test.xiangyuetech.cn/unionpay/applet", // 必填，应用的入口url，此url必须是后台配置中存在的应用首页url。
          success: function (data) {
            console.log(data);
            // 成功回调 {code:’00’,msg:’添加成功’ } ，指首页应用未满，直接添加的场景,添加首页末尾
            // 成功回调 {code:’01’,msg:’替换成功’ } ，指首页应用已满，替换应用的场景
          },
          fail: function (data) {
            console.log(data);
            // 失败回调 {code:’02’,msg:’用户取消’}
            // 失败回调 {code:’03’,msg:’信息为空’} ，调用后台接口成功，但相应内容为空的场景
            // 失败回调 {code:’04’,msg:’应用信息已存在常用应用中’}
            // 失败回调 {code:’05’,msg:’请先登录’}
            // 失败回调 {code:’99’,msg:’参数错误’}
            // 其它失败回调 {code:’’,msg:’’}
          },
        });
      });
    }
    function createWeb() {
      upsdk.pluginReady(function () {
        upsdk.createWebView({
          url: "https://qxwouffjun.feishu.cn/docs/doccnCYISz6edfYReFiF6DZ4SSY", // 新webview容器中运行的目标页面地址
          isFinish: "1", //是否关闭当前的窗口,'1':关闭，'0':不关闭
        });
      });
    }

    function getUserDate() {
      upsdk.pluginReady(function () {
        upsdk.getUserLogoutDate({
          success: function (data) {
            // 插件调用成功
            console.log(data); // data = {userLogoutDate:'1611566646395'} 1970时间戳，精确到毫秒
          },
          fail: function () {
            // 插件调用失败
          },
        });
      });
    }
    function showShare() {
      upsdk.pluginReady(function () {
        upsdk.shareSinglePlugin({
          title: "银联云闪付随机立减大优惠～！",
          desc: "我刚刚使用银联云闪付, 省了30元,大家快来使用吧.",
          shareUrl: "", // 默认为当前页面链接即location.href
          picUrl: "", //默认显示银联云闪付图标
          shareId: "3", // 详细见备注
          shareType: "1", //’1’:链接分享，’2’:文字分享，’4’：图片分享， 详细见备注
          shareData: {
            // 详细见备注
            content: "", // 可选，当shareType为2时，必传
            image: "iVBORw…AAElFTkSuQmCC", //图片的base64数据，可选，仅当shareType为4时，传
          },
          fail: function (code) {
            console.log(code);
            // code: '01':对应渠道的应用未安装，例如微信未安装，或该渠道调用失败
            // code: '02':检查shareType,shareaId是否正确
          },
        });
      });
    }

    function wakeShare() {
      upsdk.pluginReady(function () {
        upsdk.appletSharePopup({
          success: function () {
            // 插件调用成功
          },
          fail: function () {
            // 插件调用失败
          },
        });
      });
    }

    function openBlue() {
      upsdk.pluginReady(function () {
        upsdk.openBluetoothAdapter({
          success: function (data) {
            console.log(data);
            // 成功回调 {"isSupportBLE": "yes"} 支持BLE，不区分大小写
            // 成功回调 {"isSupportBLE": "no"} 不支持BLE，不区分大小写
          },
          fail: function (data) {
            console.log(data);
            // 失败回调 {code:’’,msg:’’}
          },
        });
      });
    }

    function closeBlue() {
      upsdk.pluginReady(function () {
        upsdk.closeBluetoothAdapter({
          success: function () {},
          fail: function () {},
        });
      });
    }

    function queryData() {
      upsdk.pluginReady(function () {
        upsdk.queryData({
          key: "textcontent",
          success: function (result) {
            console.log(result);
            // result = {code:'',msg:'',key:'xxx',value:'xxx'}
          },
        });
      });
    }
    return {
      ...param,
      btnClick,
      setletStyle,
      setTitleStyle,
      setBarVisible,
      setGradient,
      setTitleContent,
      getLocation,
      getCity,
      Navigate,
      scanQR,
      qrCode,
      scanQRCode,
      getLight,
      setLight,
      changeScreenShot,
      monitor,
      remove,
      Photo,
      getFile,
      toast,
      openApp,
      closeApp,
      collectApp,
      addCard,
      addApp,
      createWeb,
      getUserDate,
      showShare,
      wakeShare,
      openBlue,
      closeBlue,
      queryData,
    };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
