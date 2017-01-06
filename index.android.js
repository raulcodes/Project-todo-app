/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';

import MainPage from './MainPage';
import AddPage from './AddPage';
import ProjectPage from './ProjectPage';
import db from './db';

class ProjectApp extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{id: 'MainPage', name: 'Index'}}
        renderScene={this.renderScene.bind(this)}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }} />
    );
  }



  renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'MainPage') {
      return (
        <MainPage
          navigator={navigator} />
      );
    }
    if (routeId === 'AddPage') {
      return (
        <AddPage
          navigator={navigator} />
      );
    }
    if (routeId === 'ProjectPage') {
      return (
        <ProjectPage
          navigator={navigator} />
      );
    }
  }
}

AppRegistry.registerComponent('ProjectApp', () => ProjectApp);
