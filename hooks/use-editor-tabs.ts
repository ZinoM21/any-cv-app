import { editorTabsConfig } from "@/config/editor-tabs";
import { EditorTab } from "@/lib/types";
import { create } from "zustand";

interface EditorTabStore {
  activeTab: EditorTab["name"];
  setActiveTab: (
    dataOrFn:
      | EditorTab["name"]
      | ((prev: EditorTab["name"]) => EditorTab["name"])
  ) => void;
}

export const useEditorTabStore = create<EditorTabStore>((set, get) => ({
  activeTab: editorTabsConfig[0].name,
  setActiveTab: (dataOrFn) =>
    set({
      activeTab:
        dataOrFn instanceof Function ? dataOrFn(get().activeTab) : dataOrFn,
    }),
}));
