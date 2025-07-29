# Contributing to Linkre

Thank you for your interest in contributing to Linkre! We welcome contributions from everyone.

## 🚀 Getting Started

### Prerequisites
- Google Chrome browser
- Basic knowledge of JavaScript, HTML, and CSS
- Familiarity with Chrome Extension development (helpful but not required)

### Development Setup
1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/linkre.git
   cd linkre
   ```

2. **Load the extension in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the project folder

3. **Make your changes**
   - Edit the relevant files
   - Test your changes by reloading the extension

## 📝 How to Contribute

### Reporting Bugs
1. Check if the issue already exists in [GitHub Issues](../../issues)
2. If not, create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Chrome version and OS
   - Screenshots if applicable

### Suggesting Features
1. Check existing issues and discussions
2. Create a new issue with:
   - Clear description of the feature
   - Use case and benefits
   - Possible implementation approach

### Code Contributions

#### Branch Naming
- `feature/description` - for new features
- `bugfix/description` - for bug fixes
- `docs/description` - for documentation updates

#### Code Style
- Use consistent indentation (2 spaces)
- Add comments for complex logic
- Follow existing code patterns
- Use meaningful variable names

#### Commit Messages
Follow conventional commit format:
```
type(scope): description

Examples:
feat(popup): add keyboard shortcuts
fix(content): resolve link scanning issue
docs(readme): update installation instructions
```

#### Pull Request Process
1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, commented code
   - Test thoroughly
   - Update documentation if needed

3. **Test your changes**
   - Load the extension in Chrome
   - Test all affected functionality
   - Test in both English and Japanese (if applicable)

4. **Submit a pull request**
   - Fill out the PR template
   - Reference any related issues
   - Include screenshots for UI changes

## 🧪 Testing Guidelines

### Manual Testing Checklist
- [ ] Extension loads without errors
- [ ] All filter types work correctly
- [ ] Settings are saved and restored
- [ ] Copy functionality works
- [ ] Clear button functions properly
- [ ] UI is responsive and accessible
- [ ] Both English and Japanese interfaces work

### Test Scenarios
1. **Basic functionality**
   - Install extension and test on various websites
   - Try all four filter methods
   - Test copy and clear functions

2. **Edge cases**
   - Very long URLs
   - Pages with many links (1000+)
   - Pages with no links
   - Invalid regular expressions

3. **Browser compatibility**
   - Test on different Chrome versions
   - Test with different language settings

## 🌍 Internationalization

### Adding New Languages
1. Create a new folder in `_locales/` (e.g., `_locales/es/`)
2. Copy `messages.json` from `_locales/en/`
3. Translate all message values
4. Test the new language

### Translation Guidelines
- Keep translations concise for UI space
- Maintain the same tone (helpful, professional)
- Test translations in the actual interface
- Consider cultural context

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for functions
- Document complex algorithms
- Explain non-obvious code decisions

### User Documentation
- Update README.md for new features
- Add examples for new filter capabilities
- Keep installation instructions current

## 🏗️ Project Structure

```
linkre/
├── manifest.json          # Extension metadata and permissions
├── popup.html            # Main popup interface
├── popup.js              # Popup logic and event handling
├── content.js            # Page content analysis
├── content.css           # Content script styles
├── background.js         # Background service worker
├── icons/                # Extension icons (16, 48, 128px)
└── _locales/             # Internationalization files
    ├── en/messages.json  # English strings
    └── ja/messages.json  # Japanese strings
```

## 📋 Code Review Process

### For Reviewers
- Check functionality and edge cases
- Verify code follows project conventions
- Test the changes locally
- Provide constructive feedback

### For Contributors
- Respond to feedback promptly
- Make requested changes
- Update tests if needed
- Squash commits before merging

## 🎯 Priority Areas

We're especially interested in contributions for:

1. **New filter methods** - Additional ways to identify links
2. **Performance improvements** - Faster scanning for large pages
3. **UI/UX enhancements** - Better user experience
4. **Accessibility** - Screen reader compatibility, keyboard navigation
5. **Additional languages** - Expanding international support
6. **Advanced features** - Batch processing, export formats

## ❓ Questions?

- Open a [GitHub Issue](../../issues) for bugs or feature requests
- Start a [Discussion](../../discussions) for general questions
- Check existing issues and PRs for similar topics

## 🙏 Thank You!

Every contribution helps make Linkre better for everyone. Whether it's code, documentation, bug reports, or feature suggestions - we appreciate your effort!

---

**Happy Contributing! 🎉**