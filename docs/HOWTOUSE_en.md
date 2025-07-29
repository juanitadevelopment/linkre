# Linkre Filter Methods Guide

Learn how to effectively use the four scanning methods in Linkre for optimal link collection.

## 🌐 Filter by Domain
**When you want to collect links only from specific websites**

### Usage Examples
- `github.com` → Extract only GitHub links
- `youtube.com` → YouTube video links only
- `amazon.com` → Amazon product pages only

### Perfect for
- Collecting links from specific media sources on news sites
- Gathering GitHub repository links from tech articles
- Extracting links from specific stores on shopping sites

---

## 📝 Filter by Link Text
**When you want to filter based on the text displayed in links**

### Usage Examples
- `Download` → Links containing "Download" text
- `Read more` → "Read more", "Learn more" type links
- `PDF` → "PDF version", "View PDF" links

### Perfect for
- Bulk collecting download links from software sites
- Gathering "Details" links from product pages
- Extracting "Manual" or "Documentation" links

---

## 🔗 Filter by URL Pattern
**When you want to find links containing specific strings in their URLs**

### Usage Examples
- `/download/` → URLs containing "/download/" path
- `.pdf` → Direct links to PDF files
- `/product/` → Product page URLs

### Perfect for
- Bulk collecting file download page URLs
- Gathering specific category pages (/news/, /blog/, etc.)
- Extracting image file links (.jpg, .png)

---

## ⚙️ Filter by Regular Expression
**For advanced pattern matching and precise extraction**

### Usage Examples
- `\.pdf$` → URLs ending with PDF files
- `^https://github\.com.*\/releases\/` → GitHub release pages
- `\.(zip|rar|7z)$` → Compressed file links

### Perfect for
- Combining multiple conditions
- Advanced users and developers
- Precise condition specifications

> **For Beginners:** Regular expressions might seem complex, but try copy-pasting the examples above to get started!

---

## 📋 Practical Use Case Scenarios

### Scenario 1: Software Downloads
1. **Domain**: `download.example.com` (dedicated download site)
2. **Text**: `Download` (download buttons)
3. **URL**: `.exe` (executable files)

### Scenario 2: Academic Paper Collection
1. **Domain**: `arxiv.org` (research paper site)
2. **Text**: `PDF` (PDF version links)
3. **Regex**: `\.pdf$` (ensure PDF files)

### Scenario 3: News Articles
1. **URL**: `/news/` (news category)
2. **Text**: `Read more` (article links)

## 💡 Selection Tips

1. **Simple conditions** → Use Domain or Text filters
2. **File type specification** → Use URL Pattern
3. **Complex conditions** → Use Regular Expression
4. **When in doubt** → Start with Domain filter

## 🚀 Quick Start Tips

- **New users**: Start with Domain filtering - it's the most intuitive
- **File hunters**: URL Pattern is your best friend for specific file types
- **Power users**: Regular expressions offer unlimited flexibility
- **Content curators**: Text filtering works great for editorial links

## 🔧 Pro Tips

- Combine different methods for different pages
- Save your commonly used patterns
- Test with a small sample before bulk operations
- Use "Clear" button to reset results between different filter attempts
