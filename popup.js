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
      
      // フィルター入力フィールドを有効化
      filterInput.disabled = false;
      
      // スキャンボタンを有効化
      const scanBtnElement = document.getElementById('scanBtn');
      if (scanBtnElement) {
        scanBtnElement.disabled = false;
      }
      
      // 設定を保存
      saveSettings();
    });
  });
  
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
    
    const resultsElement = document.getElementById('results');
    const statusElement = document.getElementById('status');
    
    if (resultsElement) {
      resultsElement.innerHTML = '';
    }
    if (statusElement) {
      statusElement.innerHTML = '';
    }
    
    updateButtonStates(false);
  }
  
  // リストをクリア
  clearBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    clearResults();
  });
  
  // フィルター入力値が変更された時に設定を保存
  filterInput.addEventListener('input', function() {
    saveSettings();
  });
  
  // リンクスキャン
  scanBtn.addEventListener('click', async function() {
    try {
      const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
      const filterType = document.querySelector('input[name="filterType"]:checked')?.value;
      const filterValue = filterInput.value.trim();
      
      if (!filterType) {
        showStatus(chrome.i18n.getMessage('selectFilterFirst'), 'error');
        return;
      }
      
      const response = await chrome.tabs.sendMessage(tab.id, {
        action: 'scanLinks',
        filterType: filterType,
        filterValue: filterValue
      });
      
      handleScanResponse(response);
    } catch (error) {
      console.error('Scan error:', error);
      showStatus(chrome.i18n.getMessage('errorOccurred'), 'error');
    }
  });
  
  // スキャン結果を処理
  function handleScanResponse(response) {
    if (response && response.links && response.links.length > 0) {
      currentLinks = response.links;
      displayLinks(currentLinks);
      updateButtonStates(true);
      showStatus(chrome.i18n.getMessage('linksFound', [currentLinks.length.toString()]), 'success');
    } else if (response && response.error) {
      clearResults();
      showStatus(chrome.i18n.getMessage('regexError', [response.error]), 'error');
    } else {
      clearResults();
      showStatus(chrome.i18n.getMessage('noLinksFound'), 'error');
    }
  }
  
  // 選択したリンクをクリップボードにコピー
  copyBtn.addEventListener('click', function() {
    const selectedLinks = getSelectedLinks();
    
    if (selectedLinks.length === 0) {
      showStatus(chrome.i18n.getMessage('selectLinks'), 'error');
      return;
    }
    
    copyToClipboard(selectedLinks, selectedLinks.length);
  });
  
  // すべてのリンクを一括コピー
  copyAllBtn.addEventListener('click', function() {
    if (currentLinks.length === 0) {
      showStatus(chrome.i18n.getMessage('noLinksToaCopy'), 'error');
      return;
    }
    
    const allUrls = currentLinks.map(link => link.url);
    copyToClipboard(allUrls, allUrls.length, true);
  });
  
  // 選択されたリンクを取得
  function getSelectedLinks() {
    return Array.from(document.querySelectorAll('.link-item input[type="checkbox"]:checked'))
      .map(checkbox => checkbox.dataset.url);
  }
  
  // クリップボードにコピー
  async function copyToClipboard(links, count, isAll = false) {
    try {
      const linkText = links.join('\n');
      await navigator.clipboard.writeText(linkText);
      
      const messageKey = isAll ? 'allLinksCopied' : 'linksCopied';
      showStatus(chrome.i18n.getMessage(messageKey, [count.toString()]), 'success');
    } catch (error) {
      console.error('Copy failed:', error);
      showStatus(chrome.i18n.getMessage('copyFailed'), 'error');
    }
  }
  
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
  
  // リンクを表示 (パフォーマンス最適化版)
  function displayLinks(links) {
    const resultsElement = document.getElementById('results');
    if (!resultsElement) return;
    
    resultsElement.innerHTML = '';
    
    if (links.length === 0) {
      resultsElement.innerHTML = '<p>リンクが見つかりませんでした</p>';
      return;
    }
    
    // 大量のリンクの場合はバッチ処理
    const BATCH_SIZE = 100;
    const MAX_DISPLAY_LINKS = 1000;
    
    const linksToDisplay = links.slice(0, MAX_DISPLAY_LINKS);
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < linksToDisplay.length; i += BATCH_SIZE) {
      const batch = linksToDisplay.slice(i, i + BATCH_SIZE);
      
      setTimeout(() => {
        const batchFragment = document.createDocumentFragment();
        
        batch.forEach((link, batchIndex) => {
          const actualIndex = i + batchIndex;
          const linkItem = createLinkElement(link, actualIndex);
          batchFragment.appendChild(linkItem);
        });
        
        resultsElement.appendChild(batchFragment);
      }, 0);
    }
    
    // 表示制限を超えた場合の通知
    if (links.length > MAX_DISPLAY_LINKS) {
      const limitMessage = document.createElement('p');
      limitMessage.className = 'limit-message';
      limitMessage.textContent = `Showing first ${MAX_DISPLAY_LINKS} of ${links.length} links`;
      resultsElement.appendChild(limitMessage);
    }
  }
  
  // リンク要素を作成
  function createLinkElement(link, index) {
    const linkItem = document.createElement('div');
    linkItem.className = 'link-item';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `link-${index}`;
    checkbox.dataset.url = link.url;
    checkbox.checked = true;
    
    const label = document.createElement('label');
    label.htmlFor = `link-${index}`;
    label.className = 'link-url';
    label.title = link.url;
    label.textContent = link.text || link.url;
    
    linkItem.appendChild(checkbox);
    linkItem.appendChild(label);
    
    return linkItem;
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