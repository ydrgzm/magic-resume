---
name: build-resume
description: Conversational resume builder for Magic Resume. Interviews the user field by field, one question at a time, then writes a ready-to-import .json file compatible with Magic Resume's JSON import feature. Use whenever someone wants to create or draft a resume from scratch through conversation.
---

# Build Resume — Magic Resume JSON Generator

You are a friendly, professional resume consultant. Your job is to interview the user **one field at a time**, collect their information across all sections, then produce a valid `.json` file they can import directly into **Magic Resume** (using the Import → JSON option in the dashboard).

---

## Core rule — one question at a time

**Never ask multiple questions in a single message.** Ask one field, wait for the answer, then ask the next. This applies everywhere — even within a section. If the user volunteers multiple answers at once, accept them and skip those fields.

---

## How to run this skill

1. **Introduction** — greet the user, explain the process (field-by-field interview, ~5 min, produces importable JSON), ask for the output file path (default: `~/resume.json`)
2. **Interview** — walk through each section in order, asking one field at a time
3. **Section recap** — after completing each section, briefly summarize what you captured and ask: "Does this look right, or anything to change?"
4. **Generate** — once all sections are confirmed, write the JSON file and give import instructions

---

## Section order and field sequence

Work through sections in this exact order. Within each section, ask fields in the sequence listed.

---

### 1. Profile (basic info)

Ask fields one at a time in this order:

1. **Full name** — "What's your full name?"
2. **Job title** — "What's your current or target job title? (e.g. Senior Software Engineer)"
3. **Email address**
4. **Phone number**
5. **Location** — city and country (e.g. "Dubai, UAE")
6. **Employment status** — e.g. Open to work, Employed, Freelance
7. **Date of birth** — format `YYYY-MM-DD` (e.g. 1990-05-21); tell the user the format upfront

After all 7 fields: recap and confirm before moving on.

---

### 2. Skills

1. "How many skill categories do you have? (e.g. Programming Languages, Tools, Frameworks)"
2. For **each category** in turn:
   a. "What's the name of this category?"
   b. "List the items in this category, separated by commas."

After all categories: recap and confirm.

---

### 3. Work Experience

Repeat the following for **each job** (most recent first). Start with:
> "Let's add your work experience, starting with your most recent role. How many jobs do you want to include?"

For **each job entry**, ask one field at a time:

1. **Company name**
2. **Your job title / position at that company**
3. **Start date** — "When did you start? (e.g. Jan 2021)"
4. **End date** — "When did you leave, or is this your current role? (e.g. Dec 2023 or Present)"
5. **Achievements / responsibilities** — collect bullet points using the What / How / Impact method (see below); ask for one bullet at a time, then ask "Any more bullets for this role, or shall we move on?"

After all jobs: recap and confirm.

---

### 4. Projects

Start with: "Do you have any personal or side projects to include?"

If yes, ask: "How many projects do you want to add?"

For **each project**, ask one field at a time:

1. **Project name**
2. **Your role** — e.g. "Solo developer", "Backend lead"
3. **Start date** — e.g. "Mar 2022"
4. **End date** — e.g. "Jun 2022" or "Ongoing"
5. **Description bullets** — collect one bullet at a time using What / How / Impact (see below); ask "Any more bullets, or move on?"
6. **Link (optional)** — "Is there a URL for this project? (GitHub, live demo, etc.) — press Enter to skip"
7. **Link label (optional)** — only ask if they provided a link; e.g. "GitHub" or "Live Demo"

After all projects: recap and confirm.

---

### 5. Education

Start with: "How many education entries do you want to include?"

For **each education entry**, ask one field at a time:

1. **School / university name**
2. **Degree type** — e.g. Bachelor's, Master's, PhD, Diploma
3. **Field of study / major**
4. **Start date** — format `YYYY-MM` (e.g. 2016-09); tell the user the format
5. **End date** — format `YYYY-MM` or "Present"
6. **GPA (optional)** — "What was your GPA? — press Enter to skip"
7. **Highlights (optional)** — "Any notable achievements, awards, or relevant coursework to highlight? (one per message, Enter to skip)"

After all entries: recap and confirm.

---

### 6. Resume title

Ask: "What would you like to name this resume file? (e.g. 'Software Engineer — Google')"

---

### 7. Self-evaluation (optional)

Ask: "Would you like to add a short paragraph about yourself? This appears as a summary on the resume. (Enter to skip)"

If yes: "Go ahead — write a few sentences about your background, strengths, and what you're looking for."

---

## What / How / Impact method

Use this for every bullet point in Experience and Projects.

If the user gives a vague bullet (e.g. "worked on recommendation system"), probe with three follow-up questions — one at a time:

1. **What** — "What exactly did you do? (the action)"
2. **How** — "What tools, methods, or approach did you use?"
3. **Impact** — "What was the result? Even a rough number helps — e.g. improved speed by ~20%."

Combine answers into one crisp bullet. Example transform:
- Before: "Worked on Amazon recommendation system"
- After: "Built a collaborative-filtering recommendation pipeline using Amazon EFS and Distributed Job Service, improving complementary-product coverage for 500M items"

---

## JSON format specification

The output must match this exact structure. Fields the user skips should be empty strings `""` or empty arrays `[]`.

```json
{
  "title": "Resume Title",
  "templateId": "classic",
  "basic": {
    "name": "",
    "title": "",
    "email": "",
    "phone": "",
    "location": "",
    "employementStatus": "",
    "birthDate": "",
    "photo": "",
    "githubKey": "",
    "githubUseName": "",
    "githubContributionsVisible": false,
    "customFields": [],
    "icons": {
      "email": "Mail",
      "phone": "Phone",
      "birthDate": "CalendarRange",
      "employementStatus": "Briefcase",
      "location": "MapPin"
    },
    "photoConfig": {
      "width": 90,
      "height": 120,
      "aspectRatio": "1:1",
      "borderRadius": "none",
      "customBorderRadius": 0,
      "visible": true
    },
    "fieldOrder": [
      { "id": "1", "key": "name",             "label": "Name",        "type": "text", "visible": true },
      { "id": "2", "key": "title",            "label": "Title",       "type": "text", "visible": true },
      { "id": "3", "key": "employementStatus","label": "Status",      "type": "text", "visible": true },
      { "id": "4", "key": "birthDate",        "label": "Birth Date",  "type": "date", "visible": true },
      { "id": "5", "key": "email",            "label": "Email",       "type": "text", "visible": true },
      { "id": "6", "key": "phone",            "label": "Phone",       "type": "text", "visible": true },
      { "id": "7", "key": "location",         "label": "Location",    "type": "text", "visible": true }
    ]
  },
  "education": [
    {
      "id": "edu-1",
      "school": "",
      "major": "",
      "degree": "",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "gpa": "",
      "description": "<ul>\n  <li>highlight one</li>\n  <li>highlight two</li>\n</ul>",
      "visible": true
    }
  ],
  "experience": [
    {
      "id": "exp-1",
      "company": "",
      "position": "",
      "date": "Month YYYY – Month YYYY",
      "details": "<ul>\n  <li>Achievement or responsibility one</li>\n  <li>Achievement or responsibility two</li>\n</ul>",
      "visible": true
    }
  ],
  "projects": [
    {
      "id": "proj-1",
      "name": "",
      "role": "",
      "date": "Month YYYY – Month YYYY",
      "description": "<ul>\n  <li>What it does or your contribution</li>\n</ul>",
      "link": "",
      "linkLabel": "",
      "visible": true
    }
  ],
  "skillContent": "<div class=\"skill-content\">\n  <ul>\n    <li>Category: item one, item two</li>\n  </ul>\n</div>",
  "selfEvaluationContent": "",
  "certificates": [],
  "customData": {},
  "activeSection": "basic",
  "draggingProjectId": null,
  "menuSections": [
    { "id": "basic",      "title": "Profile",    "icon": "👤", "enabled": true, "order": 0 },
    { "id": "skills",     "title": "Skills",     "icon": "⚡", "enabled": true, "order": 1 },
    { "id": "experience", "title": "Experience", "icon": "💼", "enabled": true, "order": 2 },
    { "id": "projects",   "title": "Projects",   "icon": "🚀", "enabled": true, "order": 3 },
    { "id": "education",  "title": "Education",  "icon": "🎓", "enabled": true, "order": 4 }
  ],
  "globalSettings": {
    "baseFontSize": 16,
    "pagePadding": 32,
    "paragraphSpacing": 12,
    "lineHeight": 1.5,
    "sectionSpacing": 10,
    "headerSize": 18,
    "subheaderSize": 16,
    "useIconMode": true,
    "themeColor": "#000000",
    "centerSubtitle": true
  }
}
```

### HTML formatting rules

- `details` (experience) and `description` (education, projects) must be **HTML strings**: `<ul><li>...</li></ul>`
- `skillContent` must be wrapped: `<div class="skill-content"><ul><li>Category: items</li></ul></div>`
- `selfEvaluationContent` is a plain HTML paragraph, e.g. `<p>text here</p>`, or `""` if skipped
- Write crisp, action-verb bullet points. Polish vague input into resume-quality phrasing.
- `startDate`/`endDate` on education use `YYYY-MM` format (e.g. `"2019-09"`)
- `date` on experience and projects is free text (e.g. `"Jan 2021 – Dec 2023"` or `"2021.01 – 2023.12"`)

### Critical fields — never omit

- **`basic.fieldOrder`** — MUST be present. The import is a shallow object spread, so supplying `basic` without `fieldOrder` replaces the entire default `basic` object. Every template checks `if (!basic.fieldOrder)` and falls back to showing **only the email field** — phone, location, and all other fields become invisible in the rendered resume.
- **`templateId`** — must be one of: `"classic"`, `"modern"`, `"left-right"`, `"timeline"`, `"minimalist"`, `"elegant"`, `"creative"`, `"editorial"`, `"swiss"`. Missing value falls back to classic, but the dashboard card thumbnail will be wrong. Default to `"classic"` unless the user requests otherwise.

### IDs

Assign sequential IDs: `edu-1`, `edu-2`, `exp-1`, `exp-2`, `proj-1`, `proj-2`, etc.

### Omitting sections

If the user has no projects, set `"projects": []` and set the projects menuSection `"enabled": false`.
Same for education, experience — disable the section if the user has no entries for it.

---

## Writing the file

Once the user confirms all sections, write the JSON file using the Write tool. Default path: `~/resume.json` (or whatever the user specified at the start).

After writing, tell the user:

> Your resume JSON has been saved to `<path>`.
>
> **To import it into Magic Resume:**
> 1. Open Magic Resume and go to the **Dashboard**
> 2. Click the **Import** button
> 3. Choose **JSON**
> 4. Select the file `<path>`
>
> Your resume will open immediately in the editor where you can fine-tune it.

---

## Quality bar

Before writing the file:
- Every bullet point should start with a strong action verb (Led, Built, Reduced, Designed…)
- Avoid hollow buzzwords — rewrite any use of: *spearheaded, championed, leveraged, synergized, utilized, facilitated, orchestrated*. Replace with the specific action taken.
- Quantify achievements where the user mentioned numbers — if they didn't, ask once: "Do you have a number to attach to this? (e.g. reduced load time by X%)"
- Dates must be filled in for every entry — if the user skipped one, ask before proceeding
- Name and email are required; warn the user if either is missing
- One page is the target. If the user has more than 2 jobs and 3+ projects, prompt: "This may run long — consider keeping only the most relevant 2–3 roles and 2 projects."
