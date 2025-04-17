import type { EditorTabName } from "@/config/editor-tab-names";
import { updateProfile } from "@/lib/api/api";
import { type ProfileData } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { isEqual } from "lodash";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import useApi from "./use-api";
import { useEditorTabStore } from "./use-editor-tabs";
import { useProfileStore } from "./use-profile";

export const useOptimisticProfileUpdateMutation = () => {
  const [profileData, setProfileData] = useProfileStore(
    useShallow((state) => [state.profile, state.setProfile])
  );
  const [activeTab, setActiveTab] = useEditorTabStore(
    useShallow((state) => [state.activeTab, state.setActiveTab])
  );

  const api = useApi();

  return useMutation({
    mutationFn: async ({
      newValues
    }: {
      newValues: Partial<ProfileData>;
      currentTab: EditorTabName;
    }) => await updateProfile(api, profileData!.username!, newValues),
    onMutate: async ({ newValues, currentTab }) => {
      // Capture current state for rollback
      const snapshot = {
        prevProfileData: profileData,
        prevActiveTab: currentTab
      };

      // Optimistically update state & tab
      setProfileData((prevProfileData) => ({
        ...prevProfileData,
        ...newValues
      }));

      return snapshot;
    },
    onSuccess: (fetchedValues: Partial<ProfileData>) => {
      // Revalidate & only update if mismatch bwtn fetched & optimistic data
      if (!isEqual(fetchedValues, profileData)) {
        setProfileData((optimisticProfileData) => ({
          ...optimisticProfileData,
          ...fetchedValues
        }));
      }
    },
    onError: (error, _, snapshot) => {
      // Roll back optimistic updates
      if (snapshot?.prevProfileData) {
        setProfileData(snapshot.prevProfileData);
      }
      if (snapshot?.prevActiveTab && snapshot.prevActiveTab !== activeTab) {
        setActiveTab(snapshot.prevActiveTab);
      }
      toast.error(`Failed to update profile. ${error.message}`);
    }
  });
};
