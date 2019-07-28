import React from 'react';
import { ScrollView, View, TouchableOpacity, Modal } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { sortedRoster, draftClass, saveDraftClass, manageSaveName } from '../data/script';
import Background from '../components/background';
import TeamHeader from '../components/TeamHeader';
import { Actions } from 'react-native-router-flux';
import ListItem from '../components/ListItem';
import PlayerCardModal from '../components/PlayerCardModal';

export default class DraftClassMenu extends React.Component {

    state = {
        saveName : '',
        class: draftClass,
        modalVisible: false,
        modalPlayer: null
    }

    setModalVisible(visible, player) {
        this.setState({ modalVisible: visible, modalPlayer: player });
      }

    checkDraftClassName = () =>{
        if(this.state.saveName.length >1){
            saveDraftClass(manageSaveName(this.state.saveName)), Actions.pop()
        }else{
            Alert.alert('Please enter a save name', 'to save a draft class file you must enter a valid save name');
        }
    }

    update = () =>{
        this.setState({class:draftClass});
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
                <TeamHeader selectedTeam={draftClass} ></TeamHeader>
                <View>
                <Input containerStyle = {{backgroundColor:'rgba(255,255,255,0.75)', padding: 15}} onChangeText={value => this.setState({ saveName: value })} placeholder={'Enter a save name'} placeholderTextColor={'rgb(80,80,80)'} inputStyle={{ color: 'black', fontFamily: 'advent-pro', textAlign:'center' }} >{this.state.saveName}</Input>
                <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0.75)', borderColor: 'rgba(0,0,0,0.75)'}} title="Save Draft Class" onPress={() => {this.checkDraftClassName()}}></Button>
                </View>
                <ScrollView>

                    {sortedRoster(this.state.class,'rating').map((player, i) => (
                        <ListItem
                            title={player.positionString + ' #' + player.number + ' ' + player.name}
                            key={i} leftAvatar={player.faceSrc }
                            subtitle={'Rating: ' + player.rating}
                            onPress={() => Actions.playerprofile({selectedPlayer : player, update:this.update})}
                            onLongPress={() => this.setModalVisible(true, player)}

                        />

                    ))}
                </ScrollView>

            </Background>
        )
    }
}

