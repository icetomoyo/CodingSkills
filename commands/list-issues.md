---
description: List all issues from KNOWN_ISSUES.md with optional filtering by status and priority.
---

# List Issues Command

This command displays all issues from KNOWN_ISSUES.md in a readable format.

## Usage

```
/list-issues [options]
```

## Options

| Option | Description |
|--------|-------------|
| --open, -o | Show only open issues (default) |
| --resolved, -r | Show only resolved issues |
| --all, -a | Show all issues |
| --high | Filter to high priority |
| --medium | Filter to medium priority |
| --low | Filter to low priority |

## Examples

### Default (Open Issues)
```
/list-issues
```
Shows all open issues sorted by priority.

### All Issues
```
/list-issues --all
```
Shows both open and resolved issues.

### High Priority Only
```
/list-issues --high
```
Shows only high priority open issues.

### Resolved Issues
```
/list-issues --resolved
```
Shows all resolved issues.

## Output Format

```
=== KNOWN ISSUES ===
Last Updated: 2024-01-20 15:30

--- OPEN ISSUES (5) ---

[HIGH] A001: API returns 500 on /users endpoint
  Created: 2024-01-15
  Description: GET /api/users fails with 500 when query param filter contains special characters

[HIGH] M003: Payment gateway timeout
  Created: 2024-01-18
  Description: Payments fail after 30s timeout on slow connections

[MEDIUM] A002: Search results slow on large datasets
  Created: 2024-01-16
  Description: Search takes 5+ seconds when filtering 100k+ records

[MEDIUM] M004: Dashboard charts not rendering on Firefox
  Created: 2024-01-19
  Description: SVG charts show blank on Firefox 120+

[LOW] M005: Button alignment off by 2px
  Created: 2024-01-20
  Description: Submit button slightly misaligned with input fields

--- RESOLVED ISSUES (2) ---

[MEDIUM] A003: Mobile login button unresponsive (RESOLVED 2024-01-20)
  Resolution: Added touch-action CSS property

[HIGH] M001: Database connection pool exhausted (RESOLVED 2024-01-17)
  Resolution: Increased pool size and added connection timeout

=== SUMMARY ===
Total: 7 | Open: 5 | Resolved: 2
High: 2 | Medium: 2 | Low: 1
Next to resolve: A001 (High priority, oldest)
```

## Workflow

### Step 1: Find KNOWN_ISSUES.md
```
Scan entire project using Glob:
- **/KNOWN_ISSUES.md
- **/known_issues.md
- Check docs/, documentation/, .claude/ directories

If found: Use the found path
If not found: Report "No KNOWN_ISSUES.md found. Use /add-issue to create one first."
```

### Step 2: Read and Parse
```
Read KNOWN_ISSUES.md from the found path
If empty: Report "No issues tracked"
```

### Step 3: Parse and Filter
```
Parse Auto-Tracked issues from table
Parse Manual issues from sections
Apply filters based on options
```

### Step 4: Sort Issues
```
Primary: Status (Open before Resolved)
Secondary: Priority (High > Medium > Low)
Tertiary: Created date (oldest first)
```

### Step 5: Display
```
Format and display issues
Show summary at the end
```

## Quick Stats Mode

```
/list-issues --stats

=== ISSUE STATISTICS ===
Auto-Tracked: 3 (2 Open, 1 Resolved)
Manual: 4 (3 Open, 1 Resolved)

By Priority:
  High:   2 Open, 1 Resolved
  Medium: 2 Open, 0 Resolved
  Low:    1 Open, 0 Resolved

Oldest Open: A001 (5 days)
Highest Priority Open: A001, M003
```

## Related Commands

- `/add-issue` - Add a new issue
- `/resolve-next-issue` - Fix the highest priority issue

## Related Skills

This command works with the `known-issues-tracker` skill located at:
`skills/known-issues-tracker/SKILL.md`
