import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import firebase from 'firebase/compat/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Provider as PaperProvider, Card, List, Button } from 'react-native-paper';
import Constants from 'expo-constants';
import LoginScreen from './Login';


const firebaseConfig = {
  apiKey: "AIzaSyCsfPlHclKn8gSDVset0aQFdpnS98GaJ9c",
  authDomain: "waewhere-project.firebaseapp.com",
  projectId: "waewhere-project",
  storageBucket: "waewhere-project.appspot.com",
  messagingSenderId: "451877826327",
  appId: "1:451877826327:web:1e59c11fb41b64a9d71152",
  measurementId: "G-EZX7QRT9BP"
};

LogBox.ignoreAllLogs(true);

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) { }

function dbListener(path, setData) {
  const tb = ref(getDatabase(), path);
  onValue(tb, (snapshot) => {
    setData(snapshot.val());
  })
}

function Loading() {
  return <View><Text>Loading</Text></View>
}

export default function App() {
  var auth = getAuth();
  auth.onAuthStateChanged(function (us) {
    setUser(us);
  });
  const [user, setUser] = React.useState(null);

  if (user == null) {
    return <LoginScreen />;
  }

  return (
    <PaperProvider>
      <View style={styles.container}>

        <Card>
          <Card.Cover source={require("./assets/Logo-Home.png")} />


          <Card.Content style={styles.bodymenu}>
            <Button style={styles.menu} onclick="window.location.href='work5.html'">สระพลาสติก</Button>
            <Button style={styles.menu}>บึงสีฐาน</Button>
            <Button style={styles.menu}>สนามกีฬาใกล้ตลาดมอ</Button>
            <Button style={styles.menu}>สนามบาส 4 สนาม</Button>
            <Button style={styles.menu}>สปอร์ตคอมเพล็ก</Button>

          </Card.Content>

          <Card.Cover source={require("./assets/map.png")} />
          <Button icon="logout" onPress={() => getAuth().signOut()} style={styles.out}>
            Sign Out
          </Button>
        </Card>

        <StatusBar backgroundColor="rgba(0,0,0,0.5)" style="light" />

      </View>
    </PaperProvider>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
  out: {
    backgroundColor: '#CF8083'
  },
  menu: {
    height: '13%',
    marginTop: '5.2%',
    paddingTop: '2%',
    marginLeft: "10%",
    marginRight: "10%",
    backgroundColor: '#5CA6B5'
  },
  bodymenu: {
    paddingTop: '5%',
    height: '49.8%',
    alignContent: "center",
    backgroundColor: '#FDF6F1'
  }
});

