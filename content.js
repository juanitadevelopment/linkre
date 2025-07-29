// Message listener for popup communication
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scanLinks') {
    try {
      const links = scanLinksOnPage(request.filterType, request.filterValue);
      sendResponse({links: links});
    } catch (error) {
      console.error('Error scanning links:', error);
      sendResponse({error: chrome.i18n.getMessage('invalidRegexError')});
    }
  }
});

// Scan links on the current page
function scanLinksOnPage(filterType, filterValue) {
  const allLinks = document.querySelectorAll('a[href]');
  const filteredLinks = [];
  
  allLinks.forEach(link => {
    const url = link.href;
    const text = link.textContent.trim();
    
    // Convert relative URLs to absolute URLs
    const absoluteUrl = new URL(url, window.location.href).href;
    
    // Check filter conditions
    if (shouldIncludeLink(absoluteUrl, text, filterType, filterValue)) {
      filteredLinks.push({
        url: absoluteUrl,
        text: text,
        element: link
      });
    }
  });
  
  return filteredLinks;
}

// Check if link matches filter conditions
function shouldIncludeLink(url, text, filterType, filterValue) {
  // Include all links if filter value is empty
  if (!filterValue) {
    return true;
  }
  
  try {
    const urlObj = new URL(url);
    
    switch (filterType) {
      case 'domain':
        return urlObj.hostname.includes(filterValue.toLowerCase());
        
      case 'text':
        return text.toLowerCase().includes(filterValue.toLowerCase());
        
      case 'url':
        return url.toLowerCase().includes(filterValue.toLowerCase());
        
      case 'regex':
        try {
          const regex = new RegExp(filterValue, 'i');
          return regex.test(url);
        } catch (regexError) {
          throw new Error(chrome.i18n.getMessage('invalidRegexError'));
        }
        
      default:
        return true;
    }
  } catch (error) {
    console.error('URL parsing error:', error);
    return false;
  }
}

// Highlight links (optional feature)
function highlightLinks(links) {
  // Remove existing highlights
  document.querySelectorAll('.linkre-highlight').forEach(el => {
    el.classList.remove('linkre-highlight');
  });
  
  // Highlight new links
  links.forEach(linkData => {
    if (linkData.element) {
      linkData.element.classList.add('linkre-highlight');
    }
  });
}

// Initialize when page is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

function initialize() {
  console.log('Linkre content script loaded');
}