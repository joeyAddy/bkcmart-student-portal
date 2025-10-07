"use client";

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Lottie from "lottie-react";
import { store, persistor } from "./store";
import loaderAnimation from "../public/assets/lottie/loader.json";

interface ReduxProviderProps {
  children: React.ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="flex items-center justify-center min-h-screen">
            <Lottie
              animationData={loaderAnimation}
              loop={true}
              style={{ width: 150, height: 150 }}
            />
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
