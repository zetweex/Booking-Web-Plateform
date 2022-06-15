import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import PasswordReset from './pages/PasswordReset';
import Home from './pages/Home';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Profile from './pages/Profile';
import ContactUs from './pages/Contact/Contact';
import Trips from './pages/Trips';
import Trip from './pages/Trip';
import Navbar from './components/Navbar/Navbar';
import InfosCovid from './pages/InfosCovid';
import Translator from './pages/Translator';
import Advisor from './pages/Advisor';
import ProtectedRoutes from './ProtectedRoutes';
import Documents from './pages/Documents';

import { createStore } from "redux";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import reducer from './Redux/Reducer';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2
 };

const pReducer = persistReducer(persistConfig, reducer);

const store = createStore(pReducer);
const persistor = persistStore(store);

function App() {
  return (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/login" />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/forgot-password" exact element={<ForgotPassword />} />
          <Route path="/password-reset/:token" exact element={<PasswordReset />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/home" exact element={<Home />} />
            <Route path="/me" exact element={<Profile />} />
            <Route path="/contact" exact element={<ContactUs />} />
            <Route path="/trips" exact element={<Trips />} />
            <Route path="/trips/:tripID" exact element={<Trip />} />
            <Route path="/coronavirus-booking-information" exact element={<InfosCovid />} />
            <Route path="/translator" exact element={<Translator />} />
            <Route path="/advisor" exact element={<Advisor />} />
            <Route path="/documents" exact element={<Documents />}/>
          </Route>
        </Routes>
      </Router>
    </PersistGate>
  </Provider>
  );
}

export default App;
