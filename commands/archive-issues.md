---
description: Archive resolved issues from KNOWN_ISSUES.md to ISSUES_ARCHIVED.md to reduce file size and optimize LLM context usage.
---

# Archive Issues Command

This command moves resolved issues from KNOWN_ISSUES.md to ISSUES_ARCHIVED.md to keep the main file manageable.

## Usage

```
/archive-issues [options]
```

## Options

| Option | Description |
|--------|-------------|
| `--all`, `-a` | Archive ALL resolved issues (default) |
| `--days N`, `-d N` | Only archive issues resolved more than N days ago |
| `--keep N`, `-k N` | Keep last N resolved issues in main file |
| `--dry-run` | Show what would be archived without actually doing it |

## Examples

### Archive All Resolved Issues
```
/archive-issues
```
Moves all resolved issues to ISSUES_ARCHIVED.md.

### Archive Old Issues Only
```
/archive-issues --days 30
```
Only archives issues resolved more than 30 days ago.

### Keep Recent Issues
```
/archive-issues --keep 5
```
Archives all but the 5 most recently resolved issues.

### Preview Without Archiving
```
/archive-issues --dry-run
```
Shows what would be archived without making changes.

## Workflow

### Step 1: Find KNOWN_ISSUES.md
```
Scan project for KNOWN_ISSUES.md
If not found: Report error and exit
```

### Step 2: Parse Resolved Issues
```
Extract all issues with Status: Resolved
For each resolved issue:
  - Parse full details from Issue Details section
  - Record resolution date
```

### Step 3: Apply Filters
```
If --days N: Filter issues resolved > N days ago
If --keep N: Exclude N most recently resolved issues
If --all: Include all resolved issues
```

### Step 4: Check ISSUES_ARCHIVED.md
```
If exists: Read current content
If not exists: Create with template
```

### Step 5: Append to Archive
```
Group archived issues by month/year:
## YYYY-MM Archived Issues

### [ID]: [Title] (RESOLVED YYYY-MM-DD)
[Full issue details preserved]
```

### Step 6: Update KNOWN_ISSUES.md
```
1. Remove archived issues from Issue Index table
2. Remove archived issues from Issue Details section
3. Update Summary counts
4. Add archive note:
   > X issues archived to ISSUES_ARCHIVED.md on YYYY-MM-DD
5. Write updated file
```

### Step 7: Confirm
```
Report:
- X issues archived
- Y issues remaining in KNOWN_ISSUES.md
- File size reduced from A to B
```

## Archive File Structure

```markdown
# Archived Issues

_Last Updated: YYYY-MM-DD_

---

## 2024-01 Archived Issues

### A001: Mobile login button unresponsive (RESOLVED 2024-01-15)
- **Type**: Auto-Tracked
- **Priority**: High
- **Status**: Resolved
- **Created**: 2024-01-10
- **Original Problem**: Touch event not firing on iOS Safari...
- **Resolution**: Added touch-action: manipulation...
- **Resolution Date**: 2024-01-15
- **Files Changed**: src/components/Button.styles.ts

### M003: Database timeout on large queries (RESOLVED 2024-01-20)
...

---

## 2024-02 Archived Issues

### A005: Memory leak in websocket handler (RESOLVED 2024-02-05)
...

---

## Summary
- Total Archived: X issues
- Archive Started: YYYY-MM-DD
- Last Archived: YYYY-MM-DD
```

## When to Archive

**Automatic triggers** (suggested):
- File size > 50KB or > 2000 lines
- More than 20 resolved issues in file

**Manual triggers**:
- Before starting a major feature (clean slate)
- After completing a sprint/milestone
- When context window is a concern
- Monthly maintenance

## Important Notes

1. **Open issues are NEVER archived** - Only resolved issues
2. **Full details are preserved** - No information is lost
3. **Archive file can be searched** - Historical issues remain accessible
4. **Reversible** - Issues can be moved back if needed (manual edit)

## Example Output

```
=== ARCHIVE ISSUES ===

Scanning KNOWN_ISSUES.md...
- Found: 45 issues total
- Open: 12 issues
- Resolved: 33 issues

Applying filters: --days 30
- Issues resolved > 30 days ago: 25 issues
- Issues resolved within 30 days: 8 issues (will keep)

Archiving 25 issues to ISSUES_ARCHIVED.md...

Updating KNOWN_ISSUES.md...
- Removed 25 issues from Issue Index
- Removed 25 issues from Issue Details
- Updated Summary

=== RESULT ===
Archived: 25 issues to ISSUES_ARCHIVED.md
Remaining in KNOWN_ISSUES.md:
  - Open: 12 issues
  - Resolved (recent): 8 issues
  - Total: 20 issues

File size: 85KB → 32KB (62% reduction)
```

## Related Commands

- `/list-issues` - View issues before archiving
- `/add-issue` - Add new issues
- `/resolve-next-issue` - Resolve issues

## Related Skills

This command works with the `known-issues-tracker` skill located at:
`skills/known-issues-tracker/SKILL.md`
