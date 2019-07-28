import React from 'react';
import { Text, View, ScrollView, Modal, TouchableOpacity } from 'react-native';
import {Icon} from 'react-native-elements';
import { home, away, sortedRoster, gamesPerSeason } from '../data/script';
import Background from '../components/background';
import CachedImage from '../components/CachedImage';
import ListItem from '../components/ListItem';
import PlayerCardModal from '../components/PlayerCardModal';

export default class InGameStats extends React.Component {

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
                        uri= { home.logoSrc } />
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 30 }}>{this.props.currentGame.homescore}</Text>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{home.name}</Text>
                </View>
                <ScrollView>

                    {sortedRoster(home, 'position').map((player, i) => (
                        <ListItem 
                            title={player.positionString + ' #' + player.number + ' ' + player.name}
                            key={i} leftAvatar={player.faceSrc } 
                            subtitle={"PTS: " + player.points + " FG% " + Math.floor((player.twoPointersMade / player.twoPointersAtt) * 100)
                                + " 3P% " + Math.floor((player.threePointersMade / player.threePointersAtt) * 100)+ " FT% " + Math.floor((player.freeThrowsMade / player.freeThrowsAttempted) * 100)}
                            onLongPress={() => this.setModalVisible(true, player)}

                        ></ListItem>
                    ))}
                </ScrollView>

                <View style={{ backgroundColor: 'rgba(255,255,255,0.75)', borderBottomWidth: 1 }}>
                    <CachedImage
                        style={{ resizeMode: 'contain', height: 50 }}
                        uri= { away.logoSrc } />
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 30 }}>{this.props.currentGame.awayscore}</Text>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{away.name}</Text>
                </View>
                <ScrollView>

                    {sortedRoster(away, 'position').map((player, i) => (
                        <ListItem
                            title={player.positionString + ' #' + player.number + ' ' + player.name}
                            key={i} leftAvatar={player.faceSrc }
                            subtitle={"PTS: " + player.points + " FG% " + Math.floor((player.twoPointersMade / player.twoPointersAtt) * 100)
                                + " 3P% " + Math.floor((player.threePointersMade / player.threePointersAtt) * 100)}
                            onLongPress={() => this.setModalVisible(true, player)}

                                />

                    ))}
                </ScrollView>

            </Background>
        )
    }
}