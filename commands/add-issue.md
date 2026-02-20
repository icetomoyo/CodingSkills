---
description: Add a new issue to KNOWN_ISSUES.md with full control over title, description, priority, and context. Accepts text input or file paths containing issue descriptions.
---

# Add Issue Command

This command adds a new issue to the KNOWN_ISSUES.md file with precise details. It can accept direct text input or read issue descriptions from files.

## Usage

### Text Input
```
/add-issue [title] -d [description] -p [priority] -c [context]
```

### File Input
```
/add-issue -f [filepath] -p [priority]
```

### Interactive Mode
```
/add-issue [title]
```
(Claude will ask for missing details)

## Parameters

| Parameter | Short | Description | Required |
|-----------|-------|-------------|----------|
| title | - | Brief issue title | Yes (unless -f is used) |
| -d, --description | -d | Detailed description of the problem | Recommended |
| -p, --priority | -p | High, Medium, or Low (default: Medium) | No |
| -c, --context | -c | Where/when the issue occurs | No |
| -f, --file | -f | Path to file containing issue description | No |

## Priority Guide

| Priority | When to Use |
|----------|-------------|
| High | Critical/blocking, security issues, data loss risk |
| Medium | Functional issues with workarounds, performance problems |
| Low | Cosmetic issues, technical debt, nice-to-fix |

## File Input Mode

When using `-f` or `--file`, Claude will:

1. **Read the specified file** using the Read tool
2. **Parse and structure the content** into a proper issue format:
   - Extract or generate a title
   - Identify the problem description
   - Find relevant context clues
   - Suggest priority if not specified
3. **Enhance the description** with:
   - Clear problem statement
   - Expected vs actual behavior (if inferable)
   - Reproduction steps (if mentioned)
   - Additional context from file content

### File Format Support

The file can be in various formats:
- **Plain text**: Free-form notes
- **Markdown**: Structured notes with headers
- **Code comments**: Error logs, stack traces, or commented issues

Claude will intelligently parse and structure the content.

## Examples

### File Input (Plain Text Notes)
```
/add-issue -f ./notes/login-bug.txt
```
Claude reads the file, parses the content, and structures it into a complete issue entry.

### File Input with Priority
```
/add-issue -f ./notes/critical-error.log -p High
```

### File Input (Markdown Notes)
```
/add-issue -f ./docs/bugs/api-timeout.md
```

### Text Input - Basic Usage
```
/add-issue Login button not working on Safari
```
Claude will:
1. Ask for description and context if not provided
2. Confirm priority (default: Medium)
3. Add to KNOWN_ISSUES.md

### Text Input - Full Specification
```
/add-issue "API rate limiting too aggressive" -d "Users hitting 429 errors after 10 requests per minute" -p High -c "Production environment, affecting paid users"
```

### Text Input - Quick High Priority
```
/add-issue Database connection leak -p High -d "Connections not being released after queries"
```

### Text Input - Technical Debt
```
/add-issue Refactor legacy auth module -p Low -d "Uses deprecated crypto functions, should migrate to modern approach"
```

## Workflow

### Step 1: Scan for KNOWN_ISSUES.md
```
Search entire project using Glob:
- **/KNOWN_ISSUES.md
- **/known_issues.md
- Check docs/, documentation/, .claude/ directories explicitly

If found: Remember the path and proceed to Step 3
If not found: Proceed to Step 2
```

### Step 2: Ask User for File Location (if not found)
```
Ask user:
"KNOWN_ISSUES.md not found. Where should I create it?
1. docs/KNOWN_ISSUES.md (recommended for project documentation)
2. .claude/KNOWN_ISSUES.md (keeps it private to Claude Code)

Reply 1 or 2, or specify a custom path."

If user chooses "1" or "docs": Create at docs/KNOWN_ISSUES.md
If user chooses "2" or ".claude": Create at .claude/KNOWN_ISSUES.md
If user specifies custom path: Use that path
If no response: Default to .claude/KNOWN_ISSUES.md

Create directory if needed (docs/ or .claude/)
Initialize with empty template (see skill documentation)
```

### Step 3: Process Input (Text or File)

#### If File Parameter Provided (-f, --file):
```
1. Read the specified file using Read tool
2. Parse file content to extract:
   - Title (from first line, heading, or generate from content)
   - Problem description (main content)
   - Context clues (file paths, error messages, timestamps)
   - Suggested priority (based on keywords like "critical", "minor")
3. If priority not specified: Suggest based on content analysis
4. Show parsed issue to user for confirmation:
   "I found this issue in [filename]:
   Title: [extracted title]
   Description: [extracted description]
   Context: [extracted context]
   Priority: [suggested priority]

   Does this look correct? (Y/n)"
5. Proceed with confirmed/adjusted values
```

#### If Text Parameters Provided:
```
Extract: title, description, priority, context
If title missing: Ask user
If description missing: Ask user or infer from title
Priority default: Medium
```

### Step 4: Validate Priority
```
Must be: High, Medium, or Low (case-insensitive)
If invalid: Default to Medium and notify user
```

### Step 5: Read KNOWN_ISSUES.md
```
Read current content from the known path
Find next available sequential ID (001, 002, etc.)
```

### Step 6: Add Issue (BOTH sections required)

```
1. Add to Issue Index table:
| ### | [Priority] | Open | [Title] | YYYY-MM-DD | - |

2. Add to Issue Details section:
### ###: [Title]
- **Priority**: High / Medium / Low
- **Status**: Open
- **Created**: YYYY-MM-DD
- **Original Problem**:
  - Current behavior: [What's happening now]
  - Expected behavior: [What should happen]
  - Steps to reproduce: [If known]
- **Context**: [Where/when this occurs]
- **Root Cause**: [If known]
- **Proposed Solution**: [Optional]
```

### Step 7: Update Summary
```
Update counts:
- Total: +1
- Open: +1
- Update Highest Priority Open if applicable
```

### Step 8: Write and Confirm
```
Write to the known file path
Confirm to user:
"Added ###: [Title] ([Priority]) to [file path]"
```

## Output Example

### Text Input Example
```
User: /add-issue "Search results not paginating" -d "Shows all 10000 results on one page, causing browser to freeze" -p Medium -c "Gallery page when viewing all items"

Added to KNOWN_ISSUES.md:

Issue Index:
| 005 | Medium | Open | Search results not paginating | 2024-01-20 | - |

Issue Details:
### 005: Search results not paginating
- **Priority**: Medium
- **Status**: Open
- **Created**: 2024-01-20
- **Original Problem**:
  - Gallery page shows all 10000 results on a single page
  - This causes browser to freeze and become unresponsive
  - Expected: Results should be paginated (e.g., 20 per page)
- **Context**: Gallery page when viewing all items
- **Proposed Solution**: Implement server-side pagination with 20 items per page

Use /resolve-next-issue to work on this issue.
```

### File Input Example
```
User: /add-issue -f ./notes/bug-report.txt

Reading file: ./notes/bug-report.txt
---
Found this content:
"Login sometimes fails on mobile. Happens when user has special
characters in password. Users report getting 'Invalid credentials'
even with correct password. Affects about 5% of mobile logins.
Seen on iOS Safari and Android Chrome."
---

Parsed Issue:
Title: Login fails with special characters in password on mobile
Description: Users with special characters in their passwords receive 'Invalid credentials' error even when entering correct credentials
Context: Mobile browsers (iOS Safari, Android Chrome), affects ~5% of mobile logins
Suggested Priority: High (login functionality broken for some users)

Add this issue? (Y/n/edit): Y

Added 006: Login fails with special characters in password on mobile (High)
```

## Interactive Mode

If user provides only title or incomplete info:

```
User: /add-issue Something wrong with images

Claude: I'll add this issue. Please provide more details:

1. Description: What's wrong with the images?
   [User: Images not loading on production]

2. Context: Where does this happen?
   [User: Only on the gallery page, works locally]

3. Priority: High, Medium, or Low?
   [User: High]

Adding 006: Images not loading on gallery page...
Done!
```

## Related Commands

- `/resolve-next-issue` - Fix the highest priority issue
- `/list-issues` - View all open issues (if available)

## Related Skills

This command works with the `known-issues-tracker` skill located at:
`skills/known-issues-tracker/SKILL.md`
