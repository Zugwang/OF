# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **OnlyStache simulation** for a short film project. It simulates a creator interface with statistics, upload functionality, and messaging. The project prioritizes **simplicity and ease of modification** over full functionality - it's designed for novice developers to modify easily.

**Key constraint:** Zero dependencies. HTML/CSS/JS vanilla + Python built-in HTTP server only.

## Running the Project

### Start the server

```bash
# Localhost only (default, recommended)
python start-server.py

# Network mode (for filming from other devices)
python start-server.py --network

# Custom port
python start-server.py --port 8080

# Help
python start-server.py --help
```

Access at: `http://localhost:8000`

### Pages available
- `/` or `/index.html` - Homepage feed
- `/dashboard.html` - Creator statistics dashboard
- `/upload.html` - Video/photo upload page
- `/messages.html` - Messaging interface

## Architecture

### Data-Driven Design

**All content is in JSON files** - this is by design for easy modification:

- `data/stats.json` - Creator statistics (views, earnings, subscribers, heatmap data)
- `data/conversations.json` - Message conversations with pre-written messages
- `data/posts.json` - Feed posts with media references

Users modify these JSON files directly to change statistics, messages, and posts. The JavaScript loads and displays this data.

### CSS Architecture (3-layer system)

1. **`css/variables.css`** - OnlyStache brand colors (#00AFF0 blue, etc.) and spacing/typography variables
2. **`css/components.css`** - Reusable components (buttons, cards, stat-cards, message-bubbles, post-cards)
3. **`css/pages.css`** - Page-specific styles (dashboard layout, heatmap, upload zone, messages layout)

**Color scheme:** Based on official OnlyStache palette (primary: #00AFF0, dark: #27272B, gray: #8A96A3)

### JavaScript Architecture

Two main files:

1. **`js/data-loader.js`** - Loads JSON data and populates pages
   - `loadStats()` - Loads and displays statistics
   - `loadPosts()` - Loads and displays feed posts
   - `generateHeatmap()` - Generates activity heatmap from data
   - Exposes functions globally via `window.*`

2. **`js/messages.js`** - Messaging functionality
   - `loadConversations()` - Loads conversation list
   - `selectConversation()` - Switches between conversations
   - `sendMessage()` - Simulates sending messages (modifies in-memory data)
   - Exposes functions globally via `window.*`

Each HTML page includes the relevant JS and calls initialization functions in `DOMContentLoaded` listeners.

### Media Handling

Media files go in `media/` subdirectories:
- `media/avatars/` - Profile pictures (creator.jpg, user1.jpg, etc.)
- `media/images/` - Post images
- `media/videos/` - Post videos

**Fallback behavior:** If images are missing, SVG placeholders with initials are generated inline using data URIs.

## Modifying Content

### To change statistics
Edit `data/stats.json` and refresh the page. No build step.

### To add/modify messages
Edit `data/conversations.json`. Structure:
```json
{
  "conversations": [
    {
      "id": 1,
      "name": "User Name",
      "messages": [
        {"sender": "received|sent", "text": "...", "time": "14:32"}
      ]
    }
  ]
}
```

### To change colors
Edit CSS variables in `css/variables.css` - all colors cascade from `:root` variables.

### To add new pages
1. Create new HTML file with same navbar structure as existing pages
2. Link CSS files: `variables.css`, `components.css`, `pages.css`
3. Add navigation link in navbar of all pages
4. Use existing CSS components (`.card`, `.stat-card`, `.btn-primary`, etc.)

## Important Constraints

1. **No build process** - No npm, webpack, bundlers. Direct file editing only.
2. **No external dependencies** - No CDNs, no libraries. Vanilla JS/CSS only.
3. **Easy to modify** - Non-developers should be able to edit JSON files to change content.
4. **Not secure** - This is for LAN demo only, no authentication/security needed.
5. **Desktop only** - No mobile responsive design required.

## Server Details

`start-server.py` is a simple Python HTTP server with:
- Localhost-only mode by default (secure)
- Optional `--network` flag for LAN access
- CORS headers enabled
- Custom logging
- Auto-detects local IP for network mode

The server uses Python's built-in `http.server` and `socketserver` - no external packages.

## When Making Changes

- **Maintain zero dependencies** - No npm packages, no CDN links
- **Keep JSON editable** - Don't move to databases or complex formats
- **Preserve simplicity** - Code should be readable by novices
- **Test with F5 refresh** - Changes to JSON/CSS should work with simple refresh
- **Follow OnlyStache color scheme** - Use CSS variables, don't hardcode colors
- **Use existing components** - Leverage `.stat-card`, `.card`, `.btn-*` classes

## Project Context

This is for a **short film**, not production use. The goal is visual simulation, not real functionality. Upload doesn't persist, messages don't save, stats don't calculate - they're all configured via JSON files for filming needs.
