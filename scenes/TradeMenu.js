import React from 'react';
import { Text, View, ScrollView, Alert, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Button, Card, Icon, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { selectedTeam, selectedTeam2, trade, sortedRoster, displaySalary, CAPROOM, setPowerRankings, getDraftPickProjectedPick, inDraft, teams, returnStatsView } from '../data/script';
import Background from '../components/background';
import CachedImage from '../components/CachedImage';
import ListItem from '../components/ListItem';
import PlayerCardModal from '../components/PlayerCardModal';
import { LayoutProvider, DataProvider, RecyclerListView } from 'recyclerlistview';
var { height, width } = Dimensions.get('window');
import PositionFilter from '../components/PositionFilter';


export default class TradeMenu extends React.Component {

    componentDidMount() {
        //for trade finder component
        if (this.props.t1Offers != null) {
            for (let i = 0; i < this.props.t1Offers.players.length; i++) {
                this.addToTrade(this.props.t1Offers.players[i], this.props.t1Offers.team);
            }

            for (let i = 0; i < this.props.t2Offers.players.length; i++) {
                this.addToTrade(this.props.t2Offers.players[i], this.props.t2Offers.team);
            }
        }
    }

    setPositionFilter(arr, tm) {
        const data = [];
        const empty = [];

        for (let i = 0; i < arr.length; i++) {
            data.push({
                type: 'NORMAL',
                item: arr[i]
            })
        }

        if (tm === selectedTeam) {
            this.setState({
                list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
                filteredList: arr
            });
        } else {
            this.setState({
                listT2: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
                filteredListT2: arr
            });
        }

    }


    constructor() {
        super();
        const data = [];
        const dataT2 = [];
        let arrayForFilter = [];
        let arrayForFilterT2 = [];
        this.setPositionFilter = this.setPositionFilter.bind(this);

        arrayForFilter = selectedTeam.roster;
        for (let i = 0; i < selectedTeam.roster.length; i++) {
            data.push({
                type: 'NORMAL',
                item: sortedRoster(selectedTeam, 'rating')[i]
            })
        }

        arrayForFilterT2 = selectedTeam2.roster;
        for (let i = 0; i < selectedTeam2.roster.length; i++) {
            dataT2.push({
                type: 'NORMAL',
                item: sortedRoster(selectedTeam2, 'rating')[i]
            })
        }
        this.state = {
            t1Offers: [],
            t2Offers: [],
            declined: '',
            t1salary: selectedTeam.salary,
            t2salary: selectedTeam2.salary,
            modalVisible: false,
            modalPlayer: null,
            arrayForFilter: arrayForFilter,
            arrayForFilterT2: arrayForFilterT2,
            list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
            listT2: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(dataT2)
        }

        this.layoutProvider = new LayoutProvider((i) => {
            return this.state.list.getDataForIndex(i).type
        }, (type, dim) => {
            switch (type) {
                case 'NORMAL':
                    dim.width = width;
                    dim.height = 70;
                    break;
                default:
                    dim.width = 0;
                    dim.height = 0;
                    break
            }
        })

        this.layoutProvider2 = new LayoutProvider((i) => {
            return this.state.listT2.getDataForIndex(i).type
        }, (type, dim) => {
            switch (type) {
                case 'NORMAL':
                    dim.width = width;
                    dim.height = 70;
                    break;
                default:
                    dim.width = 0;
                    dim.height = 0;
                    break
            }
        })
    }

    rowRenderer = (type, data) => {
        let player = data.item;
        if (player.isPick) {
            let pick = player;
            return (
                <ListItem onPress={() => { this.addToTrade(pick, selectedTeam) }}
                    title={pick.originalTeam + ' Draft Pick'}
                    subtitle={'Round: ' + pick.round + ' Projected Pick: ' + getDraftPickProjectedPick(pick)}
                    bottomDivider={true}
                    leftAvatar={'https://on-paper-sports.s3.us-east-2.amazonaws.com/player_portraits/NBA-Player.png'}
                    rightTitle={this.state.t1Offers.includes(pick) ? "SELECTED" : null}

                ></ListItem>
            )
        }
        return (
            <ListItem onPress={() => { this.addToTrade(player, selectedTeam) }}
                title={player.positionString + ' #' + player.number + ' ' + player.name}
                leftAvatar={player.faceSrc} subtitle={'Rating: ' + player.rating + ' Age: ' + player.age}
                bottomDivider={true}
                rightSubtitle={'$' + displaySalary(player.salary)}
                rightTitle={this.state.t1Offers.includes(player) ? "SELECTED" : null}
                onLongPress={() => this.setModalVisible(true, player)}

            ></ListItem>
        );

    }

    rowRendererT2 = (type, data) => {
        let player = data.item;
        if (player.isPick) {
            let pick = player;
            return (
                <ListItem onPress={() => { this.addToTrade(pick, selectedTeam2) }}
                    title={pick.originalTeam + ' Draft Pick'}
                    subtitle={'Round: ' + pick.round + ' Projected Pick: ' + getDraftPickProjectedPick(pick)}
                    bottomDivider={true}
                    leftAvatar={'https://on-paper-sports.s3.us-east-2.amazonaws.com/player_portraits/NBA-Player.png'}
                    rightTitle={this.state.t2Offers.includes(pick) ? "SELECTED" : null}

                ></ListItem>
            )
        }
        return (
            <ListItem onPress={() => { this.addToTrade(player, selectedTeam2) }}
                title={player.positionString + ' #' + player.number + ' ' + player.name}
                leftAvatar={player.faceSrc} subtitle={'Rating: ' + player.rating + ' Age: ' + player.age}
                bottomDivider={true}
                rightSubtitle={'$' + displaySalary(player.salary)}
                rightTitle={this.state.t2Offers.includes(player) ? "SELECTED" : null}
                onLongPress={() => this.setModalVisible(true, player)}

            ></ListItem>
        );

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

        const data = [];

        if (selectedTeam === team) {
            if (this.state.filteredList != null) {
                for (let i = 0; i < this.state.filteredList.length; i++) {
                    data.push({
                        type: 'NORMAL',
                        item: this.state.filteredList[i]
                    })
                }
            } else {
                for (let i = 0; i < team.roster.length; i++) {
                    data.push({
                        type: 'NORMAL',
                        item: sortedRoster(team, 'rating')[i]
                    })
                }
            }

            this.setState({
                list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
            });

        } else {
            if (this.state.filteredListT2 != null) {
                for (let i = 0; i < this.state.filteredListT2.length; i++) {
                    data.push({
                        type: 'NORMAL',
                        item: this.state.filteredListT2[i]
                    })
                }
            } else {
                for (let i = 0; i < team.roster.length; i++) {
                    data.push({
                        type: 'NORMAL',
                        item: sortedRoster(team, 'rating')[i]
                    })
                }
            }

            this.setState({
                listT2: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
            });
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
        let fws = 0;
        let def = 0;
        let goalies = 0;
        let t2fws = 0;
        let t2def = 0;
        let t2goalies = 0;
        let t1CanTrade = false;
        let t2CanTrade = false;

        for (let i = 0; i < selectedTeam.roster.length; i++) {
            let ply = selectedTeam.roster[i];
            if (ply.position < 3) {
                //forward
                fws++;
            } else if (ply.position === 3) {
                def++;
            } else if (ply.position === 4) {
                goalies++;
            }
        }

        for (let i = 0; i < selectedTeam2.roster.length; i++) {
            let ply = selectedTeam2.roster[i];
            if (ply.position < 3) {
                //forward
                t2fws++;
            } else if (ply.position === 3) {
                t2def++;
            } else if (ply.position === 4) {
                t2goalies++;
            }
        }
        for (let i = 0; i < this.state.t1Offers.length; i++) {
            let ply = this.state.t1Offers[i];
            if (ply.isPick) {
                //draft pick
            }
            else if (ply.position < 3) {
                //forward
                fws--;
                t2fws++;
            } else if (ply.position === 3) {
                def--;
                t2def++;
            } else if (ply.position === 4) {
                goalies--;
                t2goalies++;
            }
        }
        for (let i = 0; i < this.state.t2Offers.length; i++) {
            let ply = this.state.t2Offers[i];
            if (ply.isPick) {
                //draft pick
            }
            else if (ply.position < 3) {
                //forward
                fws++;
                t2fws--;
            } else if (ply.position === 3) {
                def++;
                t2def--;
            } else if (ply.position === 4) {
                goalies++;
                t2goalies--;
            }
        }

        if (fws >= 12 && def >= 6 && goalies >= 2) {
            t1CanTrade = true;
        }
        if (t2fws >= 12 && t2def >= 6 && t2goalies >= 2) {
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

            if (this.props.popTo != null) {
                Actions.popTo(this.props.popTo);
            } else {
                Actions.pop();
            }
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
                                    <PlayerCardModal modalPlayer={this.state.modalPlayer}></PlayerCardModal>
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

                <PositionFilter roster={this.state.arrayForFilter} setPositionFilter={this.setPositionFilter} draftPicks={selectedTeam.draftPicks} team={selectedTeam}></PositionFilter>

                <RecyclerListView style={{ flex: 1, padding: 0, margin: 0 }} rowRenderer={this.rowRenderer} dataProvider={this.state.list} layoutProvider={this.layoutProvider} forceNonDeterministicRendering={false} />

                <View style={{ backgroundColor: 'rgba(255,255,255,0)', borderBottomWidth: 1 }}>
                    <CachedImage
                        style={{ resizeMode: 'contain', height: 50 }}
                        uri={selectedTeam2.logoSrc} />
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{selectedTeam2.name}</Text>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{'Cap Space: $' + displaySalary((this.state.t2salary - CAPROOM) * -1)}</Text>

                </View>
                <PositionFilter roster={this.state.arrayForFilterT2} setPositionFilter={this.setPositionFilter} draftPicks={selectedTeam2.draftPicks} team={selectedTeam2}></PositionFilter>

                <RecyclerListView style={{ flex: 1, padding: 0, margin: 0 }} rowRenderer={this.rowRendererT2} dataProvider={this.state.listT2} layoutProvider={this.layoutProvider2} forceNonDeterministicRendering={false} />


            </Background>
        )
    }
}
