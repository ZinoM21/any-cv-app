import { ProfileData } from "@/lib/types";
import { create } from "zustand";

interface ProfileStore {
  profile: ProfileData | null;
  setProfile: (data: ProfileData) => void;
  resetProfile: () => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  setProfile: (data) => set({ profile: data }),
  resetProfile: () => set({ profile: null }),
}));
