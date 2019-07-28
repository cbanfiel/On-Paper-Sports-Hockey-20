import React from 'react';
import { TouchableOpacity, Text, ScrollView, View } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { Actions, ActionConst } from 'react-native-router-flux';
import { teams, draftClass, selectedTeam, franchise, setInDraft } from '../data/script';
import Background from '../components/background';
import Picache from 'picache';
import CachedImage from '../components/CachedImage';

export default class DraftMenu extends React.Component {

    static onEnter() {
        setInDraft();
    }

    state = {
        onTheClock: !franchise.completed? franchise.currentDraft.draftOrder[franchise.currentDraft.pick].currentTeam : franchise.currentDraft.draftOrder[franchise.currentDraft.pick-1].currentTeam,

        draftClass: draftClass,
        drafted: franchise.currentDraft.drafted,
        advance: franchise.currentDraft.completed,
        pick: franchise.currentDraft.pick,
        round: franchise.currentDraft.round
    }


    update = () => {
        try {
            this.setState({
                onTheClock: franchise.currentDraft.draftOrder[franchise.currentDraft.pick].currentTeam,
                draftClass: draftClass,
                drafted: franchise.currentDraft.drafted,
                advance: franchise.currentDraft.completed,
                pick: franchise.currentDraft.pick,
                round: franchise.currentDraft.round
            })
        } catch (err) {
            this.setState({
                draftClass: draftClass,
                drafted: franchise.currentDraft.drafted,
                advance: true,
                pick: franchise.currentDraft.pick,
                round: franchise.currentDraft.round
            })
        }
    }

    render() {
        return (
            <Background>
                <ScrollView>
                    {
                        this.state.advance === false ? (




                            <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.rosterlist({ selectedTeam: draftClass, view: 'draft', selectable: true, franchise: franchise, update: this.update }) }}>
                                <Card
                                    containerStyle={{
                                        width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                        borderRadius: 25,
                                        alignSelf: 'center'
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: this.state.onTheClock.logoSrc }} />
                                    </View>
                                    <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'On The Clock: ' + this.state.onTheClock.name}</Text>
                                </Card>
                            </TouchableOpacity>



                        ) : null
                    }


                    {
                        this.state.pick > 0 || this.state.round > 0 ? (
                            <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.rosterlist({ selectedTeam: franchise.currentDraft.drafted, view: 'draft' }) }}>
                                <Card
                                    containerStyle={{
                                        width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                        borderRadius: 25,
                                        alignSelf: 'center'
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: this.state.drafted.roster[0].teamLogoSrc }} />
                                        <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: this.state.drafted.roster[0].faceSrc }} />
                                    </View>
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{this.state.drafted.roster[0].positionString + ' ' + this.state.drafted.roster[0].name + ' OVR:' + this.state.drafted.roster[0].rating}</Text>
                                    <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>

                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Draft Board'}</Text>
                                </Card>
                            </TouchableOpacity>
                        ) : null
                    }


                    {
                        this.state.advance === true ? (
                            <TouchableOpacity style={{ width: '100%' }} onPress={() => { franchise.stage = 'resigning', franchise.simStage(), this.props.teamListStage(franchise.stage), Actions.replace('resigningstage', {teamListStage: this.props.teamListStage}) }}>

                                <Card
                                    containerStyle={{
                                        width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                        borderRadius: 25,
                                        alignSelf: 'center'
                                    }}
                                >

                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: selectedTeam.logoSrc }} />
                                    </View>
                                    <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Advance To Free Agency'}</Text>
                                </Card>
                            </TouchableOpacity>




                        ) :



                            <View>
                                <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.teamlist({ home: 3, back: 'season', isForced: false, updateScene: this.update, requirementsOff: true })}>
                                    <Card
                                        containerStyle={{
                                            width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                            borderRadius: 25,
                                            alignSelf: 'center'
                                        }}
                                    >

                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc} />
                                        </View>
                                        <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
                                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Trade'}</Text>
                                    </Card>
                                </TouchableOpacity>


                                <TouchableOpacity style={{ width: '100%' }} onPress={() => { franchise.currentDraft.simPick(), this.update() }}>
                                    <Card
                                        containerStyle={{
                                            width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                            borderRadius: 25,
                                            alignSelf: 'center'
                                        }}
                                    >
                                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Sim Pick'}</Text>
                                    </Card>
                                </TouchableOpacity>

                            </View>


                    }
                    {
                        this.state.advance === false ? (





                            <TouchableOpacity style={{ width: '100%' }} onPress={() => { franchise.currentDraft.simDraft(), this.update(), this.setState({pick: teams.length, round : 2}) }}>
                                <Card
                                    containerStyle={{
                                        width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                        borderRadius: 25,
                                        alignSelf: 'center'
                                    }}
                                >
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Sim To End'}</Text>
                                </Card>
                            </TouchableOpacity>


                        ) : null
                    }
                    {this.state.advance === false ? (
                        <TouchableOpacity style={{ width: '100%' }} onPress={() => { franchise.currentDraft.simToNextUserPick(), this.update() }}>
                            <Card
                                containerStyle={{
                                    width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                    borderRadius: 25,
                                    alignSelf: 'center'
                                }}
                            // image={{ uri: selectedTeam.logoSrc }}
                            // 
                            >
                                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Sim To Next User Pick'}</Text>
                            </Card>
                        </TouchableOpacity>
                    ) : null


                    }




                </ScrollView>

            </Background>





        )
    }
}