import React from 'react';
import {HashRouter, Routes, Route} from 'react-router-dom';
import Viewer from '../views/Viewer';

const AppRoutes = () =>
  <HashRouter>
    <Routes>
      <Route exact path='/' element={<Viewer/>}/>
    </Routes>
  </HashRouter>;

export default AppRoutes;
