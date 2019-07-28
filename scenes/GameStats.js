import React from 'react';
import { Text, View, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { selectedTeam, selectedTeam2, trade, sortedRoster } from '../data/script';
import {Icon} from 'react-native-elements';
import Background from '../components/background';
import CachedImage from '../components/CachedImage';
import ListItem from '../components/ListItem';
import PlayerCardModal from '../components/PlayerCardModal';

export default class GameStats extends React.Component {

    setModalVisible(visible, player) {
        this.setState({ modalVisible: visible, modalPlayer: player });
    }

    state = {
        modalPlayer: null,
        modalVisible: false
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

                <View style={{ backgroundColor: 'rgba(255,255,255,0.75)', borderBottomWidth: 1 }}>
                    <CachedImage
                        style={{ resizeMode: 'contain', height: 50 }}
                        uri ={ selectedTeam.logoSrc } />
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 30 }}>{selectedTeam.played[this.props.currentGame].userScore}</Text>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{selectedTeam.name}</Text>
                </View>
                <ScrollView>

                    {

                            sortedRoster(selectedTeam, 'position').map((player, i) => (
                            <ListItem titleStyle={{ fontFamily: 'advent-pro' }}
                                subtitleStyle={{ fontFamily: 'advent-pro' }}
                                containerStyle={{ backgroundColor: 'rgba(255,255,255,0.75)', }}
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={player.faceSrc } 
                                subtitle={"PTS: " + player.statsHistory[this.props.currentGame].points + " FG% " + Math.floor((player.statsHistory[this.props.currentGame].twoPointersMade / player.statsHistory[this.props.currentGame].twoPointersAtt) * 100)
                                    + " 3P% " + Math.floor((player.statsHistory[this.props.currentGame].threePointersMade / player.statsHistory[this.props.currentGame].threePointersAtt) * 100)+ " FT% " + Math.floor((player.statsHistory[this.props.currentGame].freeThrowsMade / player.statsHistory[this.props.currentGame].freeThrowsAttempted) * 100)}
                                onLongPress={() => this.setModalVisible(true, player)}
    
                            ></ListItem>
                        
                    ))}
                </ScrollView>

                <View style={{ backgroundColor: 'rgba(255,255,255,0.75)', borderBottomWidth: 1 }}>
                    <CachedImage
                        style={{ resizeMode: 'contain', height: 50 }}
                        uri ={ selectedTeam2.logoSrc }/>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 30 }}>{selectedTeam2.played[this.props.currentGame].userScore}</Text>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{selectedTeam2.name}</Text>
                </View>
                <ScrollView>

                    {sortedRoster(selectedTeam2, 'position').map((player, i) => (
                        <ListItem
                            titleStyle={{ fontFamily: 'advent-pro' }} subtitleStyle={{ fontFamily: 'advent-pro' }}
                            containerStyle={{ backgroundColor: 'rgba(255,255,255,0.75)' }}
                            title={player.positionString + ' #' + player.number + ' ' + player.name}
                            key={i} leftAvatar={player.faceSrc }
                            subtitle={"PTS: " + player.statsHistory[this.props.currentGame].points + " FG% " + Math.floor((player.statsHistory[this.props.currentGame].twoPointersMade / player.statsHistory[this.props.currentGame].twoPointersAtt) * 100)
                                + " 3P% " + Math.floor((player.statsHistory[this.props.currentGame].threePointersMade / player.statsHistory[this.props.currentGame].threePointersAtt) * 100)}
                            onLongPress={() => this.setModalVisible(true, player)}

                        />

                    ))}
                </ScrollView>

            </Background>
        )
    }
}