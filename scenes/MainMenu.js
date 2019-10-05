import React from 'react';
import { StyleSheet, ScrollView, Text, View, Alert, Image } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native';
import Background from '../components/background';
import { home, away, selectedTeam, generated1, generated2, generated3, generated4, teams, menuDisplayTeams} from '../data/script';
import CachedImage from '../components/CachedImage';
import {Updates} from 'expo';
export default class MainMenu extends React.Component {

  // componentDidMount(){
  //   Alert.alert('7/7/19 Patch Notes:', 
  //   "-In college mode players can now graduate early \n-In college mode you can now save graduates as draft classes for use in other \n");
  // }

  static async onEnter(){
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        Alert.alert('New Update Available Restart Now?', '', [
          {
            text: 'Cancel',
            onPress: () => {return},
            style: 'cancel',
          },
          {
            text: 'Restart',
            onPress: () => {Updates.reloadFromCache();},
          },
        ]);
        
      }
    } catch (e) {
    }
  }

  // shuffles menu teams
  // static onExit(){
  //   menuDisplayTeams();
  // }




  startFranchise(){
    Actions.teamlist({ home: 4, updateState: this.update })



    // if(teams.length % 2 == 0 ){
    //   if(teams.length >= 4){
    //     Actions.teamlist({ home: 4, updateState: this.update })
    //   }else{
    //     Alert.alert('LESS THAN 4 TEAMS','Currently for franchise mode you must have at least 4 teams' );

    //   }
    // }else{
    // Alert.alert('UNEVEN NUMBER OF TEAMS','Currently for franchise mode you must have an even number of teams, create another team or remove a team to start!' );
    // }

  }


  state = {
    team: selectedTeam
  }

  update = () =>{
    menuDisplayTeams();
    this.setState({team: selectedTeam});
  }

  render() {
    return (

      <Background>
        <ScrollView contentContainerStyle={{paddingBottom: 20}}>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.selectteams()}>

            <Card
              containerStyle={{
                width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
              }}
              >
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'OVR: ' + home.rating}</Text>
                <CachedImage
                 style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} uri={home.logoSrc } />
                <CachedImage
                 style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginLeft: 20 }} uri={away.logoSrc } />
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'OVR: ' + away.rating}</Text>

              </View>
              <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Play Game'}</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => this.startFranchise()}>

            <Card
              containerStyle={{
                width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
              }}
              >
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginLeft: 20 }} uri={this.state.team.logoSrc } />
                <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} uri={this.state.team.roster[0].faceSrc } />

              </View>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.state.team.roster[0].positionString + ' #' + this.state.team.roster[0].number + ' ' + this.state.team.roster[0].name}</Text>
              <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Franchise Mode'}</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.teamlist({ home: 5, updateState: this.update })}>

            <Card
              containerStyle={{
                width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
              }}
              >
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginLeft: 20 }} uri={generated1.logoSrc } />
                <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} uri={generated1.roster[0].faceSrc } />

              </View>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{generated1.roster[0].positionString + ' #' + generated1.roster[0].number + ' ' + generated1.roster[0].name}</Text>
              <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Edit Team Rosters'}</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.createteammenu()}>

<Card
  containerStyle={{
    width:'95%', alignSelf:'center', backgroundColor:'rgba(255,255,255,0)', borderColor:'rgba(0,0,0,0.9)'
  }}
  >
  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
    <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginLeft: 20 }} uri={generated3.logoSrc } />
    <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} uri={generated3.roster[0].faceSrc } />

  </View>
  <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{generated3.roster[0].positionString + ' #' + generated3.roster[0].number + ' ' + generated3.roster[0].name}</Text>
  <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
  <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Create A Team'}</Text>
</Card>
</TouchableOpacity>

<TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.createaplayermenu()}>

<Card
  containerStyle={{
    width:'95%', alignSelf:'center', backgroundColor:'rgba(255,255,255,0)', borderColor:'rgba(0,0,0,0.9)'
  }}
  >
  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
    <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginLeft: 20 }} uri={generated4.logoSrc } />
    <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} uri={generated4.roster[0].faceSrc } />

  </View>
  <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{generated4.roster[0].positionString + ' #' + generated4.roster[0].number + ' ' + generated4.roster[0].name}</Text>
  <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
  <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Create A Player'}</Text>
</Card>
</TouchableOpacity>




          <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.optionsmenu({update: this.update})}>
          <Card
              containerStyle={{
                width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
              }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginLeft: 20 }} uri={generated2.logoSrc } />
                <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} uri={generated2.roster[0].faceSrc } />

              </View>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{generated2.roster[0].positionString + ' #' + generated2.roster[0].number + ' ' + generated2.roster[0].name}</Text>
              <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Options'}</Text>
            </Card>
          </TouchableOpacity>
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
