import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Navigator,
  Alert,
} from 'react-native';
import {
  Icon,
} from 'react-native-elements';
import db from './db';

export default class ProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      info: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Icon
              containerStyle={styles.profile}
              name='close'
              type='material'
              color='white'
              onPress={this.gotoMain.bind(this)}
              size={30}/>
            <Text style={styles.headerTitle}>
              {this.state.name}
            </Text>
          </View>
        </View>
        <Icon
          name='close'
          type='material'
          color='black'
          onPress={this.display.bind(this)}
          size={50}/>
      </View>
    );
  }

  gotoMain() {
    this.props.navigator.push({
      id: 'MainPage',
      name: 'Main Page',
      sceneConfig: Navigator.SceneConfigs.SwipeFromLeft,
    });
  }

  display() {
    db.DB.projects.find().then((resp) => {
      var str = JSON.stringify(resp);
      str = JSON.parse(str);
      this.setState({ name: str[1].name, info: str[1].info });
      Alert.alert('yo:' + this.state.name + ' ' + this.state.info);
    });
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
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
});
