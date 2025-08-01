# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Linkre (リンクル) is a Chrome browser extension that allows users to collect and copy specific links from web pages using various filtering methods. The extension provides four filtering types: domain filtering, text matching, URL pattern matching, and regular expression support.

### Target Users
- Researchers and academics
- Web developers  
- Content creators
- Digital marketers
- General users performing information collection

## Architecture

### Core Components

- **popup.html/popup.js**: Main extension interface - handles user interactions, filter selection, and settings persistence using Chrome storage API
- **content.js**: Content script injected into web pages - scans DOM for links and applies filters
- **background.js**: Service worker for extension lifecycle management (minimal implementation)
- **manifest.json**: Chrome Extension Manifest V3 configuration

### Communication Flow

1. User interacts with popup interface
2. Popup sends messages to content script via `chrome.tabs.sendMessage()`
3. Content script scans page links and applies filters
4. Results are returned to popup for display and clipboard operations

### Filtering System

The extension supports four filter types implemented in `content.js:shouldIncludeLink()`:
- **Domain**: Matches hostname using partial matching, case-insensitive (e.g., `github.com`)
- **Text**: Matches link text content using partial matching, case-insensitive (e.g., `Download`)  
- **URL**: Matches full URL patterns using partial matching, case-insensitive (e.g., `/download/`)
- **Regex**: Uses `RegExp` with case-insensitive flag for advanced pattern matching (e.g., `\.pdf$`)

### Data Flow
```
1. User clicks "Scan Links"
2. Popup → Content Script (chrome.tabs.sendMessage)
3. Content Script scans DOM for <a> tags
4. Content Script filters links based on criteria
5. Content Script → Popup (response)
6. Popup displays filtered results
```

## Development Commands

### Build and Package
```bash
# Build extension for Chrome Web Store
./build.sh
```

The build script creates a zip file (`linkre-v1.0.0.zip`) ready for Chrome Web Store submission by copying essential files and excluding development artifacts.

### Testing
Load the unpacked extension in Chrome developer mode for testing:
1. Navigate to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the repository directory

## Key Technical Details

### UI Specifications
- **Popup Size**: 350px width, variable height (max 600px)
- **Results List**: Max height 200px with vertical scroll
- **Color Scheme**: Main blue (#4285f4), success green (#155724), error red (#721c24)
- **Button States**: Disabled until conditions met (results available, filter selected)

### Performance Requirements
- **UI Response**: Popup display <100ms, filter switching <50ms, settings save <200ms
- **Scan Performance**: 
  - Small pages (<100 links): <500ms
  - Medium pages (100-1000 links): <2s  
  - Large pages (>1000 links): <5s
- **Memory Usage**: <5MB idle, <20MB during scan
- **Max Capacity**: Up to 10,000 links per scan

### Internationalization
- **Supported Languages**: English (default), Japanese
- Uses Chrome i18n API with `_locales/` directory structure
- Messages defined in `_locales/en/messages.json` and `_locales/ja/messages.json`
- UI elements use `data-i18n` attributes for automatic localization
- Dynamic language switching based on browser settings

### Security & Privacy
- **Data Collection**: None - completely local processing
- **External Communication**: None - no network requests
- **Data Storage**: Only user preferences in `chrome.storage.local`
- **Permissions**: Minimal required permissions only

### Permissions
- `activeTab`: Access current tab for link scanning only
- `clipboardWrite`: Copy links to clipboard only
- `storage`: Persist user filter preferences only

### State Management
- Filter preferences saved to `chrome.storage.local`
- Settings automatically restored on popup open
- Scan data kept in memory only, cleared on extension close
- No external dependencies or build tools required

## Development Notes

### Code Structure
- Pure vanilla JavaScript with no frameworks
- Event-driven architecture using Chrome extension APIs
- Popup window constrained to 350px width for browser compatibility
- Clean separation of concerns: UI (popup.js), content scanning (content.js), minimal background (background.js)

### Error Handling Strategy
- **User Errors**: Invalid regex patterns, empty selections, missing filter types
- **System Errors**: Communication failures, permission issues, browser compatibility
- **Display**: Red background status messages with internationalized text
- **Logging**: Console errors for development, minimal production logging
- **Validation**: Real-time regex syntax checking, graceful URL parsing failures

### Quality Assurance Requirements
- **Testing Scope**: All filter methods, various websites, error cases
- **Compatibility**: Chrome latest + 2 previous versions, major OS platforms
- **Performance**: Large page testing, memory monitoring, stability verification
- **Release Criteria**: All functions working, no security vulnerabilities, multi-language accuracy

### Browser Compatibility
- **Target**: Chrome 88+ (Manifest V3 support)
- **Architecture**: Service worker instead of background page
- **APIs**: Modern Chrome extension APIs, clipboard API with fallback
- **Future Plans**: Edge and Firefox support planned for v1.1-1.2

### System Requirements
- Google Chrome 88 or later
- Any Chrome-supported operating system
- User permissions: activeTab, clipboardWrite, storage