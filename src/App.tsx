import { AppRouter } from './routes';
import './App.css';
import { Provider } from 'react-redux'
import {makeStore, persistor} from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'

function App() {

  return (
    <Provider store={makeStore}>
      <PersistGate persistor={persistor}>

        <div className="App">
          <AppRouter />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
