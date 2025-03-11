import { ProfileData } from "@/lib/types";
import { create } from "zustand";

interface ProfileStore {
  profile: Partial<ProfileData> | null;
  setProfile: (
    dataOrFn:
      | Partial<ProfileData>
      | ((prev: Partial<ProfileData> | null) => Partial<ProfileData>)
  ) => void;
  resetProfile: () => void;
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profile: null,
  setProfile: (dataOrFn) =>
    set({
      profile:
        dataOrFn instanceof Function ? dataOrFn(get().profile) : dataOrFn,
    }),
  resetProfile: () => set({ profile: null }),
}));
