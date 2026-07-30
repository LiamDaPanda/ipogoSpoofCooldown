// Service-worker registration + Add-to-Home-Screen install button.
// The button appears when Chrome/Edge fires beforeinstallprompt, or when
// the user is on iOS Safari (which requires manual Share -> Add to Home Screen).

(function () {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }

  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

  if (isStandalone) return;

  const isIOS = /iP(hone|od|ad)/.test(navigator.platform) ||
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document);

  let deferredPrompt = null;

  function ensureButton() {
    let btn = document.getElementById('pwa-install');
    if (btn) return btn;
    btn = document.createElement('button');
    btn.id = 'pwa-install';
    btn.type = 'button';
    btn.textContent = 'Install app';
    btn.style.cssText =
      'position:fixed;right:12px;bottom:12px;z-index:1000;' +
      'padding:10px 14px;border:none;border-radius:999px;' +
      'background:linear-gradient(90deg,#22d3ee,#a78bfa);color:#0f172a;' +
      'font:600 0.85rem -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;' +
      'box-shadow:0 4px 14px rgba(0,0,0,0.35);cursor:pointer;display:none;';
    document.body.appendChild(btn);
    return btn;
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const btn = ensureButton();
    btn.style.display = 'block';
    btn.textContent = 'Install app';
    btn.onclick = async () => {
      btn.style.display = 'none';
      try {
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
      } catch {}
      deferredPrompt = null;
    };
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    const btn = document.getElementById('pwa-install');
    if (btn) btn.style.display = 'none';
  });

  if (isIOS) {
    const KEY = 'ipogo-ios-a2hs-dismissed';
    if (!localStorage.getItem(KEY)) {
      window.addEventListener('DOMContentLoaded', () => {
        const btn = ensureButton();
        btn.textContent = 'Add to Home Screen';
        btn.style.display = 'block';
        btn.onclick = () => {
          alert(
            'To install: tap the Share button in Safari, then choose ' +
            '"Add to Home Screen".'
          );
          localStorage.setItem(KEY, '1');
          btn.style.display = 'none';
        };
      });
    }
  }
})();
