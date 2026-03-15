---
name: smart-changelog
description: Manage CHANGELOG.md from git history. Auto-activates on "changelog/release/tag/更新日志/版本发布/打tag" keywords. Use /smart-changelog for updates, /smart-changelog --release for publishing.
argument-hint: "[--release] [patch|minor|major|vX.Y.Z]"
---

# Smart Changelog

Intelligent CHANGELOG management: sync git commits → update CHANGELOG.md → optional version bump & release.

## Automatic Activation

Claude loads this skill when you mention:
- changelog, release, tag, 版本发布, 更新日志, 打tag
- publish, ship, bump version, 发布
- what's changed, 变更记录

**Both natural language and `/smart-changelog` command work identically.**

---

## Usage Patterns

### Pattern 1: Sync Only (Daily Updates)

**Triggers:**
- `/smart-changelog`
- "更新 changelog"
- "同步 changelog"
- "生成 release notes"

**Workflow:**
1. Read CHANGELOG.md → find last synced commit
2. `git log <last-commit>..HEAD` → get new commits
3. Categorize and append to [Unreleased]
4. Update sync marker
5. Commit and push

### Pattern 2: Version Release

**Triggers:**
- `/smart-changelog --release`
- `/smart-changelog --release patch`
- `/smart-changelog --release minor`
- `/smart-changelog --release major`
- `/smart-changelog --release v1.2.0`
- "发布新版本"
- "发布一个 patch 版本"
- "打 tag 发布"

**Workflow:**
1. Calculate/confirm version number
2. Ask which steps to execute
3. Perform selected operations

---

## Release Step Selection

When releasing, ask the user to select steps:

```
📊 Release Options

Select steps to execute:

[1] ✅ Update CHANGELOG.md (required)
[2] ⬜ Sync version to project files
[3] ⬜ Create Git Tag
[4] ⬜ Push commits and tags
[5] ⬜ Create GitHub Release
[6] ⬜ Update documentation (README, docs/, etc.)

Enter options (e.g., 1,2,3,4,5,6 or all):
```

### Smart Defaults

If user intent is clear, skip selection:

| User Says / Arguments | Steps |
|----------------------|-------|
| "更新 changelog" | 1,4 |
| "更新版本号" | 1,2,4 |
| "打 tag 发布" | 1,2,3,4 |
| "完整发布" | 1,2,3,4,5,6 |
| `--release` (no type) | Ask selection |
| `--release patch/minor/major` | Ask selection |

---

## Core Workflows

### Step 1: Version Confirmation (Required for Version Sync)

```
1. Detect current version
2. Calculate new version (patch/minor/major or specific)
3. ⚠️ ASK USER: "Confirm release version X.Y.Z?"
   - Confirmed → Continue
   - Rejected → Ask for specific version or abort
4. Never proceed without user confirmation
```

### Step 2: Monorepo Detection (For Version Sync)

**Detection Indicators:**
- `pnpm-workspace.yaml`
- `lerna.json` / `lerna-lite.json`
- `nx.json`
- `turbo.json`
- `packages/` directory
- `workspaces` field in package.json

**Version Strategy Selection:**
```
Monorepo detected. Select version update strategy:

1. Unified version - All packages to same version
2. Independent version - Only changed packages
3. Selective update - Manually select packages
4. Root only - Only update root package.json

Select [1-4]:
```

### Step 3: Version Sync

**Standard Files:**
- `package.json` → version
- `VERSION` file
- `pyproject.toml` → project.version
- `Cargo.toml` → package.version

**Monorepo Additional:**
- `packages/*/package.json`
- `apps/*/package.json`
- `libs/*/package.json`
- `lerna.json`

### Step 4: Update CHANGELOG

1. Move [Unreleased] content to new version section
2. Add release date
3. Clean empty categories
4. Ensure proper formatting

### Step 5: Update Documentation

**Files to Check:**
- `README.md` - installation instructions, version badges
- `docs/` directory - API docs, examples
- `CONTRIBUTING.md`

**Ask User:**
```
These documentation files may contain outdated version info:
- README.md
- docs/api.md

Update version references? [Yes/No/Select]
```

### Step 6: Git Operations

```bash
git add .
git commit -m "chore: release v{version}

- Update version to {version}
- Update CHANGELOG.md
- Update documentation"

git tag v{version}
git push origin <branch>
git push origin v{version}
```

### Step 7: GitHub Release

```bash
gh release create v{version} \
  --title "v{version}" \
  --notes "## What's Changed

### Added
- ...

### Fixed
- ..."
```

If `gh` CLI unavailable, provide manual instructions.

---

## Commit Categories

| Prefix | Category |
|--------|----------|
| `feat:`, `feature:` | Added |
| `fix:`, `bugfix:` | Fixed |
| `refactor:`, `change:` | Changed |
| `docs:` | Documentation |
| `perf:` | Performance |
| `test:`, `chore:`, `ci:` | Skip |

---

## CHANGELOG.md Format

```markdown
# Changelog

## [Unreleased]

### Added
- New feature

### Fixed
- Bug fix

---

## [1.0.0] - 2026-03-15

### Added
- Feature A

### Fixed
- Bug C

---

## [0.9.0] - 2026-03-10
...
```

**Format Rules:**
- `[Unreleased]` at top
- `---` between versions
- Categories: Added, Fixed, Changed, Documentation, Performance
- Version format: `[X.Y.Z] - YYYY-MM-DD`
- Sync marker: `<!-- last-sync: <commit-hash> -->`

---

## Version Detection Priority

1. `package.json` → version
2. `VERSION` file
3. `pyproject.toml` → project.version
4. `Cargo.toml` → package.version
5. Git tag (`git describe --tags --abbrev=0`)

---

## Error Handling

| Scenario | Handling |
|----------|----------|
| No CHANGELOG.md | Create from template |
| No new commits | Inform user, no changes |
| User rejects version | Ask for specific version or abort |
| Unclean working directory | Ask before continuing |
| Push failed | Tag created locally, inform user |
| `gh` CLI unavailable | Provide manual release instructions |
| Monorepo detection failed | Default to single package |

---

## Examples

```
User: 更新 changelog
→ Update CHANGELOG only, then push

User: 发布一个 patch 版本
→ Ask release options

User: 完整发布 minor 版本
→ Execute all release steps

User: /smart-changelog --release patch
→ Ask release options (same as "发布一个 patch 版本")

User: 更新版本号并打 tag
→ CHANGELOG + version sync + tag + push

User: 打 tag 发布
→ CHANGELOG + version sync + tag + push
```

---

## Integration

- **feature-list-tracker** - Reference feature IDs
- **known-issues-tracker** - Link fixed issues
- **git-workflow** - commit/tag/push
- **doc-updater** - Update documentation
