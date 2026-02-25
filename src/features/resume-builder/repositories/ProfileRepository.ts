import type { Profile } from '../types';
import * as storageService from '../services/storageService';

export interface IProfileRepository {
  getAllProfiles(): Profile[];
  saveProfiles(profiles: Profile[]): void;
  getActiveProfileId(): string | null;
  saveActiveProfileId(id: string): void;
  createNewProfile(name: string): Profile;
}

export class ProfileRepository implements IProfileRepository {
  getAllProfiles(): Profile[] {
    return storageService.loadProfiles();
  }

  saveProfiles(profiles: Profile[]): void {
    storageService.saveProfiles(profiles);
  }

  getActiveProfileId(): string | null {
    return storageService.loadActiveProfileId();
  }

  saveActiveProfileId(id: string): void {
    storageService.saveActiveProfileId(id);
  }

  createNewProfile(name: string): Profile {
    return storageService.createNewProfile(name);
  }
}

export const profileRepository = new ProfileRepository();

