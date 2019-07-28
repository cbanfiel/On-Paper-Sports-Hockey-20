import React from 'react';
import { View, ScrollView, Alert, TouchableOpacity, Modal, Text } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { sortedRoster, collegeMode, releasePlayer, saveAsDraftClass, manageSaveName, selectedTeam } from '../data/script';
import Background from '../components/background';
import TeamHeader from '../components/TeamHeader';
import ListItem from '../components/ListItem';
import PlayerCardModal from '../components/PlayerCardModal';


export default class RosterList extends React.Component {

    updateState = () =>{
        this.setState({forUpdating: ''});
    }

    state={
        forUpdating: ''
    }
    

    setModalVisible(visible, player) {
        this.setState({ modalVisible: visible, modalPlayer: player });
    }

    componentWillUnmount(){
        //updates a previous scenes state
        if(this.props.updateState != null){
            this.props.updateState();
        }
    }

    state = {
        saveName : '',
        modalVisible: false,
        modalPlayer: null
    }

    checkDraftClassName = () =>{
        if(this.state.saveName.length >1){
            saveAsDraftClass(sortedRoster(this.props.selectedTeam,'rating'), manageSaveName(this.state.saveName)), Actions.pop()
        }else{
            Alert.alert('Please enter a save name', 'to save a draft class file you must enter a valid save name');
        }
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


                <TeamHeader selectedTeam={this.props.selectedTeam}></TeamHeader>

            {
                this.props.view === 'retirements' && collegeMode === true ? (
                    <View>
                <Input containerStyle = {{backgroundColor:'rgba(255,255,255,0.75)', padding: 15}} onChangeText={value => this.setState({ saveName: value })} placeholder={'Enter a save name'} placeholderTextColor={'rgb(80,80,80)'} inputStyle={{ color: 'black', fontFamily: 'advent-pro', textAlign:'center' }} >{this.state.saveName}</Input>
                <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0.75)', borderColor: 'rgba(0,0,0,0.75)'}} title="Save As Draft Class" onPress={() => {this.checkDraftClassName()}}></Button>
                    </View>
                
                ): null
            }



            {
                this.props.view === 'resigning' ? 
                <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0.75)', borderColor: 'rgba(0,0,0,0.75)'}} title="Release All" onPress={() => { this.props.selectedTeam.releaseExpiring(), Actions.pop() }}></Button>
                : null
            }

 

{
    this.props.view === 'draft' ? (
        <ScrollView>
        {sortedRoster(this.props.selectedTeam,'rating').map((player, i) => (
                <ListItem
                    title={player.positionString + ' #' + player.number + ' ' + player.name}
                    key={i} leftAvatar={player.faceSrc} 
                    subtitle={'Rating: ' + player.rating}
                    rightAvatar = {player.teamLogoSrc}
                    onPress={this.props.selectable === true ? () => Actions.playerprofile({selectedPlayer: player, view: 'draft', franchise: this.props.franchise, update: this.props.update}) : null }
                    onLongPress={() => this.setModalVisible(true, player)}
                    ></ListItem>
        ))}
    </ScrollView>


    ) : 
    this.props.view === 'resigning' ? (
                <ScrollView style={{paddingBottom:50}}>
                    {sortedRoster(this.props.selectedTeam.expiring,'rating').map((player, i) => (
                            <ListItem
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc }
                                subtitle={'Rating: ' + player.rating}
                                onPress={() => {Actions.offercontractmenu({selectedPlayer : player, playerpool : this.props.selectedTeam.expiring, back:this.props.back, forced:this.props.forced})}}
                                onLongPress={() => this.setModalVisible(true, player)}
                                ></ListItem>
                    ))}
                </ScrollView>

    ) :
    this.props.view === 'retirements' ? (
        <ScrollView>
        {sortedRoster(this.props.selectedTeam,'rating').map((player, i) => (
                <ListItem 
                    title={player.positionString + ' #' + player.number + ' ' + player.name}
                    key={i} leftAvatar={ player.faceSrc } 
                    subtitle={'Rating: ' + player.rating}
                    onPress={() => {Actions.playerstatshistory({ player: player })}}
                    onLongPress={() => this.setModalVisible(true, player)}

                    ></ListItem>
        ))}
    </ScrollView>
    
    
        ): 

        this.props.view === 'releasePlayer' ? (
            <ScrollView>
            {sortedRoster(this.props.selectedTeam,'rating').map((player, i) => (
                    <ListItem 
                        title={player.positionString + ' #' + player.number + ' ' + player.name}
                        key={i} leftAvatar={ player.faceSrc } 
                        subtitle={'Rating: ' + player.rating}
                        onPress={() => {releasePlayer(player), Actions.pop()}}
                        onLongPress={() => this.setModalVisible(true, player)}

                        ></ListItem>
            ))}
        </ScrollView>
        
        
            ): 

            this.props.view === 'training' ? (
                <View style={{flex:1}}>
                    <View style={{backgroundColor:'rgba(255,255,255,0.75)', borderBottomWidth:1}}>
                    <Text style={{ fontFamily: 'advent-pro', textAlign:'center', fontSize:20, padding:20}}>{'Training Points: ' + this.props.selectedTeam.trainingPoints}</Text>
                    </View>
                <ScrollView>
                    {sortedRoster(this.props.selectedTeam,'rating').map((player, i) => (
                            <ListItem
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc } 
                                subtitle={'Rating: ' + player.rating}
                                rightTitle={collegeMode?( player.age >= 21? 'SR' : player.age === 20? 'JR' : player.age===19? 'SO' : player.age===18? 'FR' : null ) : null }
                                onPress={() => {Actions.trainingscreen({player: player, points: this.props.selectedTeam.trainingPoints, update:this.updateState})}}
                                onLongPress={() => this.setModalVisible(true, player)}

                                ></ListItem>
                    ))}
                </ScrollView>
                </View>




                
            ):

    <ScrollView>
                    {sortedRoster(this.props.selectedTeam,'rating').map((player, i) => (
                            <ListItem
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc } 
                                subtitle={'Rating: ' + player.rating}
                                rightTitle={collegeMode?( player.age >= 21? 'SR' : player.age === 20? 'JR' : player.age===19? 'SO' : player.age===18? 'FR' : null ) : null }
                                onPress={() => {Actions.playerprofile({selectedPlayer : player, update:this.updateState})}}
                                onLongPress={() => this.setModalVisible(true, player)}

                                ></ListItem>
                    ))}
                </ScrollView>






}
            </Background>





        )
    }
}