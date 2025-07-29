// バックグラウンドスクリプト
// 現在は特別な処理は不要ですが、将来的な拡張のために用意

chrome.runtime.onInstalled.addListener(() => {
  console.log('Link Collector extension installed');
});