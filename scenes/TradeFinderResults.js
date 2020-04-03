import React from 'react';
import { Text, View, ScrollView, Alert, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Button, Card, Icon, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { selectedTeam, selectedTeam2, trade, sortedRoster, displaySalary, CAPROOM, setPowerRankings, getDraftPickProjectedPick, inDraft, teams, returnStatsView, getTradeFinderOffers, setSelectedTeam2 } from '../data/script';
import Background from '../components/background';
import CachedImage from '../components/CachedImage';
import ListItem from '../components/ListItem';
import PlayerCardModal from '../components/PlayerCardModal';
import { LayoutProvider, DataProvider, RecyclerListView } from 'recyclerlistview';
var { height, width } = Dimensions.get('window');
import PositionFilter from '../components/PositionFilter';
import TradeFinderListItem from '../components/TradeFinderListItem';



export default class TradeFinderResults extends React.Component {

    constructor(props) {
        super(props);
        let userOffer = { team: selectedTeam, players: this.props.userOffer }
        const data = [];
        let arrayForFilter = [];
        arrayForFilter = this.props.offers;

        for (let i = 0; i < this.props.offers.length; i++) {
            data.push({
                type: 'NORMAL',
                item: this.props.offers[i]
            })
        }

        this.state = {
            t1salary: selectedTeam.salary,
            t2salary: selectedTeam2.salary,
            arrayForFilter: arrayForFilter,
            list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
            userOffer: userOffer
        }

        this.layoutProvider = new LayoutProvider((i) => {
            return this.state.list.getDataForIndex(i).type
        }, (type, dim) => {
            switch (type) {
                case 'NORMAL':
                    dim.width = width;
                    dim.height = 140;
                    break;
                default:
                    dim.width = 0;
                    dim.height = 0;
                    break
            }
        });
    }


    rowRenderer = (type, data) => {
        let offer = data.item;
        return (
            <TradeFinderListItem offer={offer} onPress={() => { setSelectedTeam2(offer.team), Actions.trademenu({ t1Offers: this.state.userOffer, t2Offers: offer, popTo: this.props.popTo, requirementsOff: this.props.requirementsOff, updateScene: this.props.updateScene }) }} />
        );

    }
    render() {

        return (
            <Background>

                <View style={{ backgroundColor: 'rgba(255,255,255,0)', borderBottomWidth: 0.5 }}>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{selectedTeam.name + " Offer"}</Text>
                    <TradeFinderListItem offer={this.state.userOffer} />


                </View>
                <View style={{ backgroundColor: 'rgba(255,255,255,0)', borderBottomWidth: 1, padding: 10 }}>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{"Your Offers: "}</Text>


                </View>
                <RecyclerListView style={{ flex: 1, padding: 0, margin: 0 }} rowRenderer={this.rowRenderer} dataProvider={this.state.list} layoutProvider={this.layoutProvider} forceNonDeterministicRendering={false} />

            </Background>
        )
    }
}
