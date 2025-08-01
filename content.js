// Message listener for popup communication
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scanLinks') {
    try {
      const links = scanLinksOnPage(request.filterType, request.filterValue);
      sendResponse({links: links});
    } catch (error) {
      console.error('Error scanning links:', error);
      const errorMessage = error.message || chrome.i18n.getMessage('invalidRegexError');
      sendResponse({error: errorMessage});
    }
  }
  return true; // Keep message channel open for async response
});

// Scan links on the current page with performance optimization
function scanLinksOnPage(filterType, filterValue) {
  const allLinks = document.querySelectorAll('a[href]');
  const filteredLinks = [];
  const MAX_LINKS = 10000; // Performance limit from specification
  
  let processedCount = 0;
  
  for (const link of allLinks) {
    if (processedCount >= MAX_LINKS) {
      console.warn(`Link scanning stopped at ${MAX_LINKS} links for performance`);
      break;
    }
    
    try {
      const url = link.href;
      const text = link.textContent.trim();
      
      // Skip invalid or empty URLs
      if (!url || url === '#' || url.startsWith('javascript:')) {
        continue;
      }
      
      // Convert relative URLs to absolute URLs
      const absoluteUrl = new URL(url, window.location.href).href;
      
      // Check filter conditions
      if (shouldIncludeLink(absoluteUrl, text, filterType, filterValue)) {
        filteredLinks.push({
          url: absoluteUrl,
          text: text || absoluteUrl,
          element: link
        });
      }
      
      processedCount++;
    } catch (error) {
      console.warn('Error processing link:', link.href, error);
      continue;
    }
  }
  
  return filteredLinks;
}

// Check if link matches filter conditions
function shouldIncludeLink(url, text, filterType, filterValue) {
  // Include all links if filter value is empty
  if (!filterValue || !filterValue.trim()) {
    return true;
  }
  
  const trimmedValue = filterValue.trim();
  
  try {
    switch (filterType) {
      case 'domain':
        const urlObj = new URL(url);
        return urlObj.hostname.toLowerCase().includes(trimmedValue.toLowerCase());
        
      case 'text':
        return text.toLowerCase().includes(trimmedValue.toLowerCase());
        
      case 'url':
        return url.toLowerCase().includes(trimmedValue.toLowerCase());
        
      case 'regex':
        try {
          const regex = new RegExp(trimmedValue, 'i');
          return regex.test(url);
        } catch (regexError) {
          throw new Error(`Invalid regular expression: ${regexError.message}`);
        }
        
      default:
        console.warn('Unknown filter type:', filterType);
        return true;
    }
  } catch (error) {
    if (error.message.includes('Invalid regular expression')) {
      throw error; // Re-throw regex errors
    }
    console.error('URL processing error:', error);
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