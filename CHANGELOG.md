# Changelog

All notable changes to Linkre will be documented in this file.

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
