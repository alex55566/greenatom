import React from "react";
import './styles/App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { routes } from './router'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {routes.map(route =>
            <Route path={route.path} element={route.element} exact={route.exact} key={route.path} />
          )}
          <Route
            path="*"
            element={<Navigate to="/main" replace />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
