import React from 'react';
import { ScrollView, View, TouchableOpacity, Modal } from 'react-native';
import {Icon} from 'react-native-elements';
import { standings } from '../data/script';
import Background from '../components/background';
import ListItem from '../components/ListItem';
import TeamCardModal from '../components/TeamCardModal';

export default class Standings extends React.Component {
  // setTeam = (team) => {
  //   setSelectedTeam(team);
  //   Actions.seasonmenu();
  // }
  componentWillMount(){
    if(this.props.linkTimer != null){
      this.props.linkTimer(this.update);
    }
  }

  componentWillUnmount(){
    if(this.props.linkTimer != null){
      this.props.linkTimer(null);
    }
  }

  setModalVisible(visible, team) {
    this.setState({ modalVisible: visible, modalTeam: team });
}

  state = {
    standings: standings(this.props.conferenceId),
    modalTeam: null, 
    modalVisible: false
  }

  update = () => {
    this.setState({standings: standings(this.props.conferenceId)});
  }


  render() {
    let standingsArr = standings(this.props.conferenceId);
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

        <ScrollView contentContainerStyle={{paddingBottom: 20}}>

          {this.state.standings.map((team,i) => (
            <ListItem
             title={i+1 + '. ' + team.name} 
             key={team.name} 
             leftAvatar={team.logoSrc }
             subtitle={'Record: ' + team.wins + '-' + (team.losses-team.otLosses) + '-' + team.otLosses}
            onLongPress={() => this.setModalVisible(true, team)}
            ></ListItem>
          ))}
        </ScrollView>
      </Background>



    )
  }
}