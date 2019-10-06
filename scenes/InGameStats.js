import React from 'react';
import { Text, View, ScrollView, Modal, TouchableOpacity } from 'react-native';
import {Icon} from 'react-native-elements';
import { home, away, sortedRoster, gamesPerSeason, returnStatsView, returnStatsListView, played } from '../data/script';
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

                <View style={{ backgroundColor: 'rgba(255,255,255,0)', borderBottomWidth: 1 }}>
                    <CachedImage
                        style={{ resizeMode: 'contain', height: 50 }}
                        uri= { home.logoSrc } />
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 30 }}>{this.props.currentGame.homescore}</Text>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{home.name}</Text>
                </View>
                <ScrollView contentContainerStyle={{paddingBottom: 20}}>

                    {played(home.roster).map((player, i) => (
                        <ListItem 
                            title={player.positionString + ' #' + player.number + ' ' + player.name}
                            key={i} leftAvatar={player.faceSrc } 
                            subtitle={returnStatsListView(player)}
                            onLongPress={() => this.setModalVisible(true, player)}

                        ></ListItem>
                    ))}
                </ScrollView>

                <View style={{ backgroundColor: 'rgba(255,255,255,0)', borderBottomWidth: 1 }}>
                    <CachedImage
                        style={{ resizeMode: 'contain', height: 50 }}
                        uri= { away.logoSrc } />
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 30 }}>{this.props.currentGame.awayscore}</Text>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{away.name}</Text>
                </View>
                <ScrollView contentContainerStyle={{paddingBottom: 20}}>

                    {played(away.roster).map((player, i) => (
                        <ListItem
                            title={player.positionString + ' #' + player.number + ' ' + player.name}
                            key={i} leftAvatar={player.faceSrc }
                            subtitle={returnStatsListView(player)}
                            onLongPress={() => this.setModalVisible(true, player)}

                                />

                    ))}
                </ScrollView>

            </Background>
        )
    }
}