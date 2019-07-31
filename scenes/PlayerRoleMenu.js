import React from 'react';
import { View, ScrollView, Text, Modal, TouchableOpacity } from 'react-native';
import { Button, Divider, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { selectedTeam } from '../data/script';
import Background from '../components/background';
import TeamHeader from '../components/TeamHeader';
import ListItem from '../components/ListItem';
import PlayerCardModal from '../components/PlayerCardModal';

export default class PlayerRoleMenu extends React.Component {



    static onExit(){
        for(let i=0; i<selectedTeam.roster.length; i++){
            selectedTeam.roster[i].tempRole = selectedTeam.roster[i].role;
        }
    }

    setModalVisible(visible, player) {
        this.setState({ modalVisible: visible, modalPlayer: player });
      }

    state={
        ready:true,
        modalVisible: false,
        modalPlayer: null
    }

    autoReorder(){
        selectedTeam.reorderLineup();
        Actions.refresh();
    }

    cycleThroughRoles(player){
        player.tempRole++;
        let stars=0;
        let starters = 0;
        let sixthMan = 0;
        let rolePlayers = 0;
        let benchWarmers = 0;

        for(let i=0; i<selectedTeam.roster.length; i++){
            if(selectedTeam.roster[i].tempRole === 0){
                benchWarmers++;
            }else if(selectedTeam.roster[i].tempRole === 1){
                rolePlayers++;
            }else if(selectedTeam.roster[i].tempRole === 2){
                sixthMan++;
            }else if(selectedTeam.roster[i].tempRole === 3){
                starters++;
            }else if(selectedTeam.roster[i].tempRole === 4){
                stars++;
            }
        }

        while(stars>1 || starters+stars > 5 || sixthMan>1){
            player.tempRole++;
            stars=0;
            starters = 0;
            sixthMan = 0;
            rolePlayers = 0;
            benchWarmers = 0;
            for(let i=0; i<selectedTeam.roster.length; i++){
                if(selectedTeam.roster[i].tempRole === 0){
                    benchWarmers++;
                }else if(selectedTeam.roster[i].tempRole === 1){
                    rolePlayers++;
                }else if(selectedTeam.roster[i].tempRole === 2){
                    sixthMan++;
                }else if(selectedTeam.roster[i].tempRole === 3){
                    starters++;
                }else if(selectedTeam.roster[i].tempRole === 4){
                    stars++;
                }
            }
            if(player.tempRole > 4){
                player.tempRole = 0;
            }
        }

        if(stars>1 || starters+stars!=5 || sixthMan>1 || starters + stars + sixthMan + rolePlayers != selectedTeam.rotationSize){
            this.setState({ready:false});
        }else{
            this.setState({ready:true});
        }
        


        if(player.tempRole > 4){
            player.tempRole = 0;
        }

        Actions.refresh();

    }

    getRoleString(player){
        if(player.tempRole === 0){
            return "Benchwarmer"
        }
        if(player.tempRole === 1){
            return "Role Player"
        }
        if(player.tempRole === 2){
            return "Sixth Man"
        }
        if(player.tempRole === 3){
            return "Starter"
        }
        if(player.tempRole === 4){
            return "Star"
        }
    }

    commitChanges(){
       
        selectedTeam.firstTeam = [];

       for(let i=0; i<selectedTeam.roster.length; i++){
           selectedTeam.roster[i].role = selectedTeam.roster[i].tempRole;
           if(selectedTeam.roster[i].role >=3){
               selectedTeam.firstTeam.push(selectedTeam.roster[i]);
           }
       }

       selectedTeam.firstTeam.sort(function(a,b){
           if(a.position> b.position){
               return 1;
           }
           if(a.position<b.position){
               return -1;
           }else{
               return 0;
           }
       });

       selectedTeam.bench = [];
       for(let i=0; i<selectedTeam.roster.length; i++){
        if(selectedTeam.roster[i].role === 1 || selectedTeam.roster[i].role === 2){
            selectedTeam.bench.push(selectedTeam.roster[i]);
        }
    }

       selectedTeam.manageUsage();

       if(this.props.updateState != null){
           this.props.updateState();
       }

       Actions.pop();
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
                {
                    this.state.ready?
                    <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(255,255,255,0)'}} title="Commit Changes" onPress={() => { this.commitChanges() }}></Button>
                    :
                    <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(255,255,255,0)'}} title="Requirements Not Met" disabled disabledStyle={{backgroundColor:'rgba(255,0,0,0.75)'}} disabledTitleStyle={{color:"black"}} onPress={() => { this.commitChanges() }}></Button>
                }

                <ScrollView contentContainerStyle={{paddingBottom: 20}}>
                    {
                    selectedTeam.roster.map((player, i) => (
                            <ListItem 
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc }
                                subtitle={'Rating: ' + player.rating}
                                rightSubtitle={this.getRoleString(player)}
                                onPress={() => this.cycleThroughRoles(player)}
                                onLongPress={() => this.setModalVisible(true, player)}
                                ></ListItem>
                    ))}
                   
                </ScrollView>

                

                


            </Background>





        )
    }
}