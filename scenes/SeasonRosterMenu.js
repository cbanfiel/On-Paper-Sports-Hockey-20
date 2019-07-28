import React from 'react';
import { TouchableOpacity, Text, View, ScrollView} from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { selectedTeam, leaugeLeaders, setSelectedTeam2, franchise, collegeMode } from '../data/script';
import Background from '../components/background';
import CachedImage from '../components/CachedImage';


export default class SeasonRosterMenu extends React.Component {

    componentWillUnmount(){
        this.props.updateLineupState();
    }


    render() {

        return (
            <Background>
                <ScrollView >
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.rosterlist({ selectedTeam: selectedTeam, back: 'seasonmenu' }) }}>
                        <Card
                            containerStyle={{
                                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                borderRadius: 25,
                                alignSelf:'center'
                            }}
                            >

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc } />
                            </View>
                            <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Current Roster'}</Text>
                        </Card>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.editlineupmenu()}}>
                        <Card
                            containerStyle={{
                                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                borderRadius: 25,
                                alignSelf:'center'
                            }}
                            >

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc } />
                            </View>
                            <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Edit Lineup'}</Text>
                        </Card>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.playerrolemenu()}}>
                        <Card
                            containerStyle={{
                                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                borderRadius: 25,
                                alignSelf:'center'
                            }}
                            >

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc } />
                            </View>
                            <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Edit Player Roles'}</Text>
                        </Card>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.push('coachsettings')}}>
                        <Card
                            containerStyle={{
                                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                borderRadius: 25,
                                alignSelf:'center'
                            }}
                            >

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <CachedImage style={{ flex: 1, overflow: 'hidden',  resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri = { selectedTeam.logoSrc } />
                            </View>
                            <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Coach Settings'}</Text>
                        </Card>
                    </TouchableOpacity>

{
    !collegeMode ? (
                <View>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.teamlist({ home: 3, back: 'season', isForced: false })}>
                        <Card
                            containerStyle={{
                                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                borderRadius: 25,
                                alignSelf:'center'
                            }}
                            >

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc } />
                            </View>
                            <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Trade'}</Text>
                        </Card>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.signplayermenu({ back: 'seasonmenu', forced:false }) }}>
                        <Card
                            containerStyle={{
                                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                borderRadius: 25,
                                alignSelf:'center'
                            }}
                            >

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc } />
                            </View>
                            <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Free Agency'}</Text>
                        </Card>
                    </TouchableOpacity>

                    

                    <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.draftclassmenu({ back: 'seasonmenu' }) }}>
                        <Card
                            containerStyle={{
                                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                borderRadius: 25,
                                alignSelf:'center'
                            }}
                            >

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc } />
                            </View>
                            <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'View Draft Class'}</Text>
                        </Card>
                    </TouchableOpacity>
                    </View>
        ) : null

}

<TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.playersearch() }}>
                        <Card
                            containerStyle={{
                                width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                                borderRadius: 25,
                                alignSelf:'center'
                            }}
                            >

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc } />
                            </View>
                            <Divider style={{ backgroundColor: 'white', height: 1, margin: 5 }} ></Divider>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Player Search'}</Text>
                        </Card>
                    </TouchableOpacity>

                </ScrollView>
            </Background>

        )

    }

}