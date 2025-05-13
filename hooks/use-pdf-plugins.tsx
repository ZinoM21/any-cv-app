import { createContext, JSX, ReactElement, ReactNode, useContext } from "react";

import { Plugin, type SpecialZoomLevel } from "@react-pdf-viewer/core";
import { DownloadProps, getFilePlugin } from "@react-pdf-viewer/get-file";
import {
  ZoomInProps,
  ZoomOutProps,
  zoomPlugin,
  ZoomProps
} from "@react-pdf-viewer/zoom";

interface PdfPluginsContextValue {
  // File plugin exports
  filePluginInstance: Plugin;
  Download: (props: DownloadProps) => ReactElement;

  // Zoom plugin exports
  zoomPluginInstance: Plugin;
  ZoomIn: (props: ZoomInProps) => ReactElement;
  ZoomOut: (props: ZoomOutProps) => ReactElement;
  Zoom: (props: ZoomProps) => ReactElement;
  zoomTo: (scale: number | SpecialZoomLevel) => void;
}

const PdfPluginsContext = createContext<PdfPluginsContextValue | null>(null);

interface PdfPluginsProviderProps {
  children: ReactNode;
}

export function PdfPluginsProvider({
  children
}: PdfPluginsProviderProps): JSX.Element {
  const filePluginInstance = getFilePlugin({
    fileNameGenerator: () => {
      return "my-stunning-new-cv";
    }
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
    zoomTo: zoomPluginInstance.zoomTo
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
