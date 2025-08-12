"use client";
import { persistor } from "@/store/presist";

import React,{ReactNode} from "react";
import { PersistGate } from "redux-persist/integration/react";

interface PresistProviderProps {
  children: ReactNode;
}
export const PersistGateProvider = ({ children }: PresistProviderProps) => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  );
};