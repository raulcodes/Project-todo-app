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
  Card
} from 'react-native-elements';

const users = [
  {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
  },
  {
    name: 'thot leader',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/evagiselle/128.jpg'
  },
  {
    name: 'jsa',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg'
  },
  {
    name: 'talhaconcepts',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/talhaconcepts/128.jpg'
  },
  {
    name: 'andy vitale',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/andyvitale/128.jpg'
  },
  {
    name: 'katy friedson',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg'
  }
]

export default class MainPage extends Component {
  render() {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)} />
    );
  }

  renderScene(route, navigator) {
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
        <Card containerStyle={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Studio.init
            </Text>
            <Text style={styles.cardProgess}>
              54%
            </Text>
          </View>
        </Card>
        <Card containerStyle={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              TruRecruit
            </Text>
            <Text style={styles.cardProgess}>
              67%
            </Text>
          </View>
        </Card>
        <Icon
          raised
          name='add'
          size={30}
          type='material'
          color='#f50'
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
    marginLeft: 120,
    fontWeight: 'bold',
  },
});
