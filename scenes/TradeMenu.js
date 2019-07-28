import React from 'react';
import { Text, View, ScrollView, Alert, TouchableOpacity, Modal } from 'react-native';
import { Button, Card, Icon, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { selectedTeam, selectedTeam2, trade, sortedRoster, displaySalary, CAPROOM, setPowerRankings, getDraftPickProjectedPick, inDraft, teams, returnStatsView } from '../data/script';
import Background from '../components/background';
import CachedImage from '../components/CachedImage';
import ListItem from '../components/ListItem';
import PlayerCardModal from '../components/PlayerCardModal';


export default class TradeMenu extends React.Component {
    constructor() {
        super();
        this.state = {
            t1Offers: [],
            t2Offers: [],
            declined: '',
            t1salary: selectedTeam.salary,
            t2salary: selectedTeam2.salary,
            modalVisible: false,
            modalPlayer: null
        }
    }

    setModalVisible(visible, player) {
        this.setState({ modalVisible: visible, modalPlayer: player });
    }


    addToTrade(player, team) {
        this.setState({ declined: '' });

        if (team === selectedTeam) {
            let offer = this.state.t1Offers;
            if (!offer.includes(player)) {
                if (offer.length >= 5) {
                    return;
                }

                offer.push(player);
                this.setState({ t1salary: this.state.t1salary -= player.salary, t2salary: this.state.t2salary += player.salary });
            } else {
                offer.splice(offer.indexOf(player), 1);
                this.setState({ t1salary: this.state.t1salary += player.salary, t2salary: this.state.t2salary -= player.salary });

            }
            this.setState({ t1Offers: offer });
        } else {
            let offer = this.state.t2Offers;
            if (!offer.includes(player)) {
                if (offer.length >= 5) {
                    return;
                }

                offer.push(player);
                this.setState({ t2salary: this.state.t2salary -= player.salary, t1salary: this.state.t1salary += player.salary });

            } else {
                offer.splice(offer.indexOf(player), 1);
                this.setState({ t2salary: this.state.t2salary += player.salary, t1salary: this.state.t1salary -= player.salary });
            }
            this.setState({ t2Offers: offer });
        }
    }

    offer() {

        t1PlayerAmount = 0;
        t2PlayerAmount = 0;
        for (let i = 0; i < this.state.t1Offers.length; i++) {
            if (!this.state.t1Offers[i].isPick) {
                t1PlayerAmount++;
            }
        }
        for (let i = 0; i < this.state.t2Offers.length; i++) {
            if (!this.state.t2Offers[i].isPick) {
                t2PlayerAmount++;
            }
        }


        //Check for requirements DOES NOT HAPPEN IN OFFSEASON
        if (this.props.requirementsOff != true) {
            if (selectedTeam.roster.length - t1PlayerAmount + t2PlayerAmount < 10) {
                Alert.alert('Roster Requirements Not Met', 'This move will set the ' + selectedTeam.name + ' under the roster requirements, please sign more players before making this move');
                return;
            }
            if (selectedTeam2.roster.length - t2PlayerAmount + t1PlayerAmount < 10) {
                Alert.alert('Roster Requirements Not Met', 'This move will set the ' + selectedTeam2.name + ' under the roster requirements, please sign more players before making this move');
                return;
            }
        }



        if (!trade(selectedTeam, selectedTeam2, this.state.t1Offers, this.state.t2Offers, this.props.isForced)) {
            this.state.declined = true;

        } else {
            this.setState({ t1Offers: [], t2Offers: [], declined: false })
            if (this.props.updateScene != null) {
                this.props.updateScene();
            }

            console.log(inDraft);
            Actions.pop();
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

                <View style={{ backgroundColor: 'rgba(255,255,255,0.75)', borderBottomWidth: 1 }}>
                    <CachedImage
                        style={{ resizeMode: 'contain', height: 50 }}
                        uri={selectedTeam.logoSrc} />
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{selectedTeam.name}</Text>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{'Cap Space: $' + displaySalary((this.state.t1salary - CAPROOM) * -1)}</Text>

                </View>
                {

                    this.state.declined === true ? (

                        <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ padding: 15, borderRadius: 0, borderBottomWidth: 1, backgroundColor: 'rgba(255,255,255,0.75)', borderColor: 'rgba(0,0,0,0.75)' }} title="Offer Declined" disabled disabledTitleStyle={{ color: 'white' }} disabledStyle={{ backgroundColor: 'rgba(255,0,0,0.75)' }}></Button>


                    ) :
                        this.state.declined === false ? (
                            <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ padding: 15, borderRadius: 0, borderBottomWidth: 1, backgroundColor: 'rgba(255,255,255,0.75)', borderColor: 'rgba(0,0,0,0.75)' }} title="Offer Accepted" disabled disabledTitleStyle={{ color: 'white' }} disabledStyle={{ backgroundColor: 'rgba(10,200,60,0.75)' }}></Button>

                        ) :
                            <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ padding: 15, borderRadius: 0, borderBottomWidth: 1, backgroundColor: 'rgba(255,255,255,0.75)', borderColor: 'rgba(0,0,0,0.75)' }} title="Offer Trade" onPress={() => { this.offer(), Actions.refresh() }}></Button>

                }


                {       //JUST CHECKING WHAT MENU TO GO BACK TO SEASON OR ROSTER
                    //         this.props.back==='rostermenu' ? (
                    // <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0.75)', borderColor: 'rgba(0,0,0,0.75)'}} title="Back To Rosters" onPress={() => { Actions.rostermenu() }}></Button>
                    //         ) :
                    // <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0.75)', borderColor: 'rgba(0,0,0,0.75)'}} title="Back To Season" onPress={() => { Actions.seasonmenu() }}></Button>

                }
                <ScrollView>

                    {sortedRoster(selectedTeam, 'rating').map((player, i) => (
                        <ListItem onPress={() => { this.addToTrade(player, selectedTeam) }}
                            title={player.positionString + ' #' + player.number + ' ' + player.name}
                            key={i} leftAvatar={player.faceSrc} subtitle={'Rating: ' + player.rating}
                            bottomDivider={true}
                            rightSubtitle={'$' + displaySalary(player.salary)}
                            rightTitle={this.state.t1Offers.includes(player) ? "SELECTED" : null}
                            onLongPress={() => this.setModalVisible(true, player)}

                        ></ListItem>
                    ))
                    }
                    {selectedTeam.draftPicks.map((pick, i) => (
                        <ListItem onPress={() => { this.addToTrade(pick, selectedTeam) }}
                            title={pick.originalTeam + ' Draft Pick'}
                            key={i} subtitle={'Round: ' + pick.round + ' Projected Pick: ' + getDraftPickProjectedPick(pick)}
                            bottomDivider={true}
                            rightTitle={this.state.t1Offers.includes(pick) ? "SELECTED" : null}

                        ></ListItem>
                    ))
                    }
                </ScrollView>

                <View style={{ backgroundColor: 'rgba(255,255,255,0.75)', borderBottomWidth: 1 }}>
                    <CachedImage
                        style={{ resizeMode: 'contain', height: 50 }}
                        uri={selectedTeam2.logoSrc} />
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{selectedTeam2.name}</Text>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{'Cap Space: $' + displaySalary((this.state.t2salary - CAPROOM) * -1)}</Text>

                </View>
                <ScrollView>

                    {sortedRoster(selectedTeam2, 'rating').map((player, i) => (
                        <ListItem
                            onPress={() => { this.addToTrade(player, selectedTeam2) }}
                            title={player.positionString + ' #' + player.number + ' ' + player.name}
                            key={i} leftAvatar={player.faceSrc}
                            subtitle={'Rating: ' + player.rating}
                            rightSubtitle={'$' + displaySalary(player.salary)}
                            bottomDivider={true}
                            rightTitle={this.state.t2Offers.includes(player) ? "SELECTED" : null}
                            onLongPress={() => this.setModalVisible(true, player)}

                        />

                    ))}

                    {selectedTeam2.draftPicks.map((pick, i) => (
                        <ListItem onPress={() => { this.addToTrade(pick, selectedTeam2) }}
                            title={pick.originalTeam + ' Draft Pick'}
                            key={i} subtitle={'Round: ' + pick.round + ' Projected Pick: ' + getDraftPickProjectedPick(pick)}
                            bottomDivider={true}
                            rightTitle={this.state.t2Offers.includes(pick) ? "SELECTED" : null}

                        ></ListItem>
                    ))
                    }
                </ScrollView>

            </Background>
        )
    }
}