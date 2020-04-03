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
        onTheClock: !franchise.completed ? franchise.currentDraft.draftOrder[franchise.currentDraft.pick].currentTeam : franchise.currentDraft.draftOrder[franchise.currentDraft.pick - 1].currentTeam,

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
                <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                    {
                        this.state.advance === false ? (




                            <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.rosterlist({ selectedTeam: draftClass, view: 'draft', selectable: true, franchise: franchise, update: this.update }) }}>
                                <Card
                                    containerStyle={{
                                        width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                                        borderColor: 'black',
                                        alignSelf: 'center'
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: this.state.onTheClock.logoSrc }} />
                                    </View>
                                    <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'On The Clock: ' + this.state.onTheClock.name}</Text>
                                </Card>
                            </TouchableOpacity>



                        ) : null
                    }


                    {
                        this.state.pick > 0 || this.state.round > 0 ? (
                            <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.rosterlist({ selectedTeam: franchise.currentDraft.drafted, view: 'draft' }) }}>
                                <Card
                                    containerStyle={{
                                        width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                                        borderColor: 'black',
                                        alignSelf: 'center'
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: this.state.drafted.roster[0].teamLogoSrc }} />
                                        <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: this.state.drafted.roster[0].faceSrc }} />
                                    </View>
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.state.drafted.roster[0].positionString + ' ' + this.state.drafted.roster[0].name + ' OVR:' + this.state.drafted.roster[0].rating}</Text>
                                    <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>

                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Draft Board'}</Text>
                                </Card>
                            </TouchableOpacity>
                        ) : null
                    }


                    {
                        this.state.advance === true ? (
                            <TouchableOpacity style={{ width: '100%' }} onPress={() => { franchise.stage = 'resigning', franchise.simStage(), this.props.teamListStage(franchise.stage), Actions.replace('resigningstage', { teamListStage: this.props.teamListStage }) }}>

                                <Card
                                    containerStyle={{
                                        width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                                        borderColor: 'black',
                                        alignSelf: 'center'
                                    }}
                                >

                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: selectedTeam.logoSrc }} />
                                    </View>
                                    <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Advance To Free Agency'}</Text>
                                </Card>
                            </TouchableOpacity>




                        ) :



                            <View>
                                <View style={{ display: 'flex', flexDirection: 'row', width: '95%', alignSelf: 'center' }}>

                                    <TouchableOpacity style={{ width: '97%', flex: 1, marginRight: '1.25%' }} onPress={() => Actions.tradefinder({ popTo: Actions.currentScene, requirementsOff: true, updateScene: this.update })}>
                                        <Card
                                            containerStyle={{
                                                width: '100%', backgroundColor: 'rgba(255,255,255,0)', alignSelf: 'center', borderColor: 'rgba(0,0,0,0.9)'
                                            }}
                                        >

                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc} />
                                            </View>
                                            <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
                                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Trade Finder'}</Text>
                                        </Card>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ width: '97%', flex: 1, marginLeft: '1.25%' }} onPress={() => Actions.teamlist({ home: 3, back: 'season', isForced: false, updateScene: this.update, requirementsOff: true })}>
                                        <Card
                                            containerStyle={{
                                                width: '100%', backgroundColor: 'rgba(0,0,0,0)',
                                                borderColor: 'black',
                                                alignSelf: 'center'
                                            }}
                                        >

                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc} />
                                            </View>
                                            <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
                                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Trade'}</Text>
                                        </Card>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity style={{ width: '100%' }} onPress={() => { franchise.currentDraft.simPick(), this.update() }}>
                                    <Card
                                        containerStyle={{
                                            width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                                            borderColor: 'black',
                                            alignSelf: 'center'
                                        }}
                                    >
                                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Sim Pick'}</Text>
                                    </Card>
                                </TouchableOpacity>

                            </View>


                    }
                    {
                        this.state.advance === false ? (





                            <TouchableOpacity style={{ width: '100%' }} onPress={() => { franchise.currentDraft.simDraft(), this.update(), this.setState({ pick: teams.length, round: 2 }) }}>
                                <Card
                                    containerStyle={{
                                        width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                                        borderColor: 'black',
                                        alignSelf: 'center'
                                    }}
                                >
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Sim To End'}</Text>
                                </Card>
                            </TouchableOpacity>


                        ) : null
                    }
                    {this.state.advance === false ? (
                        <TouchableOpacity style={{ width: '100%' }} onPress={() => { franchise.currentDraft.simToNextUserPick(), this.update() }}>
                            <Card
                                containerStyle={{
                                    width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                                    borderColor: 'black',
                                    alignSelf: 'center'
                                }}
                            // image={{ uri: selectedTeam.logoSrc }}
                            // 
                            >
                                <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Sim To Next User Pick'}</Text>
                            </Card>
                        </TouchableOpacity>
                    ) : null


                    }




                </ScrollView>

            </Background>





        )
    }
}