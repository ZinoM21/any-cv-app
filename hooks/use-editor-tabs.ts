import { EditorTabName, editorTabName } from "@/config/editor-tabs";
import { create } from "zustand";

interface EditorTabStore {
  activeTab: EditorTabName;
  setActiveTab: (
    dataOrFn: EditorTabName | ((prev: EditorTabName) => EditorTabName)
  ) => void;
}

export const useEditorTabStore = create<EditorTabStore>((set, get) => ({
  activeTab: editorTabName.Summary,
  setActiveTab: (dataOrFn) =>
    set({
      activeTab:
        dataOrFn instanceof Function ? dataOrFn(get().activeTab) : dataOrFn,
    }),
}));
