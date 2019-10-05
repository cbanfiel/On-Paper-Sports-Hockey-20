import React from 'react';
import { ScrollView, View, TouchableOpacity, Modal } from 'react-native';
import {Icon} from 'react-native-elements';
import { selectedTeam, collegeMode } from '../data/script';
import Background from '../components/background';
import TeamHeader from '../components/TeamHeader';
import ListItem from '../components/ListItem';
import TeamCardModal from '../components/TeamCardModal';

export default class ScheduleView extends React.Component {

  

  componentWillMount(){
    if(this.props.linkTimer != null){
      this.props.linkTimer(this.setTeam);
    }
  }

  setModalVisible(visible, team) {
    this.setState({ modalVisible: visible, modalTeam: team });
}

  componentWillUnmount(){
    if(this.props.linkTimer != null){
      this.props.linkTimer(null);
    }
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
    modalVisible: false
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

        <TeamHeader selectedTeam={selectedTeam} season={true}></TeamHeader>

        <ScrollView contentContainerStyle={{paddingBottom: 20}}>

          {this.state.team.schedule.map((team, i) => (
            this.state.team === team? (
              null
            ):
            <ListItem title={"Game " + (i + 1) + ":" + this.getTitle(team)} key={i} leftAvatar={team.logoSrc } 
            subtitle={this.state.team.played[i] != null ? this.state.team.played[i].userScore + '-' + this.state.team.played[i].oppScore : null} 
            rightTitleStyle={this.state.team.played[i] != null ? this.state.team.played[i].won ? {color:'green', fontFamily: 'advent-pro', fontSize:25, textAlign:'center'} : {color:'red', fontFamily: 'advent-pro', fontSize:25, textAlign:'center'} : null}
            rightTitle={this.state.team.played[i] != null ? this.state.team.played[i].won ? 'W' : 'L' : null}
            onLongPress={() => this.setModalVisible(true, team)}
            
            ></ListItem>
          ))}
        </ScrollView>
      </Background>





    )
  }
}