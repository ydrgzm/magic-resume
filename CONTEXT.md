# Magic Resume

An online resume editor that lets users build, style, and export professional resumes. Users compose a resume from structured Sections, apply a Template for visual presentation, and export as PDF, JSON, or Markdown. All resume data lives in the browser (localStorage); an optional Directory Sync writes copies to a local folder.

## Language

### Core entities

**Resume**:
The central entity — a user's resume document. Identified by a UUID, named with a user-editable title, and associated with one Template. A user may own multiple Resumes.
_Avoid_: document, CV (unless specifically referring to European CV format)

**ResumeData**:
The full serialised state of a Resume, including all Sections, GlobalSettings, and metadata. Persisted to localStorage via Zustand and optionally synced to the filesystem as `{title}.json`.
_Avoid_: resume state, resume object

**Section**:
A named content area within a Resume. Standard Sections are: `basic`, `experience`, `education`, `projects`, `skills`, `selfEvaluation`, `certificates`. Users may also create Custom Sections. Each Section has a visibility flag and a position in the Section Order.
_Avoid_: module, block, component (when referring to content areas)

**Custom Section**:
A user-defined Section with a free-form title and a list of Custom Items. Stored under `customData` keyed by a generated section id.
_Avoid_: extra section, additional section

**Custom Item**:
A single entry within a Custom Section. Has a title, subtitle, date range, and rich-text description.
_Avoid_: custom entry, custom row

**Active Resume**:
The Resume currently open for editing. Tracked as `activeResumeId` / `activeResume` in the store. Operations that mutate Section content always target the Active Resume.
_Avoid_: current resume, selected resume, open resume

### Templates and layout

**Template**:
A visual layout applied to a Resume. Each Template has a unique id (and matching `layout` slug), a color scheme, spacing defaults, and a React component that renders the ResumeData. Selecting a Template copies its default colors and spacing into the Resume's GlobalSettings.
_Avoid_: theme (use Theme for color only), skin, design

**Template Registry**:
The single source of truth listing all available Templates. Adding a new Template requires only adding one entry here.
_Avoid_: template list, template config array

**GlobalSettings**:
Per-Resume styling overrides — font family, font size, theme color, page padding, line height, section spacing, etc. Stored inside ResumeData and mutated independently of Template selection.
_Avoid_: resume settings, style settings, theme settings (partial overlap with Theme)

**Theme**:
Specifically the accent color (`themeColor`) applied uniformly to a Resume's section titles, dividers, and highlights. A subset of GlobalSettings.
_Avoid_: color scheme (use that only when referring to a Template's default palette)

**Section Order**:
The user-controlled sequence of Sections within a Resume, represented as `menuSections` — an ordered array of MenuSection records. The `basic` Section is always pinned first.
_Avoid_: section list, menu order

**MenuSection**:
A record controlling one Section's position, visibility (`enabled`), display title, and icon in the editor sidebar.
_Avoid_: sidebar item, section config

**Auto One Page**:
A GlobalSetting that scales the rendered resume down (max 10%) to fit A4 height. If content exceeds what 90% scale can accommodate, it marks the resume as overflowing but still applies maximum scale.
_Avoid_: fit to page, shrink to fit

### Section content types

**BasicInfo**:
The header Section of a Resume containing identity and contact fields: name, job title, email, phone, location, birth date, photo, and user-defined custom contact fields. Always present; cannot be disabled.
_Avoid_: personal info, header section, contact section

**Experience**:
A structured work-history Section. Each entry has company, position, a freeform date string, and rich-text details. The date is a single string (not start/end fields) to support open-ended values like "2022.03 – Present".
_Avoid_: work experience, job history

**Education**:
A structured academic-history Section. Each entry has school, major, degree, start/end dates, optional GPA, and optional description.
_Avoid_: academic history, schooling

**Project**:
A portfolio item within the Projects Section. Has a name, role, date, rich-text description, and an optional link with label.
_Avoid_: work sample, portfolio item

**Skill**:
Skills are stored as a single rich-text string (`skillContent`) rather than structured items. There is no per-skill level or ordering — the user formats them freely in a rich-text editor.
_Avoid_: skill item, skill entry

**SelfEvaluation**:
A freeform rich-text summary or personal profile statement, stored as `selfEvaluationContent`.
_Avoid_: summary, personal statement, about me

**Certificate**:
An image-based credential entry (diploma, award, etc.) stored as base64 or a URL with a display width percentage. Certificates are displayed in a flex row and sized independently.
_Avoid_: credential, attachment, badge

### AI features

**AI Polish**:
An AI-powered feature that rewrites a selected piece of resume text to improve phrasing and impact. Invoked per field or section entry.
_Avoid_: AI rewrite, AI enhance, AI improve

**Grammar Check**:
An AI-powered feature that scans resume text for grammar errors and suggests corrections, shown in a drawer UI.
_Avoid_: spell check, proofreading (Grammar Check is the canonical name used in routes and hooks)

**AI Provider**:
The external AI service used for AI Polish and Grammar Check. Supported providers: Doubao, DeepSeek, OpenAI (including compatible endpoints), Gemini. All providers require the user to supply their own API key (BYOK).
_Avoid_: AI model (too narrow — a Provider includes endpoint, headers, and model selection)

### Storage and export

**Directory Sync**:
An optional feature that mirrors each Resume to a local filesystem folder as `{title}.json`, using the File System Access API. The directory handle is persisted in IndexedDB. On title rename, the old file is deleted and a new one created.
_Avoid_: file sync, local backup, auto-save (auto-save refers to the debounced write; Directory Sync is the folder feature)

**PDF Export**:
Server-side PDF generation. The client serialises the rendered resume DOM and CSS, sends it to a server endpoint, and downloads the returned PDF blob.
_Avoid_: print, print to PDF (client-side print is a separate path)

**Workbench**:
The full-screen editing view for a single Resume, accessed at `/app/workbench/{id}`. Contains the Edit Panel, the live Preview, and the Preview Dock.
_Avoid_: editor, resume editor (too generic)

**Dashboard**:
The resume management view at `/app/dashboard`, where users create, duplicate, delete, and navigate between Resumes.
_Avoid_: home, resume list

## Example dialogue

> **Dev**: "When the user switches Templates, does that reset their font size?"
>
> **Domain expert**: "Switching a Template copies that Template's default color scheme and spacing into GlobalSettings — so yes, font size (via `baseFontSize`) can be overwritten if the Template defines a `spacing` default that maps to it. But the user can override GlobalSettings independently afterward without changing the Template again."
>
> **Dev**: "And if they rename a Resume while Directory Sync is on — does the old file stick around?"
>
> **Domain expert**: "No. The store detects a title change on the previous Resume, deletes `{old-title}.json` from the sync directory, then writes `{new-title}.json`. If the delete fails silently, a stale file may remain — but that's a known edge case, not intended behaviour."
>
> **Dev**: "What's the difference between a Custom Section and a Project?"
>
> **Domain expert**: "A Project lives in the fixed `projects` array and has a dedicated link field. A Custom Section is user-named and holds Custom Items — same shape (title, subtitle, date range, description) but no link field and no fixed position in the section list. Use Projects for portfolio work; use Custom Sections for anything that doesn't fit a standard section."
