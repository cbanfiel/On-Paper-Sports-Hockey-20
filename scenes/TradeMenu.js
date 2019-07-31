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
        let fws=0;
        let def = 0;
        let goalies = 0;
        let t2fws=0;
        let t2def = 0;
        let t2goalies = 0;
        let t1CanTrade = false;
        let t2CanTrade = false;

        for(let i=0; i<selectedTeam.roster.length; i++){
            let ply = selectedTeam.roster[i];
            if(ply.position < 3){
                //forward
                fws++;
            }else if(ply.position === 3){
                def++;
            }else if(ply.position === 4){
                goalies++;
            }
        }

        for(let i=0; i<selectedTeam2.roster.length; i++){
            let ply = selectedTeam2.roster[i];
            if(ply.position < 3){
                //forward
                t2fws++;
            }else if(ply.position === 3){
                t2def++;
            }else if(ply.position === 4){
                t2goalies++;
            }
        }
        for(let i=0; i<this.state.t1Offers.length; i++){
            let ply = this.state.t1Offers[i];
            if(ply.isPick){
                //draft pick
            }
            else if(ply.position < 3){
                //forward
                fws--;
                t2fws++;
            }else if(ply.position === 3){
                def--;
                t2def++;
            }else if(ply.position === 4){
                goalies--;
                t2goalies++;
            }
        }
        for(let i=0; i<this.state.t2Offers.length; i++){
            let ply = this.state.t2Offers[i];
            if(ply.isPick){
                //draft pick
            }
            else if(ply.position < 3){
                //forward
                fws++;
                t2fws--;
            }else if(ply.position === 3){
                def++;
                t2def--;
            }else if(ply.position === 4){
                goalies++;
                t2goalies--;
            }
        }

        if(fws >= 12 && def>=6 && goalies>=2){
            t1CanTrade = true;
        }
        if(t2fws >= 12 && t2def>=6 && t2goalies>=2){
            t2CanTrade = true;
        }


        //Check for requirements DOES NOT HAPPEN IN OFFSEASON
        if (this.props.requirementsOff != true) {
            if (!t1CanTrade) {
                Alert.alert('Roster Requirements Not Met', 'This move will set the ' + selectedTeam.name + ' under the roster requirements, please sign more players before making this move');
                return;
            }
            if (!t2CanTrade) {
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
                        uri={selectedTeam.logoSrc} />
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{selectedTeam.name}</Text>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{'Cap Space: $' + displaySalary((this.state.t1salary - CAPROOM) * -1)}</Text>

                </View>
                {

                    this.state.declined === true ? (

                        <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ padding: 15, borderRadius: 0, borderBottomWidth: 1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(255,255,255,0)' }} title="Offer Declined" disabled disabledTitleStyle={{ color: 'black' }} disabledStyle={{ backgroundColor: 'rgba(255,0,0,0.75)' }}></Button>


                    ) :
                        this.state.declined === false ? (
                            <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ padding: 15, borderRadius: 0, borderBottomWidth: 1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(255,255,255,0)' }} title="Offer Accepted" disabled disabledTitleStyle={{ color: 'black' }} disabledStyle={{ backgroundColor: 'rgba(10,200,60,0.75)' }}></Button>

                        ) :
                            <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ padding: 15, borderRadius: 0, borderBottomWidth: 1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(255,255,255,0)' }} title="Offer Trade" onPress={() => { this.offer(), Actions.refresh() }}></Button>

                }


                {       //JUST CHECKING WHAT MENU TO GO BACK TO SEASON OR ROSTER
                    //         this.props.back==='rostermenu' ? (
                    // <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(255,255,255,0)'}} title="Back To Rosters" onPress={() => { Actions.rostermenu() }}></Button>
                    //         ) :
                    // <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(255,255,255,0)'}} title="Back To Season" onPress={() => { Actions.seasonmenu() }}></Button>

                }
                <ScrollView contentContainerStyle={{paddingBottom: 20}}>

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

                <View style={{ backgroundColor: 'rgba(255,255,255,0)', borderBottomWidth: 1 }}>
                    <CachedImage
                        style={{ resizeMode: 'contain', height: 50 }}
                        uri={selectedTeam2.logoSrc} />
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{selectedTeam2.name}</Text>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{'Cap Space: $' + displaySalary((this.state.t2salary - CAPROOM) * -1)}</Text>

                </View>
                <ScrollView contentContainerStyle={{paddingBottom: 20}}>

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