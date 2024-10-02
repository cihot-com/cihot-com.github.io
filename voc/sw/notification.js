let started = false;

function startSSE() {
  if (started) return;
  started = true;
  const source = new EventSource(`${baseURL}/sse`); // 服务器端提供的SSE接口
  source.onmessage = function (event) {
    console.debug('sse', event);
    const data = JSON.parse(event.data); // 假设服务器返回的数据是JSON格式
    showNotification(data.title, data.message);
  };
}

// VAPID 公钥
const publicVapidKey = 'BPUZsOtyl0nCkkZD6YnXvcfB1bL95ZznLYN2zUCO61uLoU4K2v4W0Zsom6gK_NUM8C-w5tNqsFxHbNKrrLbWQA0';

// 将 URL Base64 转换为 Uint8Array（用于 VAPID 的公钥）
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

(async () => {
  console.log('准备', navigator.serviceWorker);
  // const registration = await navigator.serviceWorker.getRegistration();
  // console.debug('%cregistration', 'color:red', registration);
})();

// 注册 Service Worker 并订阅推送
async function subscribeUser() {
  if ('serviceWorker' in navigator) {
    try {
      // 注册 Service Worker
      const registration = await navigator.serviceWorker.getRegistration();

      // 使用 PushManager 订阅推送
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true, // 必须设置为 true，表示推送消息对用户可见
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey), // 使用 VAPID 公钥
      });

      // 发送订阅信息到服务器
      await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('用户已订阅推送');
    } catch (error) {
      console.error('订阅失败:', error);
    }
  } else {
    console.warn('Service Workers 不受当前浏览器支持');
  }
}

self.registration.pushManager.getSubscription().then((...s) => {
  console.debug('--', s);
});

function showNotification(title, message) {
  self.registration.showNotification(title, {
    body: message,
    icon: '/favicon.svg',
  });
}

// 请求推送通知权限
function subscribeUserToPush() {
  console.debug('navigator.serviceWorker', navigator.serviceWorker);
  // return navigator.serviceWorker
  //   .then(function (registration) {
  //     const subscribeOptions = {
  //       userVisibleOnly: true,
  //       applicationServerKey: 'BPUZsOtyl0nCkkZD6YnXvcfB1bL95ZznLYN2zUCO61uLoU4K2v4W0Zsom6gK_NUM8C-w5tNqsFxHbNKrrLbWQA0',
  //     };

  //     return registration.pushManager.subscribe(subscribeOptions);
  //   })
  //   .then(function (pushSubscription) {
  //     console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
  //     return pushSubscription;
  //   });
}

subscribeUserToPush();
