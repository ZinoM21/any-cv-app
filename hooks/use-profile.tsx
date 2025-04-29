import { ProfileData } from "@/lib/types";
import { create } from "zustand";

interface ProfileStore {
  profile: Partial<ProfileData>;
  setProfile: (
    dataOrFn:
      | Partial<ProfileData>
      | ((prev: Partial<ProfileData>) => Partial<ProfileData>)
  ) => void;
  resetProfile: () => void;
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profile: {},
  setProfile: (dataOrFn) =>
    set({
      profile: dataOrFn instanceof Function ? dataOrFn(get().profile) : dataOrFn
    }),
  resetProfile: () => set({ profile: {} })
}));
