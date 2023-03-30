/*
 * @Author: curechen 981470148@qq.com
 * @Date: 2023-03-29 13:46:24
 * @LastEditors: curechen 981470148@qq.com
 * @LastEditTime: 2023-03-30 16:44:33
 * @FilePath: \workplace\learn\learnPwa\cache.js
 * @Description: 
 */
const CACHE_NAME = 'cache-v5'
// ServiceWorker实例对象安装时触发监听回调函数
self.addEventListener('install', event => {
  console.log('install')
  // event 就是指安装这个过程，目的就是为了确保新的sw对象安装成功前，不会终止当前的安装过程
  event.waitUntil(caches.open(CACHE_NAME).then(cache => {
    // 将根目录下的所有文件放入缓存
    cache.addAll([
      '/'
    ])
  }))
})
// 安装之后还需要激活
self.addEventListener('activate', event => {
  console.log('activate123')
  // 使新的 service worker 获得页面控制权，从而可以做一些预处理操作，比如缓存文件等
  event.waitUntil(self.clients.claim())
  event.waitUntil(caches.keys().then(cacheNames => {
    return Promise.all(cacheNames.map(cacheName => {
      if (cacheName !== CACHE_NAME) {
        console.log('执行了吗1')
        // 删除旧缓存
        return caches.delete(cacheName)
      }
    }))
  }))
})
// 进行网络请求时触发的回调函数
self.addEventListener('fetch', event => {
  console.log('fetch')
  // 只筛选 http 请求，像一些其他协议比如 chrome-extension，cache 并不支持
  if ((event.request.url.indexOf('http') === 0)) {
    event.respondWith(caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        if (response) {
          return response
        }

        return fetch(event.request).then(response => {
          // 以键值对的形式存储
          cache.put(event.request, response.clone())
          return response
        })
      })
    }))
  }

})