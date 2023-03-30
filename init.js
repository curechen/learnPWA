/*
 * @Author: curechen 981470148@qq.com
 * @Date: 2023-03-29 13:46:24
 * @LastEditors: curechen 981470148@qq.com
 * @LastEditTime: 2023-03-30 09:08:41
 * @FilePath: \workplace\learn\learnPwa\sw.js
 * @Description: 
 */
// ServiceWorker实例对象安装时触发监听回调函数
self.addEventListener('install', event => {
  console.log('install')
  // event 就是指安装这个过程，目的就是为了确保新的sw对象安装成功前，不会终止当前的安装过程
  event.waitUntil(self.skipWaiting())
})
// 安装之后还需要激活
self.addEventListener('activate', event => {
  console.log('activate')
  event.waitUntil(self.clients.claim())
})
// 进行网络请求时触发的回调函数
self.addEventListener('fetch', event => {
  console.log('fetch')
})