import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';
import reportWebVitals from './reportWebVitals';
import NavContextProvider from './contexts/NavContext';
import MovieContextProvider from './contexts/MovieContext';
import AuthContextProvider from './contexts/AuthContext';
import CinemaContextProvider from './contexts/CinemaContext';
import ShowTimeProvider from './contexts/ShowTimeContext';
import FoodContextProvider from './contexts/FoodContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles>
        <NavContextProvider>
          <MovieContextProvider>
            <AuthContextProvider>
              <CinemaContextProvider>
                <ShowTimeProvider>
                  <FoodContextProvider>
                    <App />  
                  </FoodContextProvider>
                </ShowTimeProvider>
              </CinemaContextProvider>
            </AuthContextProvider>
          </MovieContextProvider>
        </NavContextProvider>
      </GlobalStyles>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
