// Test script to verify transitions
console.log('[P3-A Test] Shared-element transitions loaded');
console.log('[P3-A Test] Modal route hook available:', typeof window.useModalRoute !== 'undefined');
console.log('[P3-A Test] Layout IDs present:', document.querySelectorAll('[data-projection-id]').length > 0);
console.log('[P3-A Test] AnimatePresence mounted:', document.querySelector('.AnimatePresence') !== null);

// Log navigation events
window.addEventListener('popstate', () => {
  console.log('[P3-A Test] Navigation: back/forward button pressed');
});

// Monitor for modal opening
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      const modal = document.querySelector('[role="dialog"]');
      if (modal) {
        console.log('[P3-A Test] Modal opened successfully');
        console.log('[P3-A Test] Focus trap active:', document.activeElement === modal.querySelector('button'));
      }
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });

export default {};