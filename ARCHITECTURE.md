# Architecture Overview

Clean Architecture + MVVM with a **flat, reduced folder structure**.

## Project Structure

```
src/
├── main.tsx                 # Entry point
├── core/                     # Business logic (4 folders)
│   ├── entities/            # Job, JobFilter, JobSource, ScrapeConfig, ScrapeProgress
│   ├── ports/               # IJobScraperGateway, ISourceStorageGateway, ISourceRepository
│   ├── useCases/            # ScrapeJobs, FilterJobs, GetSources, ManageCustomSources, ComputeStats
│   ├── adapters/            # JobScraperAdapter, LocalStorageSourceStorage, SourceRepositoryAdapter
│   ├── container.ts         # DI wiring
│   └── index.ts
├── config/                  # Centralized configuration
├── data/                    # Static data (sources)
├── features/
│   └── jobs/                # All job feature in one folder (flat)
│       ├── JobsPage.tsx
│       ├── useJobsPageViewModel.ts
│       ├── JobCard.tsx
│       ├── SearchBar.tsx
│       ├── StatCard.tsx
│       ├── FilterPanel.tsx
│       ├── SourceSelector.tsx
│       ├── CustomSourceAdder.tsx
│       └── index.ts
├── components/ui/           # Shared UI primitives (shadcn)
├── lib/                     # Utilities
├── hooks/                   # Shared hooks
└── types/                   # Type re-exports (job.ts from @/core/entities)
```

## Key Principles

- **Core**: `entities` → `ports` → `useCases` → `adapters` → `container`
- **Features**: One folder per feature; all components, page, and viewModel in that folder
- **Types**: Use `@/core/entities` or `@/types/job` for domain types
- **Config**: `@/config` for app configuration

## Adding New Features

1. **New use case**: Add in `core/useCases/`, wire in `core/container.ts`
2. **New entity**: Add in `core/entities/`
3. **New feature**: Create `features/<name>/` with page, viewModel, and components in one folder
4. **Config**: Update `config/index.ts` and `AppConfig` interface
