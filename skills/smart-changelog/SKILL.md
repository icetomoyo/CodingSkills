---
name: smart-changelog
description: Smart changelog management from git history. Auto-activates on "changelog/release/更新日志/版本发布" keywords. Use /smart-changelog for updates, /smart-changelog --release for publishing.
---

# Smart Changelog

Intelligent changelog management: sync from git → update CHANGELOG.md → release with version bump.

## Automatic Activation Triggers

**Keywords:**
- changelog, release, 版本发布, 更新日志
- publish, ship, bump version, 发布
- what's changed, 变更记录

**Example User Messages:**
- "更新一下 changelog"
- "发布一个 patch 版本"
- "生成 release notes"
- "版本号升级到 1.0.0"

---

## Core Workflows

### 1. Sync Changelog (Daily)

**Trigger:** `/smart-changelog` or "更新 changelog"

**Process:**
```
1. Read CHANGELOG.md → Find last synced commit (stored in comment)
2. git log <last-commit>..HEAD → Get new commits
3. Categorize commits (feat/fix/refactor/docs/chore)
4. Append to [Unreleased] section
5. Update last-synced marker
```

**Commit Categories:**
| Prefix | Category |
|--------|----------|
| `feat:`, `feature:` | Added |
| `fix:`, `bugfix:` | Fixed |
| `refactor:`, `change:` | Changed |
| `docs:` | Documentation |
| `perf:` | Performance |
| `test:`, `chore:`, `ci:` | (skip by default) |

### 2. Release Version

**Trigger:** `/smart-changelog --release <type>`

| Type | Example | Description |
|------|---------|-------------|
| `patch` | 0.2.8 → 0.2.9 | Bug fixes, small changes |
| `minor` | 0.2.8 → 0.3.0 | New features, backwards compatible |
| `major` | 0.2.8 → 1.0.0 | Breaking changes |
| `v1.2.0` | → 1.2.0 | Specific version |

**Process:**
```
1. Calculate new version number
2. Sync version to all files (package.json, VERSION, etc.)
3. Move [Unreleased] content to new version section
4. Add release date
5. git add . && git commit -m "chore: release v{version}"
6. git tag v{version}
7. git push && git push --tags
```

---

## CHANGELOG.md Format

```markdown
# Changelog

## [Unreleased]

### Added
- New feature description

### Fixed
- Bug fix description

### Changed
- Change description

---

## [1.0.0] - 2026-03-15

### Added
- Feature A
- Feature B

### Fixed
- Bug C

---

## [0.9.0] - 2026-03-10
...
```

**Format Rules:**
- `[Unreleased]` at top for ongoing changes
- `---` separator between versions
- Categories: Added, Fixed, Changed, Documentation, Performance
- Version format: `[X.Y.Z] - YYYY-MM-DD`
- Last-sync marker: `<!-- last-sync: <commit-hash> -->`

---

## Version Detection

**Priority:**
1. `package.json` → version field
2. `VERSION` file
3. `pyproject.toml` → project.version
4. `Cargo.toml` → package.version
5. Git tag (`git describe --tags --abbrev=0`)

**Files to Sync on Release:**
- `package.json`
- `VERSION` (if exists)
- `pyproject.toml` (if exists)
- `Cargo.toml` (if exists)

---

## Commands Summary

| Command | Action |
|---------|--------|
| `/smart-changelog` | Sync new commits to Unreleased |
| `/smart-changelog --release patch` | Release patch version (0.0.X) |
| `/smart-changelog --release minor` | Release minor version (0.X.0) |
| `/smart-changelog --release major` | Release major version (X.0.0) |
| `/smart-changelog --release v1.2.0` | Release specific version |
| `/smart-changelog --list` | List all versions |

---

## Error Handling

| Scenario | Handling |
|----------|----------|
| No CHANGELOG.md | Create from template |
| No new commits | Inform user, no changes |
| No version files | Use git tags only |
| Uncommitted changes | Ask user before release |
| Push failed | Tag created locally, inform user |

---

## Integration

- Works with **feature-list-tracker** (reference feature IDs)
- Works with **known-issues-tracker** (link fixed issues)
- Works with **git-workflow** (commit/tag/push)
