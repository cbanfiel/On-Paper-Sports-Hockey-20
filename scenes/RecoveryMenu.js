import React from 'react';
import { StyleSheet, ScrollView, Text, Clipboard, View, Modal , Alert} from 'react-native';
import { Card, Input, Button, Divider} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native';
import Background from '../components/background';
import {saveData, loadData, loadFromFileSystem } from '../data/script';
import ListItem from '../components/ListItem';
import {AsyncStorage} from 'react-native';



export default class RecoveryMenu extends React.Component {

  componentWillMount(){
      AsyncStorage.getAllKeys((err, keys) =>{
        this.setState({keys : keys})
      })
  }


  saveToFileSystem = (file) =>{
    if(file != null){
    saveData(file);
    }else{
      saveData(this.state.saveName);
    }

    //refresh
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

    Alert.alert('Roster Saved', 'roster ' + this.state.saveName + ' succesfully saved!' );
    this.setState({saved: true, saveName:''});
  }

  
  loadFromFileSystem = (fileName) =>{
    loadFromFileSystem(fileName);
    Actions.popTo('mainmenu');
  };

  deleteFromFileSystem = async (fileName) =>{
    const file = fileName;

    const load = FileSystem.deleteAsync(FileSystem.documentDirectory+"saves/" + file).then((value)=>{
      // console.log(value);
    }).catch((err)=>{
      console.log(err);
    });

       //refresh
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
  };
  

  delete = (item) =>{
    Alert.alert(
      'Would you like to delete roster ' + item + '?',
      'This will delete the selected roster file from your device',
      [
        {
          text: 'Cancel',
          onPress: () => {return},
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            Alert.alert(
              'Are you sure you would like to delete roster ' + item + '?',
              'This action cannot be undone',
              [
                {
                  text: 'Cancel',
                  onPress: () => {return},
                  style: 'cancel',
                },
                {text: 'Delete', onPress: () => {
                  this.deleteFromFileSystem(item);
                }},
              ],
              {cancelable: true},
            );
          },
        },
      ],
      {cancelable: true},
    );

  }

  load = (item) =>{
    Alert.alert(
      'Would you like to load roster ' + item + '?',
      'If your current roster is not saved make sure to save it before loading another roster!',
      [
        {
          text: 'Cancel',
          onPress: () => {return},
          style: 'cancel',
        },
        {text: 'Load', onPress: () => {
            this.loadFromFileSystem(item);


        }},
        {
          text: 'Save',
          onPress: () => {Alert.alert(
            'Would you like to save roster ' + item + '?',
            'This will overwrite this save with your current roster',
            [
              {
                text: 'Cancel',
                onPress: () => {return},
                style: 'cancel',
              },
              {text: 'Save', onPress: () => {
                this.setState({saveName: item});
                  this.saveToFileSystem();
              }},
            ],
            {cancelable: true},
          );},
        },
      ],
      {cancelable: true},
    );


    
  }

  state={
    keys: [],
    saved: false,
    saveName: ''
  }




  saveData = () =>{
    if(this.state.saveName.length <= 0){
      Alert.alert('Please enter a save name', 'You must enter a save name to save your roster file' );
      return;
    }
    saveData(this.state.saveName), this.getKeys();
    Alert.alert('Roster Saved', 'roster ' + this.state.saveName + ' succesfully saved!' );
    this.setState({saved: true, saveName:''});
    

    
  }

  // componentWillMount(){
  //   console.log(FileSystem.getInfoAsync('file://' + FileSystem.documentDirectory));
  // }




  render() {
    return (

      <Background>
        <View style={{flexDirection:'column', backgroundColor:'rgba(255,255,255,0)', padding:10}}>
        <Text style={{ textAlign: "center", fontSize: 14, color: 'black', fontFamily: 'advent-pro', margin:5 }}>{'Note: Sliders are saved and loaded with rosters'}</Text>
        <Text style={{ textAlign: "center", fontSize: 14, color: 'black', fontFamily: 'advent-pro', margin: 5 }}>{'To delete a save press and hold the desired save file until the delete prompt appears...'}</Text>
        </View>

{
    this.state.saved?
    null :
    <Input containerStyle = {{backgroundColor:'rgba(255,255,255,0)', padding: 15}} onChangeText={value => this.setState({ saveName: value })} placeholder={'Enter a save name'} placeholderTextColor={'rgb(80,80,80)'} inputStyle={{ color: 'black', fontFamily: 'advent-pro', textAlign:'center' }} >{this.state.saveName}</Input>
}
        <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, borderTopWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(255,255,255,0)'}} title= {!this.state.saved? "Save Current Roster" : "Roster Saved Successfully"} disabled={this.state.saved} disabledStyle={{ backgroundColor:'rgba(10,200,60,0.75)',  padding: 15 , borderRadius:0, borderBottomWidth:1, borderColor: 'rgba(255,255,255,0)'}} disabledTitleStyle={{fontFamily: 'advent-pro', color:'black'}} onPress={() => { this.saveToFileSystem() }}></Button>

        <ScrollView contentContainerStyle={{paddingBottom: 20}}>
        {this.state.keys.map((item, i) => (
                        <ListItem titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} subtitleStyle={{ fontFamily: 'advent-pro' }} containerStyle={{ backgroundColor: 'rgba(255,255,255,0)' }} 
                        onPress={() => {this.load(item)}} 
                        onLongPress={() => {this.delete(item)}}
                        title={item} 
                        rightTitleStyle={{fontFamily:'advent-pro'}}
                        key={i} 
                        ></ListItem>
                    ))}
        </ScrollView>


        {/* <Button titleStyle={{ fontFamily: 'advent-pro', color:'white' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,0,0,0.75)', borderColor: 'rgba(255,255,255,0)'}} title= {"Delete All Saves"} onPress={() => { this.deleteAllSaves() }}></Button> */}


        
         
      </Background>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
