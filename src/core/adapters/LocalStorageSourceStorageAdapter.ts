import type { JobSource } from '../entities';
import type { ISourceStorageGateway } from '../ports';

const STORAGE_KEY = 'customJobSources';

export class LocalStorageSourceStorageAdapter implements ISourceStorageGateway {
  private customSources: JobSource[] = [];

  constructor() {
    this.loadCustomSources();
  }

  private loadCustomSources(): void {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        this.customSources = JSON.parse(saved);
      }
    } catch {
      this.customSources = [];
    }
  }

  getCustomSources(): JobSource[] {
    return [...this.customSources];
  }

  addCustomSource(source: JobSource): void {
    this.customSources.push(source);
    this.persistToStorage();
  }

  removeCustomSource(sourceId: string): void {
    this.customSources = this.customSources.filter((s) => s.id !== sourceId);
    this.persistToStorage();
  }

  saveCustomSources(sources: JobSource[]): void {
    this.customSources = [...sources];
    this.persistToStorage();
  }

  private persistToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.customSources));
    } catch {
      // Ignore storage errors
    }
  }
}
