import React from 'react';
import { TouchableOpacity, Text, View, ScrollView, Alert } from 'react-native';
import { Card, Divider, Input } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { selectedTeam, leaugeLeaders, setSelectedTeam2, franchise, sortedRoster, conferencesOn, collegeMode, refreshOff, setRefreshOff, saveFranchiseCheaply, loadFranchise, saveFranchise } from '../data/script';
import Background from '../components/background';
import Picache from 'picache';
import CachedImage from '../components/CachedImage';



export default class SeasonMenu extends React.Component {

  componentWillUnmount = () => {
    this.stopSim();
  }

  linkTimer = (func) => {
    this.setState({ linked: func });
  }

  saveFranchise = () => {
    
  }


  slowSim = () => {
    let timer = setTimeout(
      function () {
        franchise.simDay();
        this.simulateStateChanges();
        if (franchise.season.day >= franchise.season.games) {
          this.stopSim();
        } else {
          this.slowSim();
        }
      }.bind(this), 500);
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
    firstTeam: selectedTeam.firstTeam,
    team: selectedTeam,
    nextGame: '',
    previousGame: '',
    saveName: ''

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

          <ScrollView >


            {
              // <TouchableOpacity style={{ width: '100%' }} onPress={() => { franchise.sim20(), Actions.refresh() }}>

              //   <Card
              //     containerStyle={{
              //       width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
              //       borderRadius: 25,
              //       alignSelf:'center'
              //     }}
              //   >
              //     <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>Sim 20 Years</Text>
              //   </Card>
              // </TouchableOpacity>

            }

                     
{
              <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.savesmenu({filtered: 'franchise', saveType: 'Franchise'}) }}>

                <Card
                  containerStyle={{
                    width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                    borderRadius: 25,
                    alignSelf: 'center'
                  }}
                >
                  <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>Save Franchise</Text>
                </Card>
              </TouchableOpacity>


            }





            {
              franchise.season.day < franchise.season.games ? (
                <View>

                  <TouchableOpacity style={{ width: '100%' }} onPress={() => { this.state.timer == null ? this.slowSim() : this.stopSim() }}>
                    <Card containerStyle={{
                      width: '90%', backgroundColor: 'rgba(0,0,0,0.75)', borderRadius: 25,
                      alignSelf: 'center'
                    }} >
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      </View>
                      <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{this.state.timer == null ? ('Start Simulation') : 'Stop Simulation'}</Text>
                    </Card>
                  </TouchableOpacity>

         

                  <TouchableOpacity style={{ width: '100%' }} onPress={() => { this.stopSim(), Actions.ingame({ game: franchise.season.manualDay(), season: true, franchise: franchise, updateSeason: this.updateLineup, allowAdjustments: true }) }}>
                    <Card containerStyle={{
                      width: '90%', backgroundColor: 'rgba(0,0,0,0.75)', borderRadius: 25,
                      alignSelf: 'center'
                    }} >
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{this.state.team.wins + '-' + this.state.team.losses}</Text>
                        <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} source={{ uri: this.state.team.logoSrc }} />
                        <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5, marginLeft: 20 }} source={{ uri: this.state.team.schedule[franchise.season.day].logoSrc }} />
                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{this.state.team.schedule[franchise.season.day].wins + '-' + this.state.team.schedule[franchise.season.day].losses}</Text>
                      </View>
                      <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
                      <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Play Next Game'}</Text>
                    </Card>
                  </TouchableOpacity>
                </View>



              ) : null
            }
            <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.scheduleview({ franchise: franchise, refresh: this.refreshSeasonMenu, linkTimer: this.linkTimer })}>

              <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25,
                  alignSelf: 'center'
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ flex: 1, textAlign: "center", fontSize: 30, color: 'white', fontFamily: 'advent-pro' }}>{'OVR: ' + selectedTeam.rating}</Text>
                  <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: selectedTeam.logoSrc }} />
                </View>
                <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{selectedTeam.name + ' ' + 'Record: ' + selectedTeam.wins + "-" + selectedTeam.losses}</Text>
              </Card>
            </TouchableOpacity>








            {
              franchise.season.day > 0 ? (

                <TouchableOpacity style={{ width: '100%' }} onPress={() => { setSelectedTeam2(selectedTeam.schedule[franchise.season.day - 1]), Actions.gamestats({ currentGame: (franchise.season.day - 1) }) }}>

                  <Card
                    containerStyle={{
                      width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                      borderRadius: 25,
                      alignSelf: 'center'
                    }}

                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{selectedTeam.played[franchise.season.day - 1].userScore}</Text>
                      <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} source={{ uri: selectedTeam.logoSrc }} />
                      <Text style={{ textAlign: "center", fontSize: 35, color: selectedTeam.played[franchise.season.day - 1].userScore > selectedTeam.played[franchise.season.day - 1].oppScore ? 'green' : 'red', fontFamily: 'advent-pro' }}>{selectedTeam.played[franchise.season.day - 1].userScore > selectedTeam.played[franchise.season.day - 1].oppScore ? 'W' : 'L'}</Text>
                      <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5, marginLeft: 20 }} source={{ uri: selectedTeam.schedule[franchise.season.day - 1].logoSrc }} />
                      <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{selectedTeam.played[franchise.season.day - 1].oppScore}</Text>

                    </View>
                    <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Previous Game Results'}</Text>
                  </Card>
                </TouchableOpacity>


              ) : null
            }

            <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.seasonstatsmenu({ linkTimer: this.linkTimer })}>
              <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25,
                  alignSelf: 'center'
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ flex: 1, textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{conferencesOn ? 'Seed #' + selectedTeam.seed : 'Rank #' + selectedTeam.seed}</Text>
                  <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: selectedTeam.logoSrc }} />
                  <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: sortedRoster(selectedTeam, 'ppg')[0].faceSrc }} />
                  <Text style={{ flex: 1, textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{sortedRoster(selectedTeam, 'ppg')[0].statsHistory.length > 0 ? (Math.round((sortedRoster(selectedTeam, 'ppg')[0].seasonPoints / sortedRoster(selectedTeam, 'ppg')[0].statsHistory.length) * 10) / 10) + ' PPG' : null}</Text>
                </View>
                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'#' + sortedRoster(selectedTeam, 'ppg')[0].number + ' ' + sortedRoster(selectedTeam, 'ppg')[0].name}</Text>
                <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>

                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Stats Menu'}</Text>
              </Card>
            </TouchableOpacity>


            <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.seasonrostermenu({ updateLineupState: this.updateLineup })}>
              <Card
                containerStyle={{
                  width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                  borderRadius: 25,
                  alignSelf: 'center'
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Picache style={{ overflow: 'hidden', resizeMode: 'contain', height: 35, width: 35, margin: 5 }} source={{ uri: selectedTeam.logoSrc }} />
                  <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{selectedTeam.name + ' Team Roster'}</Text>
                </View>
                <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'column', alignItems: "flex-start" }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ overflow: 'hidden', resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source={{ uri: this.state.firstTeam[0].faceSrc }} />
                      <Text style={{ textAlign: "center", fontSize: 15, color: 'white', fontFamily: 'advent-pro' }}>{'PG #' + this.state.firstTeam[0].number + ' ' + this.state.firstTeam[0].name + ' OVR: ' + this.state.firstTeam[0].rating}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ overflow: 'hidden', resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source={{ uri: this.state.firstTeam[1].faceSrc }} />
                      <Text style={{ textAlign: "center", fontSize: 15, color: 'white', fontFamily: 'advent-pro' }}>{'SG #' + this.state.firstTeam[1].number + ' ' + this.state.firstTeam[1].name + ' OVR: ' + this.state.firstTeam[1].rating}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ overflow: 'hidden', resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source={{ uri: this.state.firstTeam[2].faceSrc }} />
                      <Text style={{ textAlign: "center", fontSize: 15, color: 'white', fontFamily: 'advent-pro' }}>{'SF #' + this.state.firstTeam[2].number + ' ' + this.state.firstTeam[2].name + ' OVR: ' + this.state.firstTeam[2].rating}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ overflow: 'hidden', resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source={{ uri: this.state.firstTeam[3].faceSrc }} />
                      <Text style={{ textAlign: "center", fontSize: 15, color: 'white', fontFamily: 'advent-pro' }}>{'PF #' + this.state.firstTeam[3].number + ' ' + this.state.firstTeam[3].name + ' OVR: ' + this.state.firstTeam[3].rating}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ overflow: 'hidden', resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source={{ uri: this.state.firstTeam[4].faceSrc }} />
                      <Text style={{ textAlign: "center", fontSize: 15, color: 'white', fontFamily: 'advent-pro' }}>{'C #' + this.state.firstTeam[4].number + ' ' + this.state.firstTeam[4].name + ' OVR: ' + this.state.firstTeam[4].rating}</Text>
                    </View>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>




            {
              franchise.season.day < franchise.season.games ? (
                <TouchableOpacity style={{ width: '100%' }} onPress={this.simToEnd}>
                  <Card
                    containerStyle={{
                      width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                      borderRadius: 25,
                      alignSelf: 'center'
                    }}
                  >

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: selectedTeam.logoSrc }} />
                    </View>
                    <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Sim To End Of Season'}</Text>
                  </Card>
                </TouchableOpacity>
              ) :
                <TouchableOpacity style={{ width: '100%' }} onPress={() => { this.props.teamListStage('playoffs'), franchise.advance = true, franchise.stage = 'playoffs', franchise.simStage(), Actions.replace('playoffmenu', { teamListStage: this.props.teamListStage }) }}>
                  <Card
                    containerStyle={{
                      width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                      borderRadius: 25,
                      alignSelf: 'center'
                    }}
                  >

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: selectedTeam.logoSrc }} />
                    </View>
                    <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{collegeMode ? 'Advance To Tournament' : 'Advance To Playoffs'}</Text>
                  </Card>
                </TouchableOpacity>
            }


          </ScrollView>
        </Background>
      )






    } else {

      if (this.state.stage === 'playoffs') {

        return (
          <Background>
            <ScrollView>

              <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.replace('playoffmenu') }}>
                <Card
                  containerStyle={{
                    width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                    borderRadius: 25,
                    alignSelf: 'center'
                  }}
                >

                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: selectedTeam.logoSrc }} />
                  </View>
                  <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
                  <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Resume Playoffs'}</Text>
                </Card>
              </TouchableOpacity>

            </ScrollView>
          </Background>

        )
      }


      if (this.state.stage === 'draft') {
        return (
          <Background>
            <ScrollView>


              <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.replace('draftmenu', { franchise: franchise, back: 'seasonmenu' }) }}>
                <Card
                  containerStyle={{
                    width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                    borderRadius: 25,
                    alignSelf: 'center'
                  }}
                >

                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: selectedTeam.logoSrc }} />
                  </View>
                  <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
                  <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Resume Draft'}</Text>
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
