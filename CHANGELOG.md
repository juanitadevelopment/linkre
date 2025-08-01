# Changelog

All notable changes to Linkre will be documented in this file.

## [1.0.1] - 2025-08-01

### Added
- **CLAUDE.md**: Comprehensive development guide for Claude Code integration
- **SPECIFICATION.md**: Detailed technical specifications and requirements in Japanese
- Performance limit notifications for large link counts
- Enhanced error messages with more specific regex validation

### Changed
- **Performance Improvements**: 
  - Batched rendering (100 links per batch) to prevent UI freezing
  - Display limit of 1000 links with overflow notification
  - Link processing limit of 10,000 for optimal performance
  - Optimized DOM manipulation using DocumentFragment
- **Code Quality**:
  - Removed duplicate functions in popup.js
  - Improved function modularity and reusability
  - Enhanced error handling consistency across components
  - Better input validation and sanitization
- **UI Enhancements**:
  - Added CSS performance optimizations for large lists
  - Improved status messaging and user feedback
  - Better visual indicators for processing limits

### Fixed
- Duplicate code elimination in popup.js (lines 112-145)
- URL validation to skip dangerous links (javascript:, empty URLs)
- Memory leaks with large link processing
- Inconsistent error handling across different components

### Technical
- Enhanced content script with better error recovery
- Improved async/await error handling patterns
- Added proper URL validation and edge case handling
- Performance CSS optimizations with `contain: layout style`

## [1.0.0] - 2025-07-29

### Added
- Initial release of Linkre Chrome extension
- Four filter methods:
  - Domain filtering for website-specific links
  - Text filtering for link content matching
  - URL pattern filtering for path/file matching
  - Regular expression filtering for advanced users
- One-click copy functionality for selected or all links
- Clear button to reset scan results
- Settings persistence across sessions
- International support (English and Japanese)
- Modern Chrome Extension Manifest V3 compliance
- Comprehensive error handling and user feedback

### Features
- **Smart Link Detection**: Automatically converts relative URLs to absolute URLs
- **Batch Operations**: Copy multiple links at once with proper formatting
- **User-Friendly Interface**: Clean, intuitive popup design
- **Memory**: Saves your last used filter settings
- **Performance**: Efficient scanning even on pages with thousands of links

### Technical Details
- Chrome Extension Manifest V3
- Content Scripts for page interaction
- Chrome Storage API for settings persistence
- Chrome i18n API for internationalization
- Modern JavaScript (ES6+)
- Responsive CSS design

---

## Ideas for Future Releases

### P1
- Export functionality (JSON, CSV formats)
- Custom regex pattern library
- Link preview functionality
- Performance improvements for large pages

### P2
- Additional language support (Spanish, French, German)
- Advanced filtering combinations
- Link categorization
- Keyboard shortcuts

### P3
- Bulk link validation
- Integration with external tools
- Advanced analytics and reporting
- Team sharing features

---

For detailed development progress, see [GitHub Issues](../../issues) and [Project Board](../../projects).
