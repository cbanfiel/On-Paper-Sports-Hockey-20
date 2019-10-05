import React from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { franchise, selectedTeam, collegeMode } from '../data/script';
import Background from '../components/background';
import CachedImage from '../components/CachedImage';

export default class PlayoffMenu extends React.Component {
    back(){
        franchise.advance = true;
        franchise.stage = 'retirements';
        franchise.simStage();
        Actions.refresh();
        Actions.seasonmenu();
    }

    state={
      matchups : this.userFirstOrder()
    }

    updateState = () =>{
      this.setState({matchups: this.userFirstOrder()})
    }

    advanceToRetirements(){
      this.props.teamListStage('retirements');
      franchise.advance = true;
      franchise.stage = 'retirements';
      franchise.simStage();
      Actions.replace('retirementstage', {teamListStage : this.props.teamListStage});
    }

    userFirstOrder(){
      let matchups = franchise.playoffs.matchups;
      let match = null;
      for(let i=0; i<matchups.length; i++){
        if(matchups[i].team1 === selectedTeam || matchups[i].team2 === selectedTeam){
          match = matchups[i];
          break;
        }
      }

      if(match == null){
        return matchups;
      }else{
        let newOrder = matchups;
        newOrder.splice(newOrder.indexOf(match), 1);
        newOrder.unshift(match);
        return newOrder;
      }
    }
   
    render (){


        
    return (

      <Background>
        <ScrollView contentContainerStyle={{paddingBottom: 20}}>

          {
            !franchise.playoffs.completed ? (
              !franchise.playoffs.advance ? (
                <View>

                  <TouchableOpacity style={{ width: '100%' }} onPress={() => { franchise.playoffs.simDay(), this.updateState()}}>

                    <Card
                      containerStyle={{
                        width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                        borderColor: 'black',
                        alignSelf:'center'
                      }}
                    >
                      <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Sim Game</Text>
                    </Card>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ width: '100%' }} onPress={() => { franchise.playoffs.simRound(), this.updateState() }}>

                    <Card
                      containerStyle={{
                        width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                        borderColor: 'black',
                        alignSelf:'center'
                      }}
                    >
                      <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Sim Round</Text>
                    </Card>
                  </TouchableOpacity>
                </View>


              ) :
                <TouchableOpacity style={{ width: '100%' }} onPress={() => { franchise.playoffs.simDay(), this.updateState() }}>

                  <Card
                    containerStyle={{
                      width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                      borderColor: 'black',
                      alignSelf:'center'
                    }}
                  >
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Advance To Next Round</Text>
                  </Card>
                </TouchableOpacity>

            ) : null

          }

          {this.state.matchups.map((matchup, key) => (
            <TouchableOpacity style={{ width: '100%' }} key={key} onPress={()=> {matchup.winner==null ? Actions.ingame({game: matchup.manualGame(), playoffs:true, series: matchup, franchise:franchise, updateState: this.updateState, allowAdjustments: true}): null}}>

              <Card
                containerStyle={{
                  width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                  borderColor: 'black',
                  alignSelf:'center'
                }}
                
              >
                <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{matchup.game > 1 ? 'Game : ' + (matchup.game - 1) : null}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ flex: 1, textAlign: 'center', fontSize: 35, color: 'black', fontFamily: 'advent-pro' }}>{matchup.game > 1 ? matchup.results[matchup.game - 2].team1Score : null}</Text>
                {
                  collegeMode?
                  <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro', marginRight:5 }}>{matchup.team1.seed <= 25 ? `#${matchup.team1.seed}` : '  '}</Text>
                  :null
                }

                  <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} uri = {matchup.team1.logoSrc } />
                  <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5, marginLeft: 20 }} uri = {matchup.team2.logoSrc } />
                  {
                  collegeMode?
                  <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro', marginRight:5 }}>{matchup.team2.seed <= 25 ? `#${matchup.team2.seed}` : '  '}</Text>
                  :null
                } 
                  <Text style={{ flex: 1, textAlign: 'center', fontSize: 35, color: 'black', fontFamily: 'advent-pro' }}>{matchup.game > 1 ? matchup.results[matchup.game - 2].team2Score : null}</Text>
                </View>

                <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{matchup.game > 1 ? matchup.team1Wins > matchup.team2Wins ? matchup.team1.name + ' Leads ' + matchup.team1Wins + '-' + matchup.team2Wins : matchup.team2Wins > matchup.team1Wins ? matchup.team2.name + ' Leads ' + matchup.team2Wins + '-' + matchup.team1Wins : 'Series Tied ' + matchup.team2Wins + '-' + matchup.team1Wins : null}</Text>
              </Card>
            </TouchableOpacity>
          ))}
          {
            franchise.playoffs.completed ? (
              <TouchableOpacity style={{ width: '100%' }} onPress={() => {this.advanceToRetirements()}}>
              <Card
                containerStyle={{
                  width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                  borderColor: 'black',
                  alignSelf:'center'
                }}
                >

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri = {selectedTeam.logoSrc }/>
                </View>
                <Divider style={{backgroundColor:'black' ,  height:1, margin:5}} ></Divider>
                <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Advance To Offseason'}</Text>
              </Card>
            </TouchableOpacity>
            ) : null
          }



        </ScrollView>
      </Background>


    )
    




  }
}