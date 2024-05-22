import React from "react";

export type LayoutComponent = React.ComponentType<any>;

export interface IPestacleContext {
  layouts: Record<string, LayoutComponent>;
}

export const PestacleContext = React.createContext<
  IPestacleContext | undefined
>(undefined);

export function usePestacle() {
  const context = React.useContext(PestacleContext);
  if (!context) {
    throw new Error("usePestacle must be used within a PestacleProvider");
  }
  return context;
}

export function PestacleProvider({
  children,
  layouts,
}: {
  children: React.ReactNode;
  layouts: Record<string, LayoutComponent>;
}) {
  return (
    <PestacleContext.Provider value={{ layouts }}>
      {children}
    </PestacleContext.Provider>
  );
}
