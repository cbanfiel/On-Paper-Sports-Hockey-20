import React from 'react';
import { View, ScrollView, Text, Modal, TouchableOpacity } from 'react-native';
import { Button, Divider, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { selectedTeam } from '../data/script';
import Background from '../components/background';
import TeamHeader from '../components/TeamHeader';
import ListItem from '../components/ListItem';
import PlayerCardModal from '../components/PlayerCardModal';

export default class EditLineupMenu extends React.Component {

    componentWillUnmount(){
        //updates a previous scenes state
        if(this.props.updateState != null){
            this.props.updateState();
        }
    }

    setModalVisible(visible, player) {
        this.setState({ modalVisible: visible, modalPlayer: player });
      }


    state={
        selectedPlayer: null,
        selectedPlayer2: null,
        benchWarmers : selectedTeam.generateBenchWarmers(),
        arr : '',
        pos : '',
        arr2 : '',
        pos2 : '',
        modalVisible: false,
        modalPlayer: null
    }

    selectPlayer(playa, arr , pos){
        if(this.state.selectedPlayer === playa){
            this.setState({selectedPlayer: null});
            return;
        }
        if(this.state.selectedPlayer2 === playa){
            this.setState({selectedPlayer2: null});
            return;
        }


        if(this.state.selectedPlayer == null){
            this.setState({selectedPlayer: playa, arr : arr, pos : pos});
        }else if(this.state.selectedPlayer2 == null){
            this.setState({selectedPlayer2: playa, arr2: arr, pos2 : pos})
        }

        const timer = setTimeout(
      function() {
        if(this.state.selectedPlayer!= null){
            if(this.state.selectedPlayer2!=null){
                this.swap();
            }
        }
          clearTimeout(timer);
      }
      .bind(this),
      20
  );
        
    }

    clearSelections(){
        this.setState({selectedPlayer: null, selectedPlayer2: null});
    }

    swap(){
        this.state.arr[this.state.pos] = this.state.selectedPlayer2;
        this.state.arr2[this.state.pos2] = this.state.selectedPlayer;
        
        this.setState({selectedPlayer: null, selectedPlayer2: null, arr:'', arr2:'', pos:'', pos2:''});
        // selectedTeam.manageUsage();
        Actions.refresh();
    }

    autoReorder(){
        selectedTeam.reorderLineup();
        Actions.refresh();
    }

    getPositionString(key) {
        let keyString;
        if (key === 0) {
            keyString = 'C'
        } else if (key === 1) {
            keyString = 'LW'
        } else if (key === 2) {
            keyString = 'RW'
        } else if (key === 3) {
            keyString = 'D'
        } else if (key === 4) {
            keyString = 'G'
        }

        return keyString;
    }

    render() {
        return (
            <Background>

{
            this.state.modalPlayer != null ? (
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
                            <PlayerCardModal modalPlayer = {this.state.modalPlayer}></PlayerCardModal>
                           </View>
                    </View>
                </Modal>
            ) : null
        }

                <TeamHeader selectedTeam={selectedTeam}></TeamHeader>

                <View style={{ backgroundColor: 'rgba(255,255,255,0)'}}>
                    <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(255,255,255,0)'}} title="Auto Reorder Lineup" onPress={() => { this.autoReorder() }}></Button>
                </View>



                <ScrollView contentContainerStyle={{paddingBottom: 20}}>
                    {
                    selectedTeam.offLine1.map((player, i) => (
                            <ListItem 
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc }
                                subtitle={'Rating: ' + player.rating}
                                rightSubtitle={'OFF Line: 1'}
                                rightTitle={this.getPositionString(i)}
                                color={this.state.selectedPlayer === player? 'rgba(180,180,180,0.75)': this.state.selectedPlayer2 === player? 'rgba(180,180,180,0.75)': null}
                                onPress={() => this.selectPlayer(player, selectedTeam.offLine1, i)}
                                onLongPress={() => this.setModalVisible(true, player)}

                                ></ListItem>
                    ))}
                    {
                    selectedTeam.defLine1.map((player, i) => (
                            <ListItem 
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc } 
                                subtitle={'Rating: ' + player.rating}
                                rightTitle={'D'}
                                rightSubtitle={'DEF Line 1'}
                                color={this.state.selectedPlayer === player? 'rgba(180,180,180,0.75)': this.state.selectedPlayer2 === player? 'rgba(180,180,180,0.75)': null}
                                onPress={() => this.selectPlayer(player, selectedTeam.defLine1 , i)}
                                onLongPress={() => this.setModalVisible(true, player)}

                                ></ListItem>
                    ))}
                    {
                    selectedTeam.offLine2.map((player, i) => (
                            <ListItem 
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc }
                                subtitle={'Rating: ' + player.rating}
                                rightSubtitle={'Line: 2'}
                                rightTitle={this.getPositionString(i)}
                                color={this.state.selectedPlayer === player? 'rgba(180,180,180,0.75)': this.state.selectedPlayer2 === player? 'rgba(180,180,180,0.75)': null}
                                onPress={() => this.selectPlayer(player, selectedTeam.offLine2, i)}
                                onLongPress={() => this.setModalVisible(true, player)}

                                ></ListItem>
                    ))}
                    {
                    selectedTeam.defLine2.map((player, i) => (
                            <ListItem 
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc } 
                                subtitle={'Rating: ' + player.rating}
                                rightTitle={'D'}
                                rightSubtitle={'Line 2'}
                                color={this.state.selectedPlayer === player? 'rgba(180,180,180,0.75)': this.state.selectedPlayer2 === player? 'rgba(180,180,180,0.75)': null}
                                onPress={() => this.selectPlayer(player, selectedTeam.defLine2 , i)}
                                onLongPress={() => this.setModalVisible(true, player)}

                                ></ListItem>
                    ))}
                    {
                    selectedTeam.offLine3.map((player, i) => (
                            <ListItem 
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc }
                                subtitle={'Rating: ' + player.rating}
                                rightSubtitle={'Line: 3'}
                                rightTitle={this.getPositionString(i)}
                                color={this.state.selectedPlayer === player? 'rgba(180,180,180,0.75)': this.state.selectedPlayer2 === player? 'rgba(180,180,180,0.75)': null}
                                onPress={() => this.selectPlayer(player, selectedTeam.offLine3, i)}
                                onLongPress={() => this.setModalVisible(true, player)}

                                ></ListItem>
                    ))}
                    {
                    selectedTeam.defLine3.map((player, i) => (
                            <ListItem 
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc } 
                                subtitle={'Rating: ' + player.rating}
                                rightTitle={'D'}
                                rightSubtitle={'Line 3'}
                                color={this.state.selectedPlayer === player? 'rgba(180,180,180,0.75)': this.state.selectedPlayer2 === player? 'rgba(180,180,180,0.75)': null}
                                onPress={() => this.selectPlayer(player, selectedTeam.defLine3 , i)}
                                onLongPress={() => this.setModalVisible(true, player)}

                                ></ListItem>
                    ))}
                    {
                    selectedTeam.offLine4.map((player, i) => (
                            <ListItem 
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc }
                                subtitle={'Rating: ' + player.rating}
                                rightSubtitle={'Line: 4'}
                                rightTitle={this.getPositionString(i)}
                                color={this.state.selectedPlayer === player? 'rgba(180,180,180,0.75)': this.state.selectedPlayer2 === player? 'rgba(180,180,180,0.75)': null}
                                onPress={() => this.selectPlayer(player, selectedTeam.offLine4, i)}
                                onLongPress={() => this.setModalVisible(true, player)}

                                ></ListItem>
                    ))}
                    {
                    selectedTeam.goalies.map((player, i) => (
                            <ListItem 
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc } 
                                subtitle={'Rating: ' + player.rating}
                                rightTitle={'G'}
                                rightSubtitle={i===0? 'STARTER' : 'BACKUP'}
                                color={this.state.selectedPlayer === player? 'rgba(180,180,180,0.75)': this.state.selectedPlayer2 === player? 'rgba(180,180,180,0.75)': null}
                                onPress={() => this.selectPlayer(player, selectedTeam.goalies , i)}
                                onLongPress={() => this.setModalVisible(true, player)}

                                ></ListItem>
                    ))}
                    
                </ScrollView>

                

                


            </Background>





        )
    }
}