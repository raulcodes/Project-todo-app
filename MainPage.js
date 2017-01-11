import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableNativeFeedback,
  Navigator,
  ScrollView,
} from 'react-native';
import {
  Icon,
  Card,
  List,
} from 'react-native-elements';
import db from './db';
import { Actions } from 'react-native-router-flux';

function project(name, info, date) {
  this.name = name;
  this.info = info;
  this.date = date;
}

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameList: [],
      infos: [],
    };
  }

  componentWillMount() {
    if (db.projects.length == 0) {
      // console.log('HELLO');
      var names = [];
      db.DB.projects.find().then((resp) => {
        var str = JSON.stringify(resp);
        str = JSON.parse(str);
        console.log(str.length);
        console.log(str);
        for (var i = 0; i < str.length; i++) {
          var p = new db.project(str[i].name, '', db.daysSince(str[i].date));
          //console.log(str[i].name);
          db.projects.push(p);
          // infos.push(str[i].info);
          // console.log(this.state.names[i]);
        }
        console.log(db.projects);
        this.setState({ nameList: names });
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Icon
              containerStyle={styles.profile}
              name='face'
              type='material'
              color='white'
              size={30}/>
            <Text style={styles.headerTitle}>
              Projects
            </Text>
          </View>
        </View>
        <ScrollView style={styles.scrollContainer}>
          <List containerStyle={styles.listContainer}>
            {
              db.projects.map((item, i) => (
                <TouchableNativeFeedback
                  key={i}
                  onPress={() => this.gotoProject(i)}
                  style={styles.cardTouch}>
                  <View>
                    <Card containerStyle={styles.card} key={i}>
                      <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}
                          key={i}>
                          {item.name}
                        </Text>
                        <Text style={styles.cardProgess}>
                          {item.date}
                        </Text>
                        <Icon
                          name='chevron-right'
                          type='material'
                          color='#d1c4e9'
                          size={40}
                          style={styles.chevron}/>
                      </View>
                    </Card>
                  </View>
                </TouchableNativeFeedback>
              ))
            }
          </List>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Icon
            reverse
            raised
            name='add'
            size={30}
            type='material'
            color='#ff4081'
            onPress={Actions.AddPage}
            containerStyle={styles.button}/>
        </View>
      </View>
    );
  }

  // renderScene(route, navigator) {
  //   return (
  //   );
  // }

  gotoAdd() {
    Actions.AddPage;
    // this.props.navigator.push({
    //   id: 'AddPage',
    //   name: 'Add Project',
    //   sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    // });
  }

  gotoProject(i) {
    console.log("INDEX IN MAIN: " + i);
    Actions.ProjectPage({ index: i });
  }
    // console.log(i);
    // this.props.navigator.push({
    //   id: 'ProjectPage',
    //   name: 'hello',
    //   index: i,
    // });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#512da8',
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
  scrollContainer: {
    flex: 1,
    borderColor: 'pink',
  },
  buttonContainer: {
    width: 100,
    height: 100,
    marginLeft: 300,
    marginTop: 550,
    alignSelf: 'flex-end',
    alignItems: 'flex-start',
    position: 'absolute',
    justifyContent: 'flex-start',
  },
  button: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  listContainer: {
    marginTop: 0,
    marginBottom: 15,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: '#512da8',
  },
  card: {
    height: 75,
    justifyContent: 'center',
    backgroundColor: '#673ab7',
    borderColor: '#673ab7',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    position: 'absolute',
    color: '#ffffff',
  },
  cardProgess: {
    fontSize: 30,
    marginLeft: 265,
    fontWeight: 'bold',
  },
  cardTouch: {
    borderWidth: 3,
    borderColor: 'pink',
  },
});
