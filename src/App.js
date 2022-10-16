import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import '@shopify/polaris/build/esm/styles.css';
import {
  AppProvider,
} from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import en from '@shopify/polaris/locales/en.json';
import { Provider } from "react-redux";
import store from "./state/store";
import SignUpAccount from './compoments/SignUpAccount';
import ListOfAccount from './compoments/ListOfAccount';
import {
  Frame
} from '@shopify/polaris';
import Notify from "./Notify";
function App() {


  return (
    <Provider store={store}>
      <AppProvider i18n={en}>
        <div className="App">
          <Frame>
            <Notify />
            <SignUpAccount />
            <ListOfAccount />
          </Frame>
        </div>
      </AppProvider>
    </Provider>


  );
}

export default App;
