let ro = null

import('@juggle/resize-observer')
  .then(res => {
    console.log(res)
  })
// (async () => {
//   if ('ResizeObserver' in window === false) {
//     // Loads polyfill asynchronously, only if required.
//     const module = await import('@juggle/resize-observer');
//     window.ResizeObserver = module.ResizeObserver;
//   }
//   // Uses native or polyfill, depending on browser support.
//   ro = new ResizeObserver((entries, observer) => {
//     console.log('Something has resized!');
//   });

// })();


export default ro
