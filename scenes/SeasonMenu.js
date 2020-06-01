import React from 'react';
import { TouchableOpacity, Text, View, ScrollView, Alert } from 'react-native';
import { Card, Divider, Input } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { selectedTeam, leaugeLeaders, setSelectedTeam2, franchise, sortedRoster, conferencesOn, collegeMode, refreshOff, setRefreshOff, saveFranchiseCheaply, loadFranchise, saveFranchise } from '../data/script';
import Background from '../components/background';
import Picache from 'picache';
import CachedImage from '../components/CachedImage';
import CardButton from '../components/CardButton';
import DualButton from '../components/DualButton';
import { requestReview } from '../data/RequestReview';

const simSpeed = 500;
export default class SeasonMenu extends React.Component {

  componentDidMount = () => {
    if(selectedTeam.history.length === 2){
      let timer = setTimeout(() => {
        requestReview('On Paper Sports Hockey');
        timer = null;
      }, 750);
    }
  }

  componentWillUnmount = () => {
    this.stopSim();
  }

  linkTimer = (func) => {
    this.setState({ linked: func });
  }

  updateUnreadNews = () => {
    this.setState({unreadNews: franchise.season.news.newsStories.length - this.state.readNews})
  }

  clearUnreadNewsNotification = () => {
    let readNews = this.state.unreadNews + this.state.readNews;
    this.setState({unreadNews: 0, readNews })
  }

  slowSim = (oneWeek = false) => {
    let timer = setTimeout(
      function () {
        franchise.simDay();
        this.simulateStateChanges();
        this.updateUnreadNews();
        if (franchise.season.day >= franchise.season.games || oneWeek) {
          this.stopSim();
        } else {
          this.slowSim();
        }
      }.bind(this), simSpeed);
    this.setState({ timer: timer });

  }

  stopSim = () => {
    if (this.state.timer != null) {
      clearTimeout(this.state.timer);
      this.setState({ timer: null });
    }

  }

  state = {
    offseason: franchise.advance,
    stage: franchise.stage,
    timer: null,
    firstTeam: selectedTeam.onIce,
    team: selectedTeam,
    nextGame: '',
    previousGame: '',
    saveName: '',
    unreadNews: franchise.season.news.newsStories.length,
    readNews: 0
  }

  //passed to roster
  updateLineup = () => {
    this.setState({ firstTeam: selectedTeam.firstTeam });
  }



  refreshSeasonMenu() {
    Actions.refresh();
  }

  simDay = () => {
    franchise.simDay();
    Actions.refresh();
  }

  simToEnd = () => {
    franchise.simToEnd();
    Actions.refresh();
    this.setState({
      offseason: franchise.advance,
      stage: franchise.stage
    })

  }

  simulateStateChanges = () => {
    this.setState({ team: selectedTeam });

    if (this.state.linked != null) {
      try {
        this.state.linked();
      } catch (err) {
        this.setState({ linked: null });
      }
    }

  }

  update = () => {
    this.setState({
      offseason: franchise.advance,
      stage: franchise.stage
    })
    Actions.refresh();
  }


  setOffSeasonStage = (input) => {

    if (input != 'advance') {
      franchise.stage = input;
      franchise.simStage();
      this.setState({
        stage: franchise.stage
      })
    }
    if (input === 'advance') {
      franchise.stage = input;
      franchise.simStage();
      this.setState({
        stage: '',
        offseason: false
      })
    }
  }


  render() {
    if (this.state.offseason === false) {

      return (
        <Background>

          <ScrollView contentContainerStyle={{paddingBottom: 20}}>
                     
{
            <CardButton variation={1} onPress={() => { Actions.savesmenu({ filtered: 'franchise', saveType: 'Franchise' })}} title={"Save Franchise"} />



            }




            {
              franchise.season.day < franchise.season.games ? (
                <View>

{
                    this.state.timer == null ? (
                      <DualButton  
                    leftTitle={'Simulate Season'}
                    leftOnPress={()=> {this.slowSim()}}
                    rightTitle={'Simulate Game'}
                    rightOnPress={()=> {this.slowSim(true)}}
                    />
                    ) :
                    <CardButton variation={1} onPress={() => { this.stopSim() }} title={"Stop Simulation"} />
                  }

         
                 {
                   this.state.team === this.state.team.schedule[franchise.season.day] ? (
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => {}}>
                    <Card containerStyle={{
                      width: '95%', backgroundColor: 'rgba(0,0,0,0)', borderColor: 'black',
                      alignSelf: 'center'
                    }} >
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.state.team.wins + '-' + (this.state.team.losses-this.state.team.otLosses) + "-" + this.state.team.otLosses}</Text>
                        <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} source={{ uri: this.state.team.logoSrc }} />
                      </View>
                      <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
                      <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Bye'}</Text>
                    </Card>
                  </TouchableOpacity>

                   ):
                  <TouchableOpacity style={{ width: '100%' }} onPress={() => { this.stopSim(), Actions.ingame({ game: franchise.season.manualDay(), season: true, franchise: franchise, updateSeason: this.updateLineup, allowAdjustments: true }) }}>
                    <Card containerStyle={{
                      width: '95%', backgroundColor: 'rgba(0,0,0,0)', borderColor: 'black',
                      alignSelf: 'center'
                    }} >
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ flex:1, textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.state.team.wins + '-' + (this.state.team.losses-this.state.team.otLosses) + "-" + this.state.team.otLosses}</Text>
                        {
                                collegeMode? (
                                  <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro', marginRight:5 }}>{this.state.team.seed <= 25? `#${this.state.team.seed}` : '  '}</Text>
                                ):null
                              }
                        
                        <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} source={{ uri: this.state.team.logoSrc }} />
                        <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5, marginLeft: 20 }} source={{ uri: this.state.team.schedule[franchise.season.day].logoSrc }} />
                        {
                              collegeMode? (
                                <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro', marginLeft:5 }}>{this.state.team.schedule[franchise.season.day].seed <= 25? (`#${this.state.team.schedule[franchise.season.day].seed}`) : '  '}</Text>
                              ):null
                            }
                       
                        <Text style={{ flex:1, textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.state.team.schedule[franchise.season.day].wins + '-' + (this.state.team.schedule[franchise.season.day].losses-this.state.team.schedule[franchise.season.day].otLosses) + "-" + this.state.team.schedule[franchise.season.day].otLosses}</Text>
                      </View>
                      <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
                      <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Play Next Game'}</Text>
                    </Card>
                  </TouchableOpacity>
                 }   
                </View>



              ) :
              <CardButton variation={1} onPress={() => { 
                this.props.teamListStage('playoffs'), 
                franchise.advance = true, 
                franchise.stage = 'playoffs', 
                franchise.simStage(), 
                Actions.replace('playoffmenu', { teamListStage: this.props.teamListStage }) }} 
                title={collegeMode ? 'Advance To Tournament' : 'Advance To Playoffs'} />
            }


            {
              franchise.season.day > 0 ? (null):
              <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.editschedule({franchise: franchise, update: this.update})}>

              <Card
                containerStyle={{
                  width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                  borderColor: 'black',
                  alignSelf: 'center'
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: selectedTeam.logoSrc }} />
                </View>
                <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Edit Schedule'}</Text>
              </Card>
            </TouchableOpacity>

            }











            {
              franchise.season.day > 0 ? (

                this.state.team === this.state.team.schedule[franchise.season.day -1] ? (
                  <TouchableOpacity style={{ width: '100%' }} onPress={() => {}}>
                  <Card containerStyle={{
                    width: '95%', backgroundColor: 'rgba(0,0,0,0)', borderColor: 'black',
                    alignSelf: 'center'
                  }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.state.team.wins + '-' + (this.state.team.losses-this.state.team.otLosses) + "-" + this.state.team.otLosses}</Text>
                      <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} source={{ uri: this.state.team.logoSrc }} />
                    </View>
                    <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Bye'}</Text>
                  </Card>
                </TouchableOpacity>
                ):
                <TouchableOpacity style={{ width: '100%' }} onPress={() => { setSelectedTeam2(selectedTeam.schedule[franchise.season.day - 1]), Actions.gamestats({ currentGame: (franchise.season.day - 1) }) }}>
                  <Card
                    containerStyle={{
                      width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                      borderColor: 'black',
                      alignSelf: 'center'
                    }}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ flex:1 ,textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{selectedTeam.played[franchise.season.day - 1].userScore}</Text>
                      {
                                collegeMode? (
                                  <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro', marginRight:5 }}>{this.state.team.seed <= 25? `#${this.state.team.seed}` : '  '}</Text>
                                ):null
                              }
                      <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} source={{ uri: selectedTeam.logoSrc }} />
                      <Text style={{ textAlign: "center", fontSize: 35, color: selectedTeam.played[franchise.season.day - 1].userScore > selectedTeam.played[franchise.season.day - 1].oppScore ? 'green' : 'red', fontFamily: 'advent-pro' }}>{selectedTeam.played[franchise.season.day - 1].userScore > selectedTeam.played[franchise.season.day - 1].oppScore ? 'W' : 'L'}</Text>
                      <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5, marginLeft: 20 }} source={{ uri: selectedTeam.schedule[franchise.season.day - 1].logoSrc }} />
                      {
                              collegeMode? (
                                <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro', marginLeft:5 }}>{this.state.team.schedule[franchise.season.day-1].seed <= 25? (`#${this.state.team.schedule[franchise.season.day-1].seed}`) : '  '}</Text>
                              ):null
                            }
                      <Text style={{ flex:1 , textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{selectedTeam.played[franchise.season.day - 1].oppScore}</Text>
                    </View>
                    <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Previous Game Results'}</Text>
                  </Card>
                </TouchableOpacity>

              ) : null
            }

{
              
              franchise.season.day > 0 ? (
                <DualButton  
                leftTitle={'League News'}
                leftImage={selectedTeam.logoSrc} 
                leftNotification={this.state.unreadNews}
                leftOnPress={()=> {
                  this.clearUnreadNewsNotification()
                  Actions.news()}}
                rightTitle={'League Scores'}
                rightImage={selectedTeam.logoSrc} 
                rightOnPress={()=> {Actions.othergames({day: franchise.season.day})}}
                />
              ):

              <DualButton  
              leftTitle={'League News'}
              leftImage={selectedTeam.logoSrc} 
              leftNotification={this.state.unreadNews}
              leftOnPress={()=> {
                this.clearUnreadNewsNotification()
                Actions.news()}}
              rightTitle={'Edit Schedule'}
              rightImage={selectedTeam.logoSrc} 
              rightOnPress={()=> Actions.editschedule({franchise: franchise, update: this.update})}
              />
              
            }

<TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.scheduleview({ franchise: franchise, refresh: this.refreshSeasonMenu, linkTimer: this.linkTimer })}>

<Card
  containerStyle={{
    width: '95%', backgroundColor: 'rgba(0,0,0,0)',
    borderColor: 'black',
    alignSelf: 'center'
  }}
>
  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ flex: 1, textAlign: "center", fontSize: 30, color: 'black', fontFamily: 'advent-pro' }}>{'OVR: ' + selectedTeam.rating}</Text>
    <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: selectedTeam.logoSrc }} />
  </View>
  <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
  <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{selectedTeam.name + ' ' + 'Record: ' + selectedTeam.wins + "-" + (selectedTeam.losses-selectedTeam.otLosses) +"-" + selectedTeam.otLosses}</Text>
</Card>
</TouchableOpacity>


            <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.seasonstatsmenu({ linkTimer: this.linkTimer })}>
              <Card
                containerStyle={{
                  width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                  borderColor: 'black',
                  alignSelf: 'center'
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ flex: 1, textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{conferencesOn ? 'Seed #' + selectedTeam.seed : 'Rank #' + selectedTeam.seed}</Text>
                  <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: selectedTeam.logoSrc }} />
                  <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: sortedRoster(selectedTeam, 'ppg')[0].faceSrc }} />
                  <Text style={{ flex: 1, textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{sortedRoster(selectedTeam, 'ppg')[0].seasonGoals + ' GOALS'}</Text>
                </View>
                <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'#' + sortedRoster(selectedTeam, 'ppg')[0].number + ' ' + sortedRoster(selectedTeam, 'ppg')[0].name}</Text>
                <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>

                <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Stats Menu'}</Text>
              </Card>
            </TouchableOpacity>


            <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.seasonrostermenu({ updateLineupState: this.updateLineup })}>
              <Card
                containerStyle={{
                  width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                  borderColor: 'black',
                  alignSelf: 'center'
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Picache style={{ overflow: 'hidden', resizeMode: 'contain', height: 35, width: 35, margin: 5 }} source={{ uri: selectedTeam.logoSrc }} />
                  <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{selectedTeam.name + ' Team Roster'}</Text>
                </View>
                <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'column', alignItems: "flex-start" }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ overflow: 'hidden', resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source={{ uri: selectedTeam.offLine1[0].faceSrc }} />
                      <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'C #' + selectedTeam.offLine1[0].number + ' ' + selectedTeam.offLine1[0].name + ' OVR: ' + selectedTeam.offLine1[0].rating}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ overflow: 'hidden', resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source={{ uri: selectedTeam.offLine1[1].faceSrc }} />
                      <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'LW #' + selectedTeam.offLine1[1].number + ' ' + selectedTeam.offLine1[1].name + ' OVR: ' + selectedTeam.offLine1[1].rating}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ overflow: 'hidden', resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source={{ uri: selectedTeam.offLine1[2].faceSrc }} />
                      <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'RW #' + selectedTeam.offLine1[2].number + ' ' + selectedTeam.offLine1[2].name + ' OVR: ' + selectedTeam.offLine1[2].rating}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ overflow: 'hidden', resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source={{ uri: selectedTeam.defLine1[0].faceSrc }} />
                      <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'D #' + selectedTeam.defLine1[0].number + ' ' + selectedTeam.defLine1[0].name + ' OVR: ' + selectedTeam.defLine1[0].rating}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ overflow: 'hidden', resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source={{ uri: selectedTeam.defLine1[1].faceSrc }} />
                      <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'D #' + selectedTeam.defLine1[1].number + ' ' + selectedTeam.defLine1[1].name + ' OVR: ' + selectedTeam.defLine1[1].rating}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ overflow: 'hidden', resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source={{ uri: selectedTeam.goalies[0].faceSrc }} />
                      <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'G #' + selectedTeam.goalies[0].number + ' ' + selectedTeam.goalies[0].name + ' OVR: ' + selectedTeam.goalies[0].rating}</Text>
                    </View>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          </ScrollView>
        </Background>
      )






    } else {

      if (this.state.stage === 'playoffs') {

        return (
          <Background>
            <ScrollView contentContainerStyle={{paddingBottom: 20}}>

              <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.replace('playoffmenu') }}>
                <Card
                  containerStyle={{
                    width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                    borderColor: 'black',
                    alignSelf: 'center'
                  }}
                >

                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: selectedTeam.logoSrc }} />
                  </View>
                  <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
                  <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Resume Playoffs'}</Text>
                </Card>
              </TouchableOpacity>

            </ScrollView>
          </Background>

        )
      }


      if (this.state.stage === 'draft') {
        return (
          <Background>
            <ScrollView contentContainerStyle={{paddingBottom: 20}}>


              <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.replace('draftmenu', { franchise: franchise, back: 'seasonmenu' }) }}>
                <Card
                  containerStyle={{
                    width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                    borderColor: 'black',
                    alignSelf: 'center'
                  }}
                >

                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: selectedTeam.logoSrc }} />
                  </View>
                  <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
                  <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Resume Draft'}</Text>
                </Card>
              </TouchableOpacity>

            </ScrollView>
          </Background>

        )
      }






      if (this.state.stage === 'retirements') {
        Actions.replace('retirementstage');
      }
      else if (this.state.stage === 'freeagency') {
        Actions.replace('freeagencystage');
      }
      else if (this.state.stage === 'resigning') {
        Actions.replace('resigningstage');
      }

    }

  }
}
