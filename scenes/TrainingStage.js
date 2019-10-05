import React from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { selectedTeam, leaugeLeaders, setSelectedTeam2, franchise, sortedRoster, conferencesOn, collegeMode, refreshOff, setRefreshOff } from '../data/script';
import Background from '../components/background';
import Picache from 'picache';
import CachedImage from '../components/CachedImage';

export default class TrainingStage extends React.Component{


    render(){

return (
    <Background>
      <ScrollView contentContainerStyle={{paddingBottom: 20}}>


        <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.rosterlist({view: 'training', selectedTeam: selectedTeam})}}>
         <Card
          containerStyle={{
            width: '95%', backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'black',
            alignSelf:'center'
          }}
          >

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source = {{uri: selectedTeam.logoSrc }} />
          </View>
          <Divider style={{backgroundColor:'black' ,  height:1, margin:5}} ></Divider>
          <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Training Focus'}</Text>
        </Card>
      </TouchableOpacity>

      {
    collegeMode?(
      <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.rosterlist({view: 'redshirt', selectedTeam: selectedTeam})}}>
         <Card
          containerStyle={{
            width: '95%', backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'black',
            alignSelf:'center'
          }}
          >

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source = {{uri: selectedTeam.logoSrc }} />
          </View>
          <Divider style={{backgroundColor:'black' ,  height:1, margin:5}} ></Divider>
          <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Redshirt Players'}</Text>
        </Card>
      </TouchableOpacity>):null




}


        <TouchableOpacity style={{ width: '100%' }} onPress={() => {franchise.stage = "advance", franchise.simStage(), this.props.teamListStage(franchise.stage), Actions.replace('seasonmenu', {teamListStage: this.props.teamListStage})}}>
        <Card
          containerStyle={{
            width: '95%', backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'black',
            alignSelf:'center'
          }}
          >

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Picache style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source = {{uri: selectedTeam.logoSrc }}/>
          </View>
          <Divider style={{backgroundColor:'black' ,  height:1, margin:5}} ></Divider>
          <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Advance To Season'}</Text>
        </Card>
      </TouchableOpacity>


      </ScrollView>
    </Background>



  )
        }

        }
