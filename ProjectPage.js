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
  Button,
} from 'react-native-elements';
import db from './db';
import { Actions } from 'react-native-router-flux';

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
      console.log("INDEX IN PAGE: " + this.props.index);
      this.setState({ name: str[this.props.index].name, info: str[this.props.index].info });
      // Alert.alert('yo:' + this.state.name + ' ' + this.state.info + ' ' + str[this.props.index].date);
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
        <Button
          onPress={this.delete.bind(this)}
          buttonStyle={styles.button}
          title='DELETE PROJECT'
          borderRadius={40}
          backgroundColor='red'/>
      </View>
    );
  }

  delete() {
    db.DB.projects.remove({ where: {
      and: [{ name: this.state.name }, { info: this.state.info }]}
    });
    var i = db.name.indexOf(this.state.name);
    db.names.splice(i, 1);
    Actions.pop();
    setTimeout(() => {
      Actions.refresh({names: db.names});
      // console.log("zzzz");
      console.log(db.names);
    }, 10);
  }

  gotoMain() {
    Actions.pop();
    Actions.refresh();
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
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'purple',
    marginLeft: 10,
    marginTop: 10,
  },
  info: {
    fontSize: 15,
    marginLeft: 10,
    marginTop: 15,
  },
  button: {
    marginTop: 40,
  },
});
