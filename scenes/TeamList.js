import React from 'react';
import { ScrollView, View, TouchableOpacity, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { sortedTeams, setHome, setAway, setSelectedTeam, setSelectedTeam2, setRefreshOff, franchise } from '../data/script';
import Background from '../components/background';
import ListItem from '../components/ListItem';
import TeamCardModal from '../components/TeamCardModal';
import {Icon} from 'react-native-elements';
export default class TeamList extends React.Component {

    componentWillUnmount(){
        //updates a previous scenes state
        if(this.props.updateState != null){
            this.props.updateState();
        }
    }

    state = {
        franchiseStage : franchise.stage,
        modalVisible: false,
        modalTeam: null
    }

    setModalVisible(visible, team) {
        this.setState({ modalVisible: visible, modalTeam: team });
    }


    setFranchiseStage = (stage) => {
        this.setState({franchiseStage : stage});
    }

    setTeam(team) {
        if (this.props.home === 0) {
            //HOME TEAM =0
            setHome(team);
            Actions.pop();
        } else if (this.props.home === 1) {
            //AWAY TEAM =1
            setAway(team);
            Actions.pop();
        } else if (this.props.home === 3) {
            setSelectedTeam2(team);
            Actions.trademenu({back: this.props.back, isForced: this.props.isForced, updateScene : this.props.updateScene, requirementsOff: this.props.requirementsOff});
        }  else if (this.props.home === 4){
            setSelectedTeam(team);
            setRefreshOff(true);

           
                if(this.state.franchiseStage === "retirements"){
                    Actions.push('retirementstage', {teamListStage : this.setFranchiseStage});
                }else if(this.state.franchiseStage === 'draft'){
                    Actions.push('draftmenu', {teamListStage : this.setFranchiseStage});
                }else if(this.state.franchiseStage === "resigning"){
                    Actions.push('resigningstage', {teamListStage : this.setFranchiseStage});
                }else if(this.state.franchiseStage === "freeagency"){
                    Actions.push('freeagencystage', {teamListStage : this.setFranchiseStage});
                }
                else if(this.state.franchiseStage ==="playoffs"){
                    Actions.push('playoffmenu', {teamListStage : this.setFranchiseStage});
                }else if(this.state.franchiseStage ==="freeagencyend"){
                    Actions.push('trainingstage', {teamListStage : this.setFranchiseStage});
                }else{
                    Actions.push('seasonmenu', {teamListStage : this.setFranchiseStage})
                }
        }
        else if (this.props.home === 5){
            setSelectedTeam(team);
            Actions.rostermenu();
        }
        else if (this.props.home === 6){
            this.props.updateTeam(team);
            Actions.pop();
        }
       
        else {
            //SELECTED TEAM=2
            setSelectedTeam(team);
            Actions.rosterlist();
        }
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

                    {sortedTeams().map((team, i) => (
                        <ListItem 
                        titleStyle={{ fontFamily: 'advent-pro' }} 
                        subtitleStyle={{ fontFamily: 'advent-pro' }} 
                        onPress={this.setTeam.bind(this, team)} 
                        title={team.name} 
                        key={i} 
                        leftAvatar={team.logoSrc} 
                        subtitle={'Rating: ' + team.rating}
                        onLongPress={() => this.setModalVisible(true, team)}

                        ></ListItem>



                    ))}
                </ScrollView>
            </Background>




        )
    }
}