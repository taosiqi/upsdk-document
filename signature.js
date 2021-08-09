const crypto = require('crypto');
/**
 * 讲对象通过ASCII码排序
 * @param {*} Object 
 * @returns {*} String
 */
function objKeySort(arys) {
    //先用Object内置类的keys方法获取要排序对象的属性名数组，再利用Array的sort方法进行排序
    var newkey = Object.keys(arys).sort();
    var newObj = ''; //创建一个新的对象，用于存放排好序的键值对
    for (var i = 0; i < newkey.length; i++) {
        if (i === 0) {
            newObj += `${[newkey[i]]}=${arys[newkey[i]]}`;
        } else {
            newObj += `&${[newkey[i]]}=${arys[newkey[i]]}`;
        }
    }
    return newObj.substring(0, newObj.length);
}
/**
 * 生成signature
 * @param {*} Object 
 * @returns {*} String
 */
function createSignature(data) {
    return crypto.createHash('SHA256').update(objKeySort(data)).digest('hex')
}
/**
 * 生成16位签名随机字符串 nonceStr
 * @param {*} $length
 * @returns 
 */
function createNonceStr(length = 16) {
    let $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz', maxPos = $chars.length,pwd = '';
    for (i = 0; i < length; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}