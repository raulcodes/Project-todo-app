/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import { Scene, Router } from 'react-native-router-flux';

import MainPage from './MainPage';
import AddPage from './AddPage';
import ProjectPage from './ProjectPage';
import db from './db';

var names = [];

class ProjectApp extends Component {

  render() {
    return (
      <Router>
        <Scene key='root'>
          <Scene key='MainPage' component={MainPage} title='MainPage' names={names} hideNavBar/>
          <Scene key='AddPage' component={AddPage} title='AddPage'/>
          <Scene key='ProjectPage' component={ProjectPage} title='ProjectPage' name={''} info={''} hideNavBar/>
        </Scene>
      </Router>
    )
  }

  // render() {
  //   return (
  //     <Navigator
  //       initialRoute={{id: 'MainPage', name: 'Index'}}
  //       renderScene={this.renderScene.bind(this)}
  //       configureScene={(route) => {
  //         if (route.sceneConfig) {
  //           return route.sceneConfig;
  //         }
  //         return Navigator.SceneConfigs.FloatFromRight;
  //       }} />
  //   );
  // }
  //
  //
  //
  // renderScene(route, navigator) {
  //   var routeId = route.id;
  //   if (routeId === 'MainPage') {
  //     return (
  //       <MainPage
  //         navigator={navigator}
  //         />
  //     );
  //   }
  //   if (routeId === 'AddPage') {
  //     return (
  //       <AddPage
  //         navigator={navigator} />
  //     );
  //   }
  //   if (routeId === 'ProjectPage') {
  //     return (
  //       <ProjectPage
  //         index={route.index}
  //         navigator={navigator} />
  //     );
  //   }
  // }
}

AppRegistry.registerComponent('ProjectApp', () => ProjectApp);
