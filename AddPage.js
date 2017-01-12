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
import { Hoshi } from 'react-native-textinput-effects';
import { Actions } from 'react-native-router-flux';

var names = [];

function project(name, info, date) {
  this.name = name;
  this.info = info;
  this.date = date;
}

export default class AddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      info: '',
      fields: '',
      id: 0,
    };
  }

  submit() {
    // Alert.alert('yo: ' + this.state.name + ' ' + this.state.info);
    var d = new Date();
    var f = d.getTime();

    db.DB.projects.add({
      name: this.state.name,
      info: this.state.info,
      date: f,
    }).then((res) => {
      db.DB.projects.find({
        where: { date: f }
      }).then(resp => {
        var str = JSON.stringify(resp);
        str = JSON.parse(str);
        console.log(str[0]._id);
        db.DB.commits.add({
          id: str[0]._id,
          name: '',
          date: 0,
          mess: '',
        });
      });
    });

    var p = new db.project(this.state.name, '', db.daysSince(f));

    db.projects.push(p);
    // db.DB.projects.destroy();
    Actions.pop();
    setTimeout(() => {
      Actions.refresh({projects: db.projects});
      // console.log("zzzz");
      console.log(db.projects);
    }, 10);
  }

  gotoMain() {
    Actions.pop();
  }

  render() {
    const name = this.state.name;
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
              Add a Project
            </Text>
          </View>
        </View>
        <View style={styles.input}>
          <Hoshi
            label={'Project Name'}
            borderColor={'#b76c94'}
            labelStyle={styles.label}
            value={this.state.name}
            onChangeText={(name) => {this.setState({name})}}
            />
          <Hoshi
            label={'Project Description'}
            borderColor={'#b76c94'}
            labelStyle={styles.label}
            value={this.state.info}
            onChangeText={(info) => {this.setState({info})}}
            />
          <Button
            onPress={this.submit.bind(this)}
            buttonStyle={styles.button}
            title='SUBMIT'
            borderRadius={40}
            backgroundColor='#ff4081'/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#512da8',
    flex: 1,
  },
  header: {
    height: 55,
    justifyContent: 'center',
    backgroundColor: '#673ab7',
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
  },
  label: {
    color: 'white',
  }
});
