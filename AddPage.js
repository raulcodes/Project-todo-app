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
  FormLabel,
  FormInput,
  Button,
} from 'react-native-elements';
import db from './db';
import Store from 'react-native-store';

export default class AddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      info: '',
      fields: '',
      field0: [],
      field1: '',
    };
  }

  submit() {
    Alert.alert('yo: ' + this.state.name + ' ' + this.state.info);
    db.DB.projects.add({
      name: this.state.name,
      info: this.state.info,
    });
    this.setState({name: '', info: ''});
  }

  display() {
    db.DB.projects.find().then((resp) => {
      if (resp) {
        var str = JSON.stringify(resp);
        var stri = JSON.parse(str);
        this.setState({ field0: stri });
        this.setState({ field1: stri[1].info })
        Alert.alert('uiy: ' + this.state.field0[1].info);
      }
    });
    db.DB.projects.destroy();
    Alert.alert('yo:' + this.state.fields);
  }

  render() {
    const name = this.state.name;
    return (
      <View>
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
              Add a Project
            </Text>
          </View>
        </View>
        <View style={styles.input}>
          <FormLabel>Project Name</FormLabel>
          <FormInput
            maxLength={20}
            value={this.state.name}
            onChangeText={(name) => {this.setState({name})}}
            />
          <FormLabel>Project Description</FormLabel>
          <FormInput
            maxLength={140}
            multiline
            value={this.state.info}
            onChangeText={(info) => {this.setState({info})}}
            />
          <Button
            onPress={this.submit.bind(this)}
            buttonStyle={styles.button}
            title='SUBMIT'
            borderRadius={40}
            backgroundColor='purple'/>
          <Button
            onPress={this.display.bind(this)}
            buttonStyle={styles.button}
            title='SUBMIT2'
            borderRadius={40}
            backgroundColor='purple'/>
        </View>
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

  storeProject() {
    store.save('projects', {

    })
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
  button: {
    marginTop: 40,
  }
});
