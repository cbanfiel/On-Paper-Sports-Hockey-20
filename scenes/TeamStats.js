import React from 'react';
import { ScrollView, View, TouchableOpacity, Modal } from 'react-native';
import {Icon} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import { sortedRoster, teamStats, franchise } from '../data/script';
import ListItem from '../components/ListItem';
import TeamCardModal from '../components/TeamCardModal';

export default class TeamStats extends React.Component {
  state = {
    modalTeam: null,
    modalVisible: false
  }

  setModalVisible(visible, team) {
    this.setState({ modalVisible: visible, modalTeam: team });
}

  render() {
    return (
      <Background>

{
                    this.state.modalTeam != null ? (
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                            }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    width: '90%',
                                    height: '75%', backgroundColor: 'rgba(255,255,255,.97)', alignSelf: 'center', borderRadius: 25
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setModalVisible(!this.state.modalVisible);
                                        }}
                                        style={{ alignSelf: 'flex-end', padding: 15 }}>
                                        <Icon name="close" ></Icon>
                                    </TouchableOpacity>
                                    <TeamCardModal modalTeam = {this.state.modalTeam}></TeamCardModal>
                                   </View>
                            </View>
                        </Modal>
                    ) : null
                }


        <ScrollView>

          {teamStats().map((team, i) => (
            <ListItem
              title={team.name}
              key={i}
              leftAvatar={team.logoSrc }
              subtitle={'PTS: ' + Math.round(team.seasonPoints/franchise.season.day)
               + ', ' + 'OPPPTS : ' + Math.round(team.seasonPointsAllowed/franchise.season.day) 
               + ', REB: ' + Math.round(team.seasonRebounds/franchise.season.day)
               + ', OREB: ' + Math.round(team.seasonOffRebounds/franchise.season.day)
            + ', FGA ' + Math.round(team.seasonFieldGoalsAttempted/franchise.season.day) 
            + ', FGM ' + Math.round(team.seasonFieldGoalsMade/franchise.season.day) 
            + ', FG% ' + Math.round((team.seasonFieldGoalsMade/team.seasonFieldGoalsAttempted)*100) 
            + ', 3P% ' + Math.round((team.seasonThreesMade/team.seasonThreesAttempted)*100) 
            + ', FTA ' + Math.round((team.seasonFreeThrowsAttempted/franchise.season.day)) 
            + ', FTM ' + Math.round((team.seasonFreeThrowsMade/franchise.season.day)) 
            + ', FT% ' + Math.round((team.seasonFreeThrowsMade/team.seasonFreeThrowsAttempted)*100) 
          
          }
          onLongPress={() => this.setModalVisible(true, team)}
            >
            </ListItem>



          ))}
        </ScrollView>
      </Background>





    )
  }
}