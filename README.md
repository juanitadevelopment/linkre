# Linkre - Smart Link Collection Tool

<div align="center">
  <img src="icons/icon128.png" alt="Linkre Logo" width="128">
  
  [![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Available-green.svg)](link-to-chrome-web-store)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
  [![Version](https://img.shields.io/badge/version-1.0-blue.svg)](manifest.json)
  
  **Efficiently collect and copy specific links from any webpage using powerful filtering options**
</div>

## ✨ Features

- 🌐 **Domain Filtering** - Find links from specific websites
- 📝 **Text Matching** - Search by link text content  
- 🔗 **URL Patterns** - Match specific URL structures
- ⚙️ **Regular Expressions** - Advanced pattern matching
- 📋 **One-click Copy** - Copy all or selected links instantly
- 💾 **Settings Memory** - Automatically saves your filter preferences
- 🌍 **Multi-language** - Available in English and Japanese

## 🚀 Quick Start

1. **Install the Extension**
   - Download from Chrome Web Store (coming soon)
   - Or install manually (see [Installation](#installation))

2. **Choose Your Filter Method**
   - Click the Linkre icon in your browser toolbar
   - Select a filter type (Domain, Text, URL, or Regex)
   - Enter your search criteria

3. **Scan and Copy**
   - Click "Scan Links" to find matching links
   - Select the links you want or use "Copy All"
   - Links are copied to your clipboard, ready to paste!

## 📖 Filter Methods Guide

### 🌐 Filter by Domain
Perfect for collecting links from specific websites.

**Examples:**
- `github.com` → Only GitHub links
- `youtube.com` → Only YouTube videos
- `amazon.com` → Only Amazon products

### 📝 Filter by Link Text
Find links based on their displayed text.

**Examples:**
- `Download` → All download links
- `Read more` → Article continuation links
- `PDF` → PDF document links

### 🔗 Filter by URL Pattern
Match specific patterns in URLs.

**Examples:**
- `/download/` → Download page URLs
- `.pdf` → Direct PDF file links
- `/product/` → Product page URLs

### ⚙️ Filter by Regular Expression
Advanced pattern matching for power users.

**Examples:**
- `\.pdf$` → URLs ending with .pdf
- `^https://github\.com.*\/releases\/` → GitHub release pages
- `\.(zip|rar|7z)$` → Compressed file links

## 💡 Use Cases

- **Researchers**: Collect academic paper links from multiple sources
- **Developers**: Gather GitHub repository or documentation links
- **Content Creators**: Extract media links from various platforms
- **Students**: Collect resource links for assignments
- **Digital Marketers**: Analyze competitor links and resources

## 🛠️ Installation

### From Chrome Web Store (Recommended)
Coming soon! We're preparing for Chrome Web Store submission.

### Manual Installation (Developer Mode)
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked" and select the extension folder
5. The Linkre icon should appear in your toolbar

## 📁 Project Structure

```
linkre/
├── manifest.json          # Extension configuration
├── popup.html            # Main interface
├── popup.js              # Interface logic
├── content.js            # Page scanning functionality
├── content.css           # Content styling
├── background.js         # Background processes
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── _locales/             # Internationalization
    ├── en/
    │   └── messages.json
    └── ja/
        └── messages.json
```

## 🌍 Internationalization

Linkre supports multiple languages:
- **English** (default)
- **Japanese** (日本語)

The extension automatically detects your browser's language setting.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Setup
1. Clone the repository
2. Make your changes
3. Test the extension locally
4. Submit a pull request

### Reporting Issues
Found a bug? Have a feature request? Please open an issue on GitHub.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with Chrome Extension Manifest V3
- Uses Chrome's native internationalization API
- Inspired by the need for efficient link collection workflows

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](../../issues)
- 💡 **Feature Requests**: [GitHub Issues](../../issues)
- 📧 **Contact**: [Create an issue](../../issues/new)

---

<div align="center">
  <strong>Made with ❤️ for productivity enthusiasts</strong>
  
  [⭐ Star this repo](../../stargazers) | [🍴 Fork it](../../fork) | [📋 Report Issues](../../issues)
</div>