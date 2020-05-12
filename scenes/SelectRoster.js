import React from 'react';
import { StyleSheet, ScrollView, Text, Clipboard, View, Modal , Alert} from 'react-native';
import { Card, Input, Button, Divider} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native';
import Background from '../components/background';
import {saveData, loadData, loadFromFileSystem, manageSaveName, saveFranchise } from '../data/script';
import ListItem from '../components/ListItem';
import * as FileSystem from 'expo-file-system';




export default class SelectRoster extends React.Component {

  componentWillMount = async ()=>{
    const loadDir = FileSystem.readDirectoryAsync(FileSystem.documentDirectory+"saves/").then((value)=>{
      console.log(value);
      this.setState({keys:value})
    }).catch((err)=>{
      console.log(err);
      FileSystem.makeDirectoryAsync(FileSystem.documentDirectory+"saves/").then((value)=>{
        console.log(value);
      }).catch((error)=>{
        console.log(error);
      });
    });
  }

  load = async (item) =>{
      if(item){
          const load = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "saves/" + item).then((value) => {
              let ros = JSON.parse(value);
              let type = item.substring(item.indexOf('.') + 1, item.length);
              if(type == 'franchise'){
                type = 'roster';
              }
              this.props.setSelectedRoster({data: ros, name: item.substring(0, item.indexOf('.')), type})
          })
      }else{
          this.props.setSelectedRoster(null)
      }
  }

  state={
    keys: [],
  }
  render() {
    return (
      <Background>
  <View style={{flexDirection:'column', backgroundColor:'rgba(0,0,0,0)', padding:10}}>
  <Text style={{ textAlign: "center", fontSize: 14, color: 'black', fontFamily: 'advent-pro', margin:5 }}>{'Note: Sliders are saved and loaded with rosters'}</Text>
  <Text style={{ textAlign: "center", fontSize: 14, color: 'black', fontFamily: 'advent-pro', margin: 5 }}>{'To delete a save press and hold the desired save file until the delete prompt appears...'}</Text>
  </View>
        <ScrollView contentContainerStyle={{paddingBottom: 20}}>

                        <ListItem titleStyle={{ fontFamily: 'advent-pro' , color: 'black'}} subtitleStyle={{ fontFamily: 'advent-pro' , color: 'black'}} containerStyle={{ backgroundColor: 'rgba(255,255,255,0)' }} 
                        onPress={() => {this.load(null)}} 
                        title={'Current Roster'} 
                        rightTitle={'ROSTER'}
                        rightTitleStyle={{fontFamily:'advent-pro'}}
                        ></ListItem>


        {this.state.keys.map((item, i) => (
                        <ListItem titleStyle={{ fontFamily: 'advent-pro' , color: 'black'}} subtitleStyle={{ fontFamily: 'advent-pro' , color: 'black'}} containerStyle={{ backgroundColor: 'rgba(255,255,255,0)' }} 
                        onPress={() => {this.load(item)}} 
                        title={item.substring(0, item.indexOf('.'))} 
                        rightTitle={item.substring(item.indexOf('.') + 1, item.length).toUpperCase()}
                        rightTitleStyle={{fontFamily:'advent-pro'}}
                        key={i} 
                        ></ListItem>
                    ))}
        </ScrollView>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
