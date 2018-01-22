import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from './layout/MainLayout';
import { HashRouter } from 'react-router-dom'


const App = () => (
  <HashRouter>
    <MainLayout />
  </HashRouter>
)

ReactDOM.render(<App />, document.getElementById('root'))
