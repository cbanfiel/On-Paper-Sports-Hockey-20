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
        selectedTeam.manageUsage();
        Actions.refresh();
    }

    autoReorder(){
        selectedTeam.reorderLineup();
        Actions.refresh();
    }

    getPositionString(key) {
        let keyString;
        if (key === 0) {
            keyString = 'PG'
        } else if (key === 1) {
            keyString = 'SG'
        } else if (key === 2) {
            keyString = 'SF'
        } else if (key === 3) {
            keyString = 'PF'
        } else if (key === 4) {
            keyString = 'C'
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
                            <PlayerCardModal modalPlayer = {this.state.modalPlayer}></PlayerCardModal>
                           </View>
                    </View>
                </Modal>
            ) : null
        }

                <TeamHeader selectedTeam={selectedTeam}></TeamHeader>

                <View style={{ backgroundColor: 'rgba(255,255,255,0.75)'}}>
                    <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(0,0,0,0.75)'}} title="Auto Reorder Lineup" onPress={() => { this.autoReorder() }}></Button>
                </View>



                <ScrollView>
                    {
                    selectedTeam.firstTeam.map((player, i) => (
                            <ListItem 
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc }
                                subtitle={'Rating: ' + player.rating}
                                rightSubtitle={'STARTER'}
                                rightTitle={this.getPositionString(i)}
                                color={this.state.selectedPlayer === player? 'rgba(180,180,180,0.75)': this.state.selectedPlayer2 === player? 'rgba(180,180,180,0.75)': null}
                                onPress={() => this.selectPlayer(player, selectedTeam.firstTeam, i)}
                                onLongPress={() => this.setModalVisible(true, player)}

                                ></ListItem>
                    ))}
                    {
                    selectedTeam.bench.map((player, i) => (
                            <ListItem 
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc } 
                                subtitle={'Rating: ' + player.rating}
                                rightSubtitle={'BENCH'}
                                color={this.state.selectedPlayer === player? 'rgba(180,180,180,0.75)': this.state.selectedPlayer2 === player? 'rgba(180,180,180,0.75)': null}
                                onPress={() => this.selectPlayer(player, selectedTeam.bench , i)}
                                onLongPress={() => this.setModalVisible(true, player)}

                                ></ListItem>
                    ))}
                </ScrollView>

                

                


            </Background>





        )
    }
}