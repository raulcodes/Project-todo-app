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
      date: 0,
      fixedDate: '',
      commits: 0,
      word: '',
    };
  }

  fixDate(time) {
    var months = [
      "Jan", "Feb", "Mar", "Apr", "May",
      "Jun", "Jul", "Aug", "Sep", "Oct",
      "Nov", "Dec"
    ];
    var date = new Date(time);
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    console.log('DAY: ' + day + ' ' + months[month]);
    return (months[month] + ' ' + day + ', ' + year);
  }

  componentWillMount() {
    db.DB.projects.find().then((resp) => {
      var str = JSON.stringify(resp);
      str = JSON.parse(str);
      console.log("INDEX IN PAGE: " + this.props.index);
      this.setState({ name: str[this.props.index].name,
                      info: str[this.props.index].info,
                      date: str[this.props.index].date,
                      daysSince: db.daysSince(str[this.props.index].date),
                      fixedDate: this.fixDate(str[this.props.index].date),
                      commits: 24,
                      word: 'Days'});
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
              {this.state.name}
            </Text>
          </View>
        </View>
        <View style={styles.numbers}>
          <View style={styles.days}>
            <Text>
              {this.state.daysSince}
            </Text>
            <Text>
              {this.state.word}
            </Text>
          </View>
          <View style={styles.create}>
            <Text>
              Created on
            </Text>
            <Text>
              {this.state.fixedDate}
            </Text>
          </View>
          <View style={styles.commits}>
            <Text> {this.state.commits} </Text>
            <Text> commits </Text>
          </View>
        </View>
        <Card containerStyle={styles.card}>
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
      and: [{ name: this.state.name}, { date: this.state.date }]}
    }).then(resp => console.log('RESPONSE: ' + resp));
    var p = new db.project(this.state.name, '', this.state.date);
    var i = db.projects.indexOf(p);
    // if (i == 0) {
    //   db.projects.shift();
    // } else {
      db.projects.splice(i, 1);
    // }
    Actions.pop();
    setTimeout(() => {
      Actions.refresh({projects: db.projects});
      // console.log("zzzz");
      console.log(db.projects);
    }, 10);
  }

  gotoMain() {
    Actions.pop();
    // Actions.refresh();
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#512da8',
    flex: 1,
  },
  header: {
    height: 175,
    justifyContent: 'flex-start',
    backgroundColor: '#673ab7',
  },
  headerContent: {
    flexDirection: 'column'
  },
  profile: {
    alignSelf: 'flex-start',
    marginTop: 15,
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 55,
    fontWeight: 'bold',
    marginTop: 40,
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
    color: 'white',
    marginLeft: 10,
    marginTop: 15,
  },
  button: {
    marginTop: 40,
  },
  card: {
    backgroundColor: '#673ab7',
    borderColor: '#673ab7',
    justifyContent: 'center',
  },
  numbers: {
    marginTop: 15,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  days: {
    marginRight: 20,
    alignItems: 'center',
    flexDirection: 'column',
  },
  create: {
    marginRight: 20,
    marginLeft: 20,
    alignItems: 'center',
    flexDirection: 'column',
  },
  commits: {
    marginLeft: 20,
    alignItems: 'center',
    flexDirection: 'column',
  },
});
