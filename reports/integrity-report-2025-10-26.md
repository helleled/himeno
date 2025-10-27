# Misskey Repository Integrity Report

**Generated**: 2025-10-26T10:55:40.657Z
**Report Date**: 2025-10-26

## Overview

This report provides a comprehensive summary of repository health, including dependency integrity, static analysis, build verification, testing, database migrations, and security audits.

- **Total Checks**: 14
- **Passed**: ✅ 2
- **Failed**: ❌ 6
- **Partial**: ⚠️ 4
- **Skipped**: ⏭️ 2

## Environment

### Git Information

- **Branch**: `develop`
- **Commit**: `de0a360cc82bfcc048c7ebc74dfa070de07400ad`
- **Commit Date**: 2025-10-26 14:35:21 +0900
- **Last Commit**: Merge pull request #8 from helleled/chore/draft-integrity-report
- **Author**: helleled
- **Uncommitted Changes**: 3 files

### System Information

- **OS**: Linux 6.17.4-arch2-1
- **Architecture**: x86_64
- **Hostname**: aa73d15a7f1a

### Tool Versions

- **Node.js**: v22.15.0
- **pnpm**: 10.18.2

### Service Versions

- **PostgreSQL**: N/A
- **Redis**: N/A
- **ffmpeg**: 

## Check Results Summary

| Check | Status | Duration | Log File |
|-------|--------|----------|----------|
| 00-environment | ⚠️ PARTIAL | N/A | [00-environment.log](integrity-logs/00-environment.log) |
| Dependency Installation | ⚠️ PARTIAL | N/A | [01-dependency-install.log](integrity-logs/01-dependency-install.log) |
| Security Audit | ⏭️ SKIPPED | N/A | [02-pnpm-audit.log](integrity-logs/02-pnpm-audit.log) |
| Environment Health Check | ⏭️ SKIPPED | N/A | [03-pnpm-doctor.log](integrity-logs/03-pnpm-doctor.log) |
| Type Checking | ❌ FAILED | N/A | [04-typecheck.log](integrity-logs/04-typecheck.log) |
| Linting | ❌ FAILED | N/A | [05-lint.log](integrity-logs/05-lint.log) |
| Build Process | ✅ PASSED | N/A | [06-build.log](integrity-logs/06-build.log) |
| Service Connectivity | ⚠️ PARTIAL | N/A | [07-connectivity.log](integrity-logs/07-connectivity.log) |
| Database Migrations | ⚠️ PARTIAL | N/A | [08-migrations.log](integrity-logs/08-migrations.log) |
| 09-backend-unit-tests | ❌ FAILED | 30.314s | [09-backend-unit-tests.log](integrity-logs/09-backend-unit-tests.log) |
| Frontend Tests | ❌ FAILED | N/A | [10-frontend-tests.log](integrity-logs/10-frontend-tests.log) |
| SDK Tests | ✅ PASSED | N/A | [11-sdk-tests.log](integrity-logs/11-sdk-tests.log) |
| E2E Tests | ❌ FAILED | N/A | [12-backend-e2e-tests.log](integrity-logs/12-backend-e2e-tests.log) |
| Cypress Tests | ❌ FAILED | N/A | [13-cypress-tests.log](integrity-logs/13-cypress-tests.log) |

## Dependency Integrity

### ⚠️ Dependency Installation

- **Status**: PARTIAL
- **Duration**: N/A
- **Log**: [01-dependency-install.log](integrity-logs/01-dependency-install.log) (137 B)

### ⏭️ Environment Health Check

- **Status**: SKIPPED
- **Duration**: N/A
- **Log**: [03-pnpm-doctor.log](integrity-logs/03-pnpm-doctor.log) (N/A)

## Static Analysis

### ❌ Type Checking

- **Status**: FAILED
- **Duration**: N/A
- **Log**: [04-typecheck.log](integrity-logs/04-typecheck.log) (13.85 KB)

**Errors/Warnings**:
```
packages/backend typecheck: test/e2e/note-edit.ts(32,32): error TS2339: Property 'updatedNote' does not exist on type '{ createdNote: { id: string; createdAt: string; updatedAt?: string | null | undefined; deletedAt?: string | null | undefined; text: string | null; cw?: string | null | undefined; userId: string; ... 28 more ...; myReaction?: string | ... 1 more ... | undefined; }; }'.
packages/backend typecheck: test/e2e/note-edit.ts(33,23): error TS2339: Property 'updatedNote' does not exist on type '{ createdNote: { id: string; createdAt: string; updatedAt?: string | null | undefined; deletedAt?: string | null | undefined; text: string | null; cw?: string | null | undefined; userId: string; ... 28 more ...; myReaction?: string | ... 1 more ... | undefined; }; }'.
packages/backend typecheck: test/e2e/note-edit.ts(67,32): error TS2339: Property 'isEdited' does not exist on type '{ id: string; createdAt: string; updatedAt?: string | null | undefined; deletedAt?: string | null | undefined; text: string | null; cw?: string | null | undefined; userId: string; user: { id: string; ... 14 more ...; badgeRoles?: { ...; }[] | undefined; }; ... 27 more ...; myReaction?: string | ... 1 more ... | unde...'.
packages/backend typecheck: test/e2e/note-edit.ts(68,23): error TS2339: Property 'editCount' does not exist on type '{ id: string; createdAt: string; updatedAt?: string | null | undefined; deletedAt?: string | null | undefined; text: string | null; cw?: string | null | undefined; userId: string; user: { id: string; ... 14 more ...; badgeRoles?: { ...; }[] | undefined; }; ... 27 more ...; myReaction?: string | ... 1 more ... | unde...'.
packages/backend typecheck: test/e2e/note-edit.ts(69,23): error TS2339: Property 'latestEditedAt' does not exist on type '{ id: string; createdAt: string; updatedAt?: string | null | undefined; deletedAt?: string | null | undefined; text: string | null; cw?: string | null | undefined; userId: string; user: { id: string; ... 14 more ...; badgeRoles?: { ...; }[] | undefined; }; ... 27 more ...; myReaction?: string | ... 1 more ... | unde...'.
```

### ❌ Linting

- **Status**: FAILED
- **Duration**: N/A
- **Log**: [05-lint.log](integrity-logs/05-lint.log) (18.38 KB)

**Errors/Warnings**:
```
packages/icons-subsetter lint: ✖ 7 problems (0 errors, 7 warnings)
packages/misskey-js lint: ✖ 2 problems (0 errors, 2 warnings)
packages/misskey-reversi lint: ✖ 5 problems (0 errors, 5 warnings)
packages/backend lint: test/e2e/note-edit.ts(32,32): error TS2339: Property 'updatedNote' does not exist on type '{ createdNote: { id: string; createdAt: string; updatedAt?: string | null | undefined; deletedAt?: string | null | undefined; text: string | null; cw?: string | null | undefined; userId: string; ... 28 more ...; myReaction?: string | ... 1 more ... | undefined; }; }'.
packages/backend lint: test/e2e/note-edit.ts(33,23): error TS2339: Property 'updatedNote' does not exist on type '{ createdNote: { id: string; createdAt: string; updatedAt?: string | null | undefined; deletedAt?: string | null | undefined; text: string | null; cw?: string | null | undefined; userId: string; ... 28 more ...; myReaction?: string | ... 1 more ... | undefined; }; }'.
```

## Build Verification

### ✅ Build Process

- **Status**: PASSED
- **Duration**: N/A
- **Log**: [06-build.log](integrity-logs/06-build.log) (77.02 KB)

## Infrastructure

### ⚠️ Service Connectivity

- **Status**: PARTIAL
- **Duration**: N/A
- **Log**: [07-connectivity.log](integrity-logs/07-connectivity.log) (139 B)

## Database Migrations

### ⚠️ Database Migrations

- **Status**: PARTIAL
- **Duration**: N/A
- **Log**: [08-migrations.log](integrity-logs/08-migrations.log) (33 B)

## Tests

### ❌ Frontend Tests

- **Status**: FAILED
- **Duration**: N/A
- **Log**: [10-frontend-tests.log](integrity-logs/10-frontend-tests.log) (23.01 KB)

**Errors/Warnings**:
```
Error: connect ECONNREFUSED 127.0.0.1:3000
Error: connect ECONNREFUSED 127.0.0.1:3000
Error: connect ECONNREFUSED 127.0.0.1:3000
Error: connect ECONNREFUSED 127.0.0.1:3000
DOMException [NetworkError]: Failed to execute "fetch()" on "Window" with URL "https://example.local/player?autoplay=1&auto_play=1": The operation was aborted.
```

### ✅ SDK Tests

- **Status**: PASSED
- **Duration**: N/A
- **Log**: [11-sdk-tests.log](integrity-logs/11-sdk-tests.log) (1.77 KB)

### ❌ E2E Tests

- **Status**: FAILED
- **Duration**: N/A
- **Log**: [12-backend-e2e-tests.log](integrity-logs/12-backend-e2e-tests.log) (1.86 KB)

**Errors/Warnings**:
```
Error: Jest: Got error running globalSetup - /workspace/packages/backend/built-test/entry.js, reason: ENOENT: no such file or directory, open '/workspace/.config/test.yml'
ELIFECYCLE  Command failed with exit code 1.
ELIFECYCLE  Command failed with exit code 1.
```

### ❌ Cypress Tests

- **Status**: FAILED
- **Duration**: N/A
- **Log**: [13-cypress-tests.log](integrity-logs/13-cypress-tests.log) (1.75 KB)

**Errors/Warnings**:
```
[FAILED] Cypress failed to start.
[FAILED] Cypress failed to start.
[FAILED]
[FAILED]
[FAILED] This may be due to a missing library or dependency. https://on.cypress.io/required-dependencies
```

## Security

### ⏭️ Security Audit

- **Status**: SKIPPED
- **Duration**: N/A
- **Log**: [02-pnpm-audit.log](integrity-logs/02-pnpm-audit.log) (N/A)

## Other Checks

### ⚠️ 00-environment

- **Status**: PARTIAL
- **Duration**: N/A
- **Log**: [00-environment.log](integrity-logs/00-environment.log) (666 B)

### ❌ 09-backend-unit-tests

- **Status**: FAILED
- **Duration**: 30.314s
- **Log**: [09-backend-unit-tests.log](integrity-logs/09-backend-unit-tests.log) (33.79 KB)

**Errors/Warnings**:
```
FAIL test/unit/server/api/drive/files/create.ts
● Test suite failed to run
FAIL test/unit/queue/processors/CleanRemoteNotesProcessorService.ts
● Test suite failed to run
FAIL test/unit/queue/processors/CheckModeratorsActivityProcessorService.ts
```

## Security Audit

**Total Vulnerabilities**: 12

### By Severity

- 🔴 **Critical**: 0
- 🟠 **High**: 3
- 🟡 **Moderate**: 3
- 🟢 **Low**: 6

### Critical & High Severity Vulnerabilities

#### 🟠 axios Requests Vulnerable To Possible SSRF and Credential Leakage via Absolute URL

- **Module**: `axios`
- **Severity**: HIGH
- **CVEs**: CVE-2025-27152
- **Vulnerable Versions**: `<0.30.0`
- **Patched Versions**: `>=0.30.0`
- **Recommendation**: Upgrade to version 0.30.0 or later
- **Affected Paths**: `packages__backend>deep-email-validator>axios`

#### 🟠 Axios is vulnerable to DoS attack through lack of data size check

- **Module**: `axios`
- **Severity**: HIGH
- **CVEs**: CVE-2025-58754
- **Vulnerable Versions**: `<0.30.2`
- **Patched Versions**: `>=0.30.2`
- **Recommendation**: Upgrade to version 0.30.2 or later
- **Affected Paths**: `packages__backend>deep-email-validator>axios`

#### 🟠 private-ip vulnerable to Server-Side Request Forgery

- **Module**: `private-ip`
- **Severity**: HIGH
- **CVEs**: CVE-2025-8020
- **Vulnerable Versions**: `<=3.0.2`
- **Patched Versions**: `<0.0.0`
- **Recommendation**: None
- **Affected Paths**: `packages__backend>@misskey-dev/summaly>private-ip`

## Testing Artifacts

- **Coverage**: ⚠️ No coverage directory found
- **Cypress Assets**: ℹ️ No Cypress videos found

## Issues & Recommendations

### Priority 1 - Critical Issues

1. **Security Vulnerabilities**: Address critical and high severity vulnerabilities
   - Update `axios` to >=0.30.0
   - Update `axios` to >=0.30.2
   - Update `private-ip` to <0.0.0

2. **Failed Checks**: The following checks failed and require immediate attention:
   - Type Checking - See [04-typecheck.log](integrity-logs/04-typecheck.log)
     - packages/backend typecheck: test/e2e/note-edit.ts(32,32): error TS2339: Property 'updatedNote' does not exist on type '{ createdNote: { id: string; createdAt: string; updatedAt?: string | null | undefined; deletedAt?: string | null | undefined; text: string | null; cw?: string | null | undefined; userId: string; ... 28 more ...; myReaction?: string | ... 1 more ... | undefined; }; }'.
   - Linting - See [05-lint.log](integrity-logs/05-lint.log)
     - packages/icons-subsetter lint: ✖ 7 problems (0 errors, 7 warnings)
   - 09-backend-unit-tests - See [09-backend-unit-tests.log](integrity-logs/09-backend-unit-tests.log)
     - FAIL test/unit/server/api/drive/files/create.ts
   - Frontend Tests - See [10-frontend-tests.log](integrity-logs/10-frontend-tests.log)
     - Error: connect ECONNREFUSED 127.0.0.1:3000
   - E2E Tests - See [12-backend-e2e-tests.log](integrity-logs/12-backend-e2e-tests.log)
     - Error: Jest: Got error running globalSetup - /workspace/packages/backend/built-test/entry.js, reason: ENOENT: no such file or directory, open '/workspace/.config/test.yml'
   - Cypress Tests - See [13-cypress-tests.log](integrity-logs/13-cypress-tests.log)
     - [FAILED] Cypress failed to start.

### Priority 2 - Partial Failures

- **00-environment**: Review [00-environment.log](integrity-logs/00-environment.log) for warnings
- **Dependency Installation**: Review [01-dependency-install.log](integrity-logs/01-dependency-install.log) for warnings
- **Service Connectivity**: Review [07-connectivity.log](integrity-logs/07-connectivity.log) for warnings
- **Database Migrations**: Review [08-migrations.log](integrity-logs/08-migrations.log) for warnings

### Priority 3 - Maintenance

- Run `pnpm update` to update dependencies to latest compatible versions
- Review and address linting warnings
- Ensure all tests pass consistently
- Keep documentation up to date

## Generated Artifacts

All detailed logs and reports are available in the `reports/integrity-logs/` directory:

- [00-environment.log](integrity-logs/00-environment.log) (666 B)
- [01-dependency-install.log](integrity-logs/01-dependency-install.log) (137 B)
- [02-pnpm-audit.log](integrity-logs/02-pnpm-audit.log) (0 B)
- [03-pnpm-doctor.log](integrity-logs/03-pnpm-doctor.log) (0 B)
- [04-typecheck.log](integrity-logs/04-typecheck.log) (13.85 KB)
- [05-lint.log](integrity-logs/05-lint.log) (18.38 KB)
- [06-build.log](integrity-logs/06-build.log) (77.02 KB)
- [07-connectivity.log](integrity-logs/07-connectivity.log) (139 B)
- [08-migrations.log](integrity-logs/08-migrations.log) (33 B)
- [09-backend-unit-tests.log](integrity-logs/09-backend-unit-tests.log) (33.79 KB)
- [10-frontend-tests.log](integrity-logs/10-frontend-tests.log) (23.01 KB)
- [11-sdk-tests.log](integrity-logs/11-sdk-tests.log) (1.77 KB)
- [12-backend-e2e-tests.log](integrity-logs/12-backend-e2e-tests.log) (1.86 KB)
- [13-cypress-tests.log](integrity-logs/13-cypress-tests.log) (1.75 KB)
- [SUMMARY.md](integrity-logs/SUMMARY.md) (4.38 KB)
- [pnpm-audit.json](integrity-logs/pnpm-audit.json) (38.51 KB)

## Conclusion

**Overall Status**: ❌ **FAIL**

The repository has 6 failed check(s) that require attention before deployment.

---

*This report was automatically generated by the Misskey integrity check system.*
