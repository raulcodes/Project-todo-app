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
  Card,
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

  componentWillMount() {
    db.DB.projects.find().then((resp) => {
      var str = JSON.stringify(resp);
      str = JSON.parse(str);
      this.setState({ name: str[this.props.index].name, info: str[this.props.index].info });
      // Alert.alert('yo:' + this.state.name + ' ' + this.state.info);
    });
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
              Project Info
            </Text>
          </View>
        </View>
        <Card>
          <Text style={styles.title}>
            {this.state.name}
          </Text>
          <Text style={styles.info}>
            {this.state.info}
          </Text>
        </Card>
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
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'purple',
    marginLeft: 20,
    marginTop: 10,
  },
  info: {
    fontSize: 15,
    marginLeft: 20,
    marginTop: 15,
  },
});
