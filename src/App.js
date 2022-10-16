import React from 'react';
import './App.css';
import {
  AppProvider,
} from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import en from '@shopify/polaris/locales/en.json';
import { Provider } from "react-redux";
import store from "./state/store";
import SignUpAccount from './compoments/SignUpAccount';
import ListOfAccount from './compoments/ListOfAccount';
function App() {
  return (
    <Provider store={store}>
      <AppProvider i18n={en}>
        <div className="App">
          <SignUpAccount />
          <ListOfAccount />
        </div>
      </AppProvider>
    </Provider>


  );
}

export default App;
