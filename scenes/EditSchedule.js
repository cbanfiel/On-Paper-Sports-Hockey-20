import React from 'react';
import { ScrollView, View, TouchableOpacity, Modal, Text } from 'react-native';
import {Icon, Divider} from 'react-native-elements';
import { selectedTeam, collegeMode, teams } from '../data/script';
import Background from '../components/background';
import TeamHeader from '../components/TeamHeader';
import ListItem from '../components/ListItem';
import TeamCardModal from '../components/TeamCardModal';
import { Actions } from 'react-native-router-flux';

export default class EditSchedule extends React.Component {


  setModalVisible(visible, team) {
    this.setState({ modalVisible: visible, modalTeam: team });
}

update = () => {
    this.setState({team: selectedTeam, scheduleRank:this.scheduleRank()}, () => {
        Actions.pop();
        this.props.update();


    });
}

scheduleRank = () => {
    teams.sort(function (a, b) {
        if (a.scheduleRating > b.scheduleRating) return -1;
        if (a.scheduleRating < b.scheduleRating) return 1;
        return 0;
      });

      for(let i=0; i<teams.length; i++){
          if(teams[i] == selectedTeam){
              return i+1;
          }
      }
}

swapTeam = (team, i) =>{
    let originalTeam = selectedTeam.schedule[i];
    let oppOriginalTeam = team.schedule[i];
 
    originalTeam.schedule[i] = oppOriginalTeam;
    oppOriginalTeam.schedule[i] = originalTeam;
    team.schedule[i] = selectedTeam;
    selectedTeam.schedule[i] = team;
    if(originalTeam == selectedTeam){
        oppOriginalTeam.schedule[i] = oppOriginalTeam;
    }
    if(oppOriginalTeam == team){
        originalTeam.schedule[i] = originalTeam;
    }
    originalTeam.generateScheduleRating();
    oppOriginalTeam.generateScheduleRating();
    selectedTeam.generateScheduleRating();
    team.generateScheduleRating();

    
}

  getTitle(team){
    if(collegeMode && team.seed<=25){
      return  ` #${team.seed} ${team.name}`
    }
    else{
      return ` ${team.name}`
    }
  }

  state = {
    team: selectedTeam,
    modalTeam: null, 
    modalVisible: false,
    scheduleRank: this.scheduleRank()
  }

  setTeam = () =>{
    this.setState({team: selectedTeam})
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
                                    width: '95%',
                                    height: '75%', backgroundColor: 'rgba(255,255,255,1)', alignSelf: 'center', 
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

        <TeamHeader selectedTeam={selectedTeam} season={true} subText={'Schedule Rank: #' + this.state.scheduleRank }></TeamHeader>
       

        <ScrollView contentContainerStyle={{paddingBottom: 20}}>

          {this.state.team.schedule.map((team, i) => (
            this.state.team === team? (
                <ListItem title={"Game " + (i + 1) + ": BYE WEEK"} key={i}
                onPress={() => {Actions.teamlist({home:7, swapTeam: this.swapTeam, week: i, update: this.update})}}
                ></ListItem>
            ):
            <ListItem title={"Game " + (i + 1) + ":" + this.getTitle(team)} key={i} leftAvatar={team.logoSrc } 
            subtitle={`Rating: ${team.rating}`} 
            rightTitleStyle={this.state.team.played[i] != null ? this.state.team.played[i].won ? {color:'green', fontFamily: 'advent-pro', fontSize:25, textAlign:'center'} : {color:'red', fontFamily: 'advent-pro', fontSize:25, textAlign:'center'} : null}
            rightTitle={this.state.team.played[i] != null ? this.state.team.played[i].won ? 'W' : 'L' : null}
            onPress={() => {Actions.teamlist({home:7, swapTeam: this.swapTeam, week: i, update: this.update})}}
            onLongPress={() => this.setModalVisible(true, team)}
            
            ></ListItem>
          ))}
        </ScrollView>
      </Background>





    )
  }
}