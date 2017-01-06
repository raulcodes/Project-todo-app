import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  Navigator,
} from 'react-native';
import {
  Icon,
  Card,
  List,
} from 'react-native-elements';
import db from './db';

const users = [];
var names = [];
var infos = [];

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
      infos: [],
    };
  }

  render() {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)} />
    );
  }

  renderScene(route, navigator) {
    db.DB.projects.find().then((resp) => {
      var str = JSON.stringify(resp);
      str = JSON.parse(str);
      console.log(str.length);
      for (var i = 0; i < str.length; i++) {
        console.log(str[i].name);
        names.push(str[i].name);
        // infos.push(str[i].info);
        // console.log(this.state.names[i]);
      }
    });
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Icon
              containerStyle={styles.profile}
              name='face'
              type='material'
              color='white'
              onPress={this.gotoProject.bind(this)}
              size={30}/>
            <Text style={styles.headerTitle}>
              Projects
            </Text>
          </View>
        </View>
        <List>
          {
            this.state.names.map((item, i) => (
              <Card containerStyle={styles.card}>
                <TouchableHighlight
                  onPress={this.gotoProject.bind(this)}
                  style={styles.cardTouch}>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>
                      {item}
                    </Text>
                    <Text style={styles.cardProgess}>
                      54%
                    </Text>
                    <Icon
                      name='chevron-right'
                      type='material'
                      color='#9E9E9E'
                      size={40}/>
                  </View>
                </TouchableHighlight>
              </Card>
            ))
          }
        </List>
        <Icon
          reverse
          raised
          name='add'
          size={30}
          type='material'
          color='purple'
          onPress={this.gotoAdd.bind(this)}
          containerStyle={styles.button}/>
      </View>
    );
  }

  gotoAdd() {
    this.props.navigator.push({
      id: 'AddPage',
      name: 'Add Project',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    });
  }

  gotoProject() {
    this.props.navigator.push({
      id: 'ProjectPage',
      name: 'Project Page',
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    height: 55,
    justifyContent: 'center',
    backgroundColor: 'purple',
  },
  headerContent: {
    flexDirection: 'row'
  },
  profile: {
    alignSelf: 'flex-start',
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 25,
    marginLeft: 20,
    color: 'white',
  },
  button: {
    marginTop: 475,
    marginLeft: 275,
    position: 'absolute',
  },
  card: {
    height: 75,
    justifyContent: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  cardProgess: {
    fontSize: 30,
    marginLeft: 90,
    fontWeight: 'bold',
  },
  cardTouch: {
  },
});
