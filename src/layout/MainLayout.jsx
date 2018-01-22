import React from 'react';

import {  Route } from 'react-router-dom'

import MainHeader from './MainHeader';
import HomePage from '../pages/HomePage';
import JournalPage from '../pages/JournalPage';
import AlertsPage from '../pages/AlertsPage';
import HistoryPage from '../pages/HistoryPage';
import SettingsHealtPage from '../pages/SettingsHealtPage';
import MqttDebugPage from '../pages/MqttDebugPage';
import AboutPage from '../pages/AboutPage';

class MainLayout extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      <MainHeader></MainHeader>

      <main>
        <Route path="/" exact component={HomePage} />
        <Route path="/home" exact component={HomePage} />
        <Route path="/journal" exact component={JournalPage} />
        <Route path="/alerts" exact component={AlertsPage} />
        <Route path="/history" exact component={HistoryPage} />
        <Route path="/settings_healt" exact component={SettingsHealtPage} />
        <Route path="/debug_mqtt" exact component={MqttDebugPage} />
        <Route path="/about" exact component={AboutPage} />
      </main>
    </div>;

  }
};

export default MainLayout;
