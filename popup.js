document.addEventListener('DOMContentLoaded', function() {
  const scanBtn = document.getElementById('scanBtn');
  const copyBtn = document.getElementById('copyBtn');
  const copyAllBtn = document.getElementById('copyAllBtn');
  const clearBtn = document.getElementById('clearBtn');
  const filterInput = document.getElementById('filterInput');
  const results = document.getElementById('results');
  const status = document.getElementById('status');
  const regexHelp = document.getElementById('regexHelp');
  
  let currentLinks = [];
  
  // 国際化UI設定
  function localizeUI() {
    // data-i18n属性を持つ要素のテキストを設定
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const messageKey = element.getAttribute('data-i18n');
      element.textContent = chrome.i18n.getMessage(messageKey);
    });
    
    // HTMLコンテンツを含む要素を設定
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
      const messageKey = element.getAttribute('data-i18n-html');
      element.innerHTML = chrome.i18n.getMessage(messageKey);
    });
    
    // プレースホルダーを設定
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const messageKey = element.getAttribute('data-i18n-placeholder');
      element.placeholder = chrome.i18n.getMessage(messageKey);
    });
  }
  
  // プレースホルダー更新
  function updatePlaceholder(filterType) {
    const placeholderKeys = {
      'domain': 'placeholderDomain',
      'text': 'placeholderText',
      'url': 'placeholderUrl',
      'regex': 'placeholderRegex',
      '': 'selectFilterFirst'
    };
    
    const key = placeholderKeys[filterType];
    if (key) {
      filterInput.placeholder = chrome.i18n.getMessage(key);
    }
  }
  
  // ボタン状態を更新する関数
  function updateButtonStates(hasResults) {
    console.log('Updating button states, hasResults:', hasResults); // デバッグ用
    
    const copyBtnElement = document.getElementById('copyBtn');
    const copyAllBtnElement = document.getElementById('copyAllBtn');
    const clearBtnElement = document.getElementById('clearBtn');
    
    if (copyBtnElement) {
      copyBtnElement.disabled = !hasResults;
      console.log('Copy button disabled:', copyBtnElement.disabled); // デバッグ用
    }
    if (copyAllBtnElement) {
      copyAllBtnElement.disabled = !hasResults;
      console.log('Copy all button disabled:', copyAllBtnElement.disabled); // デバッグ用
    }
    if (clearBtnElement) {
      clearBtnElement.disabled = !hasResults;
      console.log('Clear button disabled:', clearBtnElement.disabled); // デバッグ用
    }
  }
  
  // リストクリア機能を独立した関数に
  function clearResults() {
    currentLinks = [];
    
    // DOM要素を再取得して確実にクリア
    const resultsElement = document.getElementById('results');
    const statusElement = document.getElementById('status');
    
    if (resultsElement) {
      resultsElement.innerHTML = '';
    }
    if (statusElement) {
      statusElement.innerHTML = '';
    }
    
    // ボタン状態を更新
    updateButtonStates(false);
    
    console.log('Results cleared'); // デバッグ用
  }
  
  // 国際化テキストを設定
  localizeUI();
  
  // 設定を読み込み
  loadSettings();
  
  // フィルタータイプが変更された時のプレースホルダー更新と設定保存
  document.querySelectorAll('input[name="filterType"]').forEach(radio => {
    radio.addEventListener('change', function() {
      updatePlaceholder(this.value);
      
      // 正規表現の場合はヘルプを表示
      if (this.value === 'regex') {
        regexHelp.style.display = 'block';
      } else {
        regexHelp.style.display = 'none';
      }
      
      // 国際化UI設定
  function localizeUI() {
    // data-i18n属性を持つ要素のテキストを設定
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const messageKey = element.getAttribute('data-i18n');
      element.textContent = chrome.i18n.getMessage(messageKey);
    });
    
    // HTMLコンテンツを含む要素を設定
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
      const messageKey = element.getAttribute('data-i18n-html');
      element.innerHTML = chrome.i18n.getMessage(messageKey);
    });
    
    // プレースホルダーを設定
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const messageKey = element.getAttribute('data-i18n-placeholder');
      element.placeholder = chrome.i18n.getMessage(messageKey);
    });
  }
  
  // プレースホルダー更新
  function updatePlaceholder(filterType) {
    const placeholderKeys = {
      'domain': 'placeholderDomain',
      'text': 'placeholderText',
      'url': 'placeholderUrl',
      'regex': 'placeholderRegex'
    };
    
    const key = placeholderKeys[filterType];
    if (key) {
      filterInput.placeholder = chrome.i18n.getMessage(key);
    }
  }
  
  // リストをクリア
  clearBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Clear button clicked'); // デバッグ用
    
    // 強制的にリストをクリア
    clearResults();
  });
  
  // ボタン状態を更新する関数
  function updateButtonStates(hasResults) {
    const copyBtnElement = document.getElementById('copyBtn');
    const copyAllBtnElement = document.getElementById('copyAllBtn');
    const clearBtnElement = document.getElementById('clearBtn');
    
    if (copyBtnElement) {
      copyBtnElement.disabled = !hasResults;
    }
    if (copyAllBtnElement) {
      copyAllBtnElement.disabled = !hasResults;
    }
    if (clearBtnElement) {
      clearBtnElement.disabled = !hasResults;
    }
  }
  
  // リストクリア機能を独立した関数に
  function clearResults() {
    currentLinks = [];
    
    // DOM要素を再取得して確実にクリア
    const resultsElement = document.getElementById('results');
    const statusElement = document.getElementById('status');
    
    if (resultsElement) {
      resultsElement.innerHTML = '';
    }
    if (statusElement) {
      statusElement.innerHTML = '';
    }
    
    // ボタン状態を更新
    updateButtonStates(false);
    
    console.log('Results cleared'); // デバッグ用
  }
  
  // 設定を保存
      saveSettings();
    });
  });
  
  // フィルター入力値が変更された時に設定を保存
  filterInput.addEventListener('input', function() {
    saveSettings();
  });
  
  // リンクスキャン
  scanBtn.addEventListener('click', async function() {
    try {
      const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
      const filterType = document.querySelector('input[name="filterType"]:checked').value;
      const filterValue = filterInput.value.trim();
      
      // コンテンツスクリプトにメッセージを送信
      const response = await chrome.tabs.sendMessage(tab.id, {
        action: 'scanLinks',
        filterType: filterType,
        filterValue: filterValue
      });
      
      if (response && response.links) {
        currentLinks = response.links;
        displayLinks(currentLinks);
        updateButtonStates(true);
        showStatus(chrome.i18n.getMessage('linksFound', [currentLinks.length.toString()]), 'success');
      } else if (response && response.error) {
        currentLinks = [];
        const resultsElement = document.getElementById('results');
        if (resultsElement) resultsElement.innerHTML = '';
        updateButtonStates(false);
        showStatus(chrome.i18n.getMessage('regexError', [response.error]), 'error');
      } else {
        currentLinks = [];
        const resultsElement = document.getElementById('results');
        if (resultsElement) resultsElement.innerHTML = '';
        updateButtonStates(false);
        showStatus(chrome.i18n.getMessage('noLinksFound'), 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showStatus(chrome.i18n.getMessage('errorOccurred'), 'error');
    }
  });
  
  // 選択したリンクをクリップボードにコピー
  copyBtn.addEventListener('click', function() {
    const selectedLinks = Array.from(document.querySelectorAll('.link-item input[type="checkbox"]:checked'))
      .map(checkbox => checkbox.dataset.url);
    
    if (selectedLinks.length === 0) {
      showStatus(chrome.i18n.getMessage('selectLinks'), 'error');
      return;
    }
    
    const linkText = selectedLinks.join('\n');
    
    navigator.clipboard.writeText(linkText).then(() => {
      showStatus(chrome.i18n.getMessage('linksCopied', [selectedLinks.length.toString()]), 'success');
    }).catch(err => {
      console.error('Copy failed:', err);
      showStatus(chrome.i18n.getMessage('copyFailed'), 'error');
    });
  });
  
  // すべてのリンクを一括コピー
  copyAllBtn.addEventListener('click', function() {
    if (currentLinks.length === 0) {
      showStatus(chrome.i18n.getMessage('noLinksToaCopy'), 'error');
      return;
    }
    
    const allUrls = currentLinks.map(link => link.url);
    const linkText = allUrls.join('\n');
    
    navigator.clipboard.writeText(linkText).then(() => {
      showStatus(chrome.i18n.getMessage('allLinksCopied', [allUrls.length.toString()]), 'success');
    }).catch(err => {
      console.error('Copy failed:', err);
      showStatus(chrome.i18n.getMessage('copyFailed'), 'error');
    });
  });
  
  // 設定を保存
  function saveSettings() {
    const filterType = document.querySelector('input[name="filterType"]:checked').value;
    const filterValue = filterInput.value;
    
    chrome.storage.local.set({
      filterType: filterType,
      filterValue: filterValue
    });
  }
  
  // 設定を読み込み
  function loadSettings() {
    chrome.storage.local.get(['filterType', 'filterValue'], function(result) {
      // フィルタータイプを復元
      if (result.filterType && result.filterType !== '') {
        const filterTypeRadio = document.querySelector(`input[name="filterType"][value="${result.filterType}"]`);
        if (filterTypeRadio) {
          filterTypeRadio.checked = true;
          
          // フィルター入力フィールドを有効化
          filterInput.disabled = false;
          
          // スキャンボタンを有効化
          const scanBtnElement = document.getElementById('scanBtn');
          if (scanBtnElement) {
            scanBtnElement.disabled = false;
          }
          
          // プレースホルダーを更新
          updatePlaceholder(result.filterType);
          
          // 正規表現の場合はヘルプを表示
          if (result.filterType === 'regex') {
            regexHelp.style.display = 'block';
          } else {
            regexHelp.style.display = 'none';
          }
        }
      }
      
      // フィルター値を復元
      if (result.filterValue) {
        filterInput.value = result.filterValue;
      }
    });
  }
  
  // リンクを表示
  function displayLinks(links) {
    const resultsElement = document.getElementById('results');
    if (!resultsElement) return;
    
    resultsElement.innerHTML = '';
    
    if (links.length === 0) {
      resultsElement.innerHTML = '<p>リンクが見つかりませんでした</p>';
      return;
    }
    
    links.forEach((link, index) => {
      const linkItem = document.createElement('div');
      linkItem.className = 'link-item';
      
      linkItem.innerHTML = `
        <input type="checkbox" id="link-${index}" data-url="${link.url}" checked>
        <label for="link-${index}" class="link-url" title="${link.url}">
          ${link.text || link.url}
        </label>
      `;
      
      resultsElement.appendChild(linkItem);
    });
  }
  
  // ステータス表示
  function showStatus(message, type) {
    const statusElement = document.getElementById('status');
    if (!statusElement) return;
    
    statusElement.innerHTML = `<div class="status ${type}">${message}</div>`;
    setTimeout(() => {
      if (statusElement) {
        statusElement.innerHTML = '';
      }
    }, 3000);
  }
});