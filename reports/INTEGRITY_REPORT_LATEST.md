# Misskey Repository Integrity Report

**Generated**: 2025-10-27T04:55:19.432Z
**Report Date**: 2025-10-27

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
- **Commit**: `d645e023d477ccc412cd7a555430d078a06b42c0`
- **Commit Date**: 2025-10-27 04:52:05 +0000
- **Last Commit**: fix(icons-subsetter): Fix TypeScript type interference for WebAssembly.instantiate
- **Author**: hellel
- **Uncommitted Changes**: 3 files

### System Information

- **OS**: Linux 6.17.5-arch1-1
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
| 09-backend-unit-tests | ❌ FAILED | N/A | [09-backend-unit-tests.log](integrity-logs/09-backend-unit-tests.log) |
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
- **Log**: [04-typecheck.log](integrity-logs/04-typecheck.log) (13.38 KB)

**Errors/Warnings**:
```
packages/backend typecheck: src/postgres.ts(10,36): error TS2307: Cannot find module '@/core/chart/entities.js' or its corresponding type declarations.
packages/backend typecheck: src/postgres.ts(11,24): error TS2307: Cannot find module '@/config.js' or its corresponding type declarations.
packages/backend typecheck: src/postgres.ts(12,27): error TS2307: Cannot find module '@/logger.js' or its corresponding type declarations.
packages/backend typecheck: src/postgres.ts(13,26): error TS2307: Cannot find module '@/decorators.js' or its corresponding type declarations.
packages/backend typecheck: src/postgres.ts(15,35): error TS2307: Cannot find module '@/models/AbuseUserReport.js' or its corresponding type declarations.
```

### ❌ Linting

- **Status**: FAILED
- **Duration**: N/A
- **Log**: [05-lint.log](integrity-logs/05-lint.log) (15.13 KB)

**Errors/Warnings**:
```
packages/backend lint: src/postgres.ts(10,36): error TS2307: Cannot find module '@/core/chart/entities.js' or its corresponding type declarations.
packages/backend lint: src/postgres.ts(11,24): error TS2307: Cannot find module '@/config.js' or its corresponding type declarations.
packages/backend lint: src/postgres.ts(12,27): error TS2307: Cannot find module '@/logger.js' or its corresponding type declarations.
packages/backend lint: src/postgres.ts(13,26): error TS2307: Cannot find module '@/decorators.js' or its corresponding type declarations.
packages/backend lint: src/postgres.ts(15,35): error TS2307: Cannot find module '@/models/AbuseUserReport.js' or its corresponding type declarations.
```

## Build Verification

### ✅ Build Process

- **Status**: PASSED
- **Duration**: N/A
- **Log**: [06-build.log](integrity-logs/06-build.log) (77.16 KB)

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
- **Log**: [12-backend-e2e-tests.log](integrity-logs/12-backend-e2e-tests.log) (940 B)

**Errors/Warnings**:
```
Error: connect ECONNREFUSED 127.0.0.1:54312
ELIFECYCLE  Command failed with exit code 1.
ELIFECYCLE  Command failed with exit code 1.
```

### ❌ Cypress Tests

- **Status**: FAILED
- **Duration**: N/A
- **Log**: [13-cypress-tests.log](integrity-logs/13-cypress-tests.log) (1.76 KB)

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
- **Log**: [00-environment.log](integrity-logs/00-environment.log) (682 B)

### ❌ 09-backend-unit-tests

- **Status**: FAILED
- **Duration**: N/A
- **Log**: [09-backend-unit-tests.log](integrity-logs/09-backend-unit-tests.log) (1.50 MB)

**Errors/Warnings**:
```
FAIL test/unit/UserWebhookService.ts (320 MB heap size)
Error: connect ECONNREFUSED 127.0.0.1:54312
Error: connect ECONNREFUSED 127.0.0.1:54312
Error: connect ECONNREFUSED 127.0.0.1:54312
Error: connect ECONNREFUSED 127.0.0.1:54312
```

## Security Audit

**Total Vulnerabilities**: 1

### By Severity

- 🔴 **Critical**: 0
- 🟠 **High**: 0
- 🟡 **Moderate**: 1
- 🟢 **Low**: 0

### Critical & High Severity Vulnerabilities

✅ No critical or high severity vulnerabilities found.

## Testing Artifacts

- **Coverage**: ⚠️ No coverage directory found
- **Cypress Assets**: ℹ️ No Cypress videos found

## Issues & Recommendations

### Priority 1 - Critical Issues

2. **Failed Checks**: The following checks failed and require immediate attention:
   - Type Checking - See [04-typecheck.log](integrity-logs/04-typecheck.log)
     - packages/backend typecheck: src/postgres.ts(10,36): error TS2307: Cannot find module '@/core/chart/entities.js' or its corresponding type declarations.
   - Linting - See [05-lint.log](integrity-logs/05-lint.log)
     - packages/backend lint: src/postgres.ts(10,36): error TS2307: Cannot find module '@/core/chart/entities.js' or its corresponding type declarations.
   - 09-backend-unit-tests - See [09-backend-unit-tests.log](integrity-logs/09-backend-unit-tests.log)
     - FAIL test/unit/UserWebhookService.ts (320 MB heap size)
   - Frontend Tests - See [10-frontend-tests.log](integrity-logs/10-frontend-tests.log)
     - Error: connect ECONNREFUSED 127.0.0.1:3000
   - E2E Tests - See [12-backend-e2e-tests.log](integrity-logs/12-backend-e2e-tests.log)
     - Error: connect ECONNREFUSED 127.0.0.1:54312
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

- [00-environment.log](integrity-logs/00-environment.log) (682 B)
- [01-dependency-install.log](integrity-logs/01-dependency-install.log) (137 B)
- [02-pnpm-audit.log](integrity-logs/02-pnpm-audit.log) (0 B)
- [03-pnpm-doctor.log](integrity-logs/03-pnpm-doctor.log) (0 B)
- [04-typecheck.log](integrity-logs/04-typecheck.log) (13.38 KB)
- [05-lint.log](integrity-logs/05-lint.log) (15.13 KB)
- [06-build.log](integrity-logs/06-build.log) (77.16 KB)
- [07-connectivity.log](integrity-logs/07-connectivity.log) (139 B)
- [08-migrations.log](integrity-logs/08-migrations.log) (33 B)
- [09-backend-unit-tests.log](integrity-logs/09-backend-unit-tests.log) (1.50 MB)
- [10-frontend-tests.log](integrity-logs/10-frontend-tests.log) (23.01 KB)
- [11-sdk-tests.log](integrity-logs/11-sdk-tests.log) (1.77 KB)
- [12-backend-e2e-tests.log](integrity-logs/12-backend-e2e-tests.log) (940 B)
- [13-cypress-tests.log](integrity-logs/13-cypress-tests.log) (1.76 KB)
- [SUMMARY.md](integrity-logs/SUMMARY.md) (4.38 KB)
- [pnpm-audit.json](integrity-logs/pnpm-audit.json) (2.88 KB)

## Conclusion

**Overall Status**: ❌ **FAIL**

The repository has 6 failed check(s) that require attention before deployment.

---

*This report was automatically generated by the Misskey integrity check system.*
