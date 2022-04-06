import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, LogBox } from 'react-native';
import firebase from 'firebase/compat/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Provider as PaperProvider, Card, List, Button } from 'react-native-paper';
import Constants from 'expo-constants';

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
} catch (err) {   }
 
function dbListener(path,setData){
   const tb = ref(getDatabase(), path);
   onValue(tb, (snapshot)=>{
     setData(snapshot.val());
   })
}
 
export default function Page1Screen() {
  const [sraplastic , setSraplastic] = React.useState([]);
 
  React.useEffect(() => {
    var auth = getAuth();
    auth.onAuthStateChanged(function (us) {
      setUser(us);
    });
    dbListener("/sraplastic", setSraplastic);
   }, []);

   if(sraplastic.length==0){
    return <Loading/>;
  }

   return (
    <View style={styles.container}>
    <Card style={styles.container}>
    <Card.Cover style={styles.cover} source={require("./assets/cov_plastic.jpg")}/>
    <Card.Title style={styles.title} title="สระพลาสติก"/>
    <Card.Content style={styles.content}>
      <FlatList data={sraplastic} renderItem={renderWaewhere} ></FlatList>
      </Card.Content>
      </Card>
      <StatusBar backgroundColor="#FBE9DD" style="light" barStyle="light-content"/>

    </View>

  );
}

function renderWaewhere({item}){
  return <View>
  <Text style={styles.caption}>คำอธิบาย : {item.caption}</Text>
  <Text style={styles.location}>ตำแหน่งที่ตั้ง :{item.location}  </Text>
  <Text>แผนที่ : {item.map}</Text>
  <Text>เวลาที่ควรมา : {item.time}</Text>
  <Text>กิจกรรมที่แนะนำ : {item.recommend}</Text></View>
}

function Loading(){
  return <View><Text>Loading</Text></View>
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBE9DD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    backgroundColor:"#fdf4ee",
    margin:20,
    borderRadius:10,
    padding:10,
  },
  cover:{
    marginTop:40
  },
  content:{
    backgroundColor:"#fdf4ee",
    margin:20,
    borderRadius:10,
    padding:10,
  },
  caption:{

  }
});
