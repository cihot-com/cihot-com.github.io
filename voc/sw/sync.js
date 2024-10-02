self.addEventListener('sync', (e) => {
  console.debug('sync');
  e.waitUntil(self.registration.showNotification(title, options).catch((err) => console.log(err)));
});

(async () => {
  const registration = await navigator.serviceWorker.getRegistration();

  if ('sync' in registration) {
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelector('sync-btn')?.addEventListener?.('click', (e) => {
        console.debug(e.type, e.target);
        registration.sync.register('sync-demo');
      });
    });

    await registration.sync.register('sync-demo');
  } else {
    console.debug('--- sync 없어');
  }
})();
