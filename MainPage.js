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

const users = [];

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameList: [],
      infos: [],
    };
  }

  componentWillMount() {
    if (true) {
      console.log('HELLO');
      var names = [];
      db.DB.projects.find().then((resp) => {
        var str = JSON.stringify(resp);
        str = JSON.parse(str);
        console.log(str.length);
        for (var i = 0; i < str.length; i++) {
          //console.log(str[i].name);
          db.names.push(str[i].name);
          // infos.push(str[i].info);
          // console.log(this.state.names[i]);
        }
        console.log(db.names);
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
        <ScrollView>
          <List containerStyle={styles.listContainer}>
            {
              db.names.map((item, i) => (
                <TouchableNativeFeedback
                  key={i}
                  onPress={() => this.gotoProject(i)}
                  style={styles.cardTouch}>
                  <View>
                    <Card containerStyle={styles.card} key={i}>
                      <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}
                          key={i}>
                          {item}
                        </Text>
                        <Text style={styles.cardProgess}>

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
  button: {
    marginTop: 475,
    marginLeft: 275,
    position: 'absolute',
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
