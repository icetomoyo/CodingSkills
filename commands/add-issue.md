---
description: Add a new issue to KNOWN_ISSUES.md with full control over title, description, priority, and context.
---

# Add Issue Command

This command adds a new issue to the KNOWN_ISSUES.md file with precise details.

## Usage

```
/add-issue [title] -d [description] -p [priority] -c [context]
```

Or simply:
```
/add-issue [title]
```
(Claude will ask for missing details)

## Parameters

| Parameter | Short | Description | Required |
|-----------|-------|-------------|----------|
| title | - | Brief issue title | Yes |
| -d, --description | -d | Detailed description of the problem | Recommended |
| -p, --priority | -p | High, Medium, or Low (default: Medium) | No |
| -c, --context | -c | Where/when the issue occurs | No |
| --auto | -a | Add to auto-tracked section (default: manual) | No |

## Priority Guide

| Priority | When to Use |
|----------|-------------|
| High | Critical/blocking, security issues, data loss risk |
| Medium | Functional issues with workarounds, performance problems |
| Low | Cosmetic issues, technical debt, nice-to-fix |

## Examples

### Basic Usage
```
/add-issue Login button not working on Safari
```
Claude will:
1. Ask for description and context if not provided
2. Confirm priority (default: Medium)
3. Add to KNOWN_ISSUES.md

### Full Specification
```
/add-issue "API rate limiting too aggressive" -d "Users hitting 429 errors after 10 requests per minute" -p High -c "Production environment, affecting paid users"
```

### Quick High Priority
```
/add-issue Database connection leak -p High -d "Connections not being released after queries"
```

### Technical Debt
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

### Step 3: Parse Arguments
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
Find next available M### ID
```

### Step 6: Add Issue
```
Format entry:
#### M###: [Title]
- **Status**: Open
- **Created**: YYYY-MM-DD
- **Description**: [Description]
- **Context**: [Context] (if provided)
- **Proposed Solution**: [Optional]
```

### Step 7: Update Summary
```
Update counts:
- Total Manual: +1
- Open: +1
- Update Highest Priority Open if applicable
```

### Step 8: Write and Confirm
```
Write to the known file path
Confirm to user:
"Added M###: [Title] ([Priority]) to [file path]"
```

## Output Example

```
User: /add-issue "Search results not paginating" -d "Shows all 10000 results on one page" -p Medium

Added to KNOWN_ISSUES.md:

ID: M005
Title: Search results not paginating
Priority: Medium
Status: Open
Created: 2024-01-20

Use /resolve-next-issue to work on this issue.
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

Adding M006: Images not loading on gallery page...
Done!
```

## Related Commands

- `/resolve-next-issue` - Fix the highest priority issue
- `/list-issues` - View all open issues (if available)

## Related Skills

This command works with the `known-issues-tracker` skill located at:
`skills/known-issues-tracker/SKILL.md`
