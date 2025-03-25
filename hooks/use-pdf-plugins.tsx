import { createContext, useContext, ReactNode, JSX, ReactElement } from "react";

import { DownloadProps, getFilePlugin } from "@react-pdf-viewer/get-file";
import {
  zoomPlugin,
  ZoomInProps,
  ZoomOutProps,
  ZoomProps,
} from "@react-pdf-viewer/zoom";
import {
  // OpenFile,
  Plugin,
} from "@react-pdf-viewer/core";

interface PdfPluginsContextValue {
  // File plugin exports
  filePluginInstance: Plugin;
  Download: (props: DownloadProps) => ReactElement;

  // Zoom plugin exports
  zoomPluginInstance: Plugin;
  ZoomIn: (props: ZoomInProps) => ReactElement;
  ZoomOut: (props: ZoomOutProps) => ReactElement;
  Zoom: (props: ZoomProps) => ReactElement;
}

const PdfPluginsContext = createContext<PdfPluginsContextValue | null>(null);

interface PdfPluginsProviderProps {
  children: ReactNode;
}

export function PdfPluginsProvider({
  children,
}: PdfPluginsProviderProps): JSX.Element {
  const filePluginInstance = getFilePlugin({
    fileNameGenerator: () => {
      // (file: OpenFile) => {
      // `file.name` is the URL of opened file
      //   TODO: add custom name
      //   const fileName = file.name.substring(file.name.lastIndexOf("/") + 1);
      //   return `my-${fileName}-cv`;
      return "my-stunning-new-cv";
    },
  });
  const zoomPluginInstance = zoomPlugin();

  const contextValue: PdfPluginsContextValue = {
    // File plugin
    filePluginInstance,
    Download: filePluginInstance.Download,

    // Zoom plugin
    zoomPluginInstance,
    ZoomIn: zoomPluginInstance.ZoomIn,
    ZoomOut: zoomPluginInstance.ZoomOut,
    Zoom: zoomPluginInstance.Zoom,
  };

  return (
    <PdfPluginsContext.Provider value={contextValue}>
      {children}
    </PdfPluginsContext.Provider>
  );
}

export function usePdfPlugins(): PdfPluginsContextValue {
  const context = useContext(PdfPluginsContext);
  if (context === null) {
    throw new Error("usePdfPlugins must be used within a PdfPluginsProvider");
  }
  return context;
}
