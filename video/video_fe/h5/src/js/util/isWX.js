/**
 * 是否是微信的webview
 */
export default navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';