import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native';
import Background from '../components/background';
import CachedImage from '../components/CachedImage';
import { releasePlayer, availableFreeAgents, selectedTeam } from '../data/script';


export default class PlayerProfile extends React.Component {

    componentWillUnmount(){
        if(this.props.update!= null){
            this.props.update();
        }
    }

    refresh = () => {
        Actions.refresh();
    }

    state={
        player : this.props.selectedPlayer
    }

    updateState = () => {
        this.setState({player: this.props.selectedPlayer});
    }

    render() {
        return (

            <Background>

                <ScrollView style={{ flex: 1 }} >

                    <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.editplayerinfo({ selectedPlayer: this.state.player, updateState : this.updateState })}>

                        <Card
                            containerStyle={{
                                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                borderRadius: 25,
                                alignSelf:'center'
                            }} >

                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <CachedImage uri={this.state.player.teamLogoSrc} style={{ height: 30, width: 30, maxHeight: 30, resizeMode: 'contain', marginRight: 5 }} />
                                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{this.state.player.teamName}</Text>

                            </View>

                            <Divider style={{ backgroundColor: 'white', margin: 10 }}></Divider>


                            <CachedImage style={{ height: 75, width: 75, maxHeight: 75, resizeMode: 'contain', flexDirection: 'column', alignSelf: 'center', marginBottom: 3 }} uri={this.state.player.faceSrc} />
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{this.state.player.positionString + ' #' + this.state.player.number + ' ' + this.state.player.name}</Text>
                            <Divider style={{ backgroundColor: 'white', margin: 10 }}></Divider>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Age: ' + this.state.player.age}</Text>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Height: ' + this.state.player.height}</Text>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Contract Years Remaining: ' + this.state.player.years}</Text>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Salary: $' + (this.state.player.salary / 1000000).toFixed(1) + " Million"}</Text>



                        </Card>
                    </TouchableOpacity>



                    <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.editplayerratings({ selectedPlayer: this.state.player, updateState : this.updateState })}>

                        <Card
                            containerStyle={{
                                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                borderRadius: 25,
                                alignSelf:'center'
                            }} >

                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Ratings'}</Text>
                            <Divider style={{ backgroundColor: 'white', margin: 10 }}></Divider>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"OVR: " + this.state.player.rating}</Text>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"OFF: " + this.state.player.off}</Text>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"DEF: " + this.state.player.def}</Text>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"REB: " + this.state.player.reb}</Text>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"3PT: " + this.state.player.threePoint}</Text>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"FT: " + this.state.player.ft}</Text>
                        </Card>
                    </TouchableOpacity>

                    {
                        this.props.view === 'draft' ? (
                            <TouchableOpacity style={{ width: '100%' }} onPress={() => { this.props.franchise.currentDraft.userPick(this.state.player), this.props.update(), Actions.popTo('draftmenu') }}>

                                <Card
                                    containerStyle={{
                                        width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                        borderRadius: 25,
                                        alignSelf:'center'
                                    }} >

                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Draft Player'}</Text>
                                    <Divider style={{ backgroundColor: 'white', margin: 10 }}></Divider>
                                </Card>
                            </TouchableOpacity>




                        ) :



                            <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.playerstatshistory({ player: this.state.player }) }}>

                                <Card
                                    containerStyle={{
                                        width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                        borderRadius: 25,
                                        alignSelf:'center'
                                    }} >

                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Season Stats'}</Text>
                                    <Divider style={{ backgroundColor: 'white', margin: 10 }}></Divider>
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"PPG: " + (Math.round((this.state.player.seasonPoints / this.state.player.statsHistory.length) * 10) / 10)}</Text>
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"REB: " + this.state.player.seasonRebounds}</Text>
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"2PA: " + this.state.player.seasonTwoPointersAtt}</Text>
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"2PM: " + this.state.player.seasonTwoPointersMade}</Text>
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"3PA: " + this.state.player.seasonThreePointersAtt}</Text>
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"3PM: " + this.state.player.seasonThreePointersMade}</Text>
                                </Card>
                            </TouchableOpacity>

                    }

                </ScrollView>
            </Background>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});
