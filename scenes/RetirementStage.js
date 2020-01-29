import React from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { selectedTeam, leaugeLeaders, setSelectedTeam2, franchise, sortedRoster, conferencesOn, collegeMode, refreshOff, setRefreshOff } from '../data/script';
import Background from '../components/background';
import Picache from 'picache';
import CachedImage from '../components/CachedImage';

export default class RetirementStage extends React.Component{


    render(){

return (
    <Background>
      <ScrollView contentContainerStyle={{paddingBottom: 20}}>


        <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.rosterlist({ selectedTeam: franchise.retirements, back: 'seasonmenu', view: 'retirements' }) }}>
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
          <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{collegeMode ? 'Graduates' : 'Retirements'}</Text>
        </Card>
      </TouchableOpacity>

      <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.coachsettings({}) }}>
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
          <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Manage Coach'}</Text>
        </Card>
      </TouchableOpacity>


        <TouchableOpacity style={{ width: '100%' }} onPress={() => {
        
        
        franchise.stage = collegeMode? 'freeagency' : 'draft', franchise.simStage(), this.props.teamListStage(franchise.stage), collegeMode ? Actions.replace('freeagencystage', {teamListStage : this.props.teamListStage} ) : Actions.replace('draftmenu', { franchise: franchise, teamListStage : this.props.teamListStage}) }}>
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
          <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{collegeMode? 'Advance To Recruiting' : 'Advance To Draft'}</Text>
        </Card>
      </TouchableOpacity>

      {
        !collegeMode? (
          <View>
          <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.communityrosters({filtered: 'DraftClass'}) }}>

          <Card
            containerStyle={{
              width: '95%', backgroundColor: 'rgba(0,0,0,0)',
              borderColor: 'black',
              alignSelf:'center'
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Download Draft Class</Text>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.savesmenu({filtered: '.draftclass', loadOnly: true}) }}>

          <Card
            containerStyle={{
              width: '95%', backgroundColor: 'rgba(0,0,0,0)',
              borderColor: 'black',
              alignSelf:'center'
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Load Local Draft Class</Text>
          </Card>
        </TouchableOpacity>

          </View>
        ): null
      }

      </ScrollView>
    </Background>



  )
        }

        }
