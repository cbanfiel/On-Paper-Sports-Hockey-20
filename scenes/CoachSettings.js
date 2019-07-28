import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, Card, Slider, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import { selectedTeam } from '../data/script';
import CachedImage from '../components/CachedImage';

export default class CoachSettings extends React.Component {
    state = {
        offVsDefFocus: selectedTeam.offVsDefFocus,
        offTwoVsThree: selectedTeam.offTwoVsThree,
        defTwoVsThree: selectedTeam.defTwoVsThree,
        tempo: selectedTeam.tempo,
        rotationSize: selectedTeam.rotationSize,
        frontCourtVsBackCourt: selectedTeam.frontCourtVsBackCourt,
        reboundVsRunInTransition: selectedTeam.reboundVsRunInTransition
    }



    saveChanges() {
        selectedTeam.offVsDefFocus = this.state.offVsDefFocus;
        selectedTeam.offTwoVsThree = this.state.offTwoVsThree;
        selectedTeam.defTwoVsThree = this.state.defTwoVsThree;
        selectedTeam.tempo = this.state.tempo;
        selectedTeam.frontCourtVsBackCourt = this.state.frontCourtVsBackCourt;
        selectedTeam.reboundVsRunInTransition =  this.state.reboundVsRunInTransition;
        if(this.props.inGame!=true){
            if(this.state.rotationSize != selectedTeam.rotationSize){
                selectedTeam.rotationSize = this.state.rotationSize;
                selectedTeam.reorderLineup();
            }
        }
        Actions.pop();
    }


    getOffVsDefFocusString() {
        if (this.state.offVsDefFocus === 0) {
            return "Focus: Balanced"
        } else if (this.state.offVsDefFocus > 0) {
            return "Focus: Offense"
        } else {
            return "Focus: Defense"
        }
    }

    getOffTwoVsThreeString() {
        if (this.state.offTwoVsThree === 0) {
            return "Offensive Focus: Balanced"
        } else if (this.state.offTwoVsThree > 0) {
            return "Offensive Focus: Three Point"
        } else {
            return "Offensive Focus: Two Point"
        }
    }

    getDefTwoVsThree() {
        if (this.state.defTwoVsThree === 0) {
            return "Defensive Focus: Balanced"
        } else if (this.state.defTwoVsThree > 0) {
            return "Defensive Focus: Limit Three Pointers"
        } else {
            return "Defensive Focus: Protect The Paint"
        }
    }

    getTempo() {
        if (this.state.tempo === 0) {
            return "Tempo: Balanced"
        } else if (this.state.tempo > 0) {
            return "Tempo: Fast Tempo"
        } else {
            return "Tempo: Slow Tempo"
        }
    }

    getFrontCourtVsBackCourt() {
        if (this.state.frontCourtVsBackCourt === 0) {
            return "Scoring Focus: Balanced"
        } else if (this.state.frontCourtVsBackCourt > 0) {
            return "Scoring Focus: Backcourt"
        } else {
            return "Scoring Focus: Frontcourt"
        }
    }

    getReboundVsRunInTransition() {
        if (this.state.reboundVsRunInTransition === 0) {
            return "Rebounding Focus: Balanced"
        } else if (this.state.reboundVsRunInTransition > 0) {
            return "Rebounding Focus: Run In Transition"
        } else {
            return "Rebounding Focus: Crash The Boards"
        }
    }



    render() {
        return (
            <Background>
                <ScrollView >

                    <Card
                        containerStyle={{
                            width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                            borderRadius: 25,
                            alignSelf:'center'
                        }} >
{
                this.props.inGame ===  true? (

                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                            <Text style={{ textAlign: "center", fontSize: 15, color: 'white', fontFamily: 'advent-pro' }}>{'Note: These changes only affect the current game, to make them permanent make sure to set them in your teams Coach Settings'}</Text>
                        </View>    
                ): null
}

                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <CachedImage uri={selectedTeam.logoSrc} style={{ height: 30, width: 30, maxHeight: 30, resizeMode: 'contain', marginRight: 5 }} />
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{selectedTeam.name}</Text>
                        </View>
                        <Divider style={{ backgroundColor: 'white', margin: 10 }}></Divider>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{this.getOffVsDefFocusString()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-3}
                            maximumValue={3}
                            value={this.state.offVsDefFocus}
                            onValueChange={value => { this.setState({ offVsDefFocus: value }) }}
                        />



                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{this.getOffTwoVsThreeString()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-3}
                            maximumValue={3}
                            value={this.state.offTwoVsThree}
                            onValueChange={value => { this.setState({ offTwoVsThree: value }) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{this.getDefTwoVsThree()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-3}
                            maximumValue={3}
                            value={this.state.defTwoVsThree}
                            onValueChange={value => { this.setState({ defTwoVsThree: value }) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{this.getTempo()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-3}
                            maximumValue={3}
                            value={this.state.tempo}
                            onValueChange={value => { this.setState({ tempo: value }) }}
                        />

                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{this.getFrontCourtVsBackCourt()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-3}
                            maximumValue={3}
                            value={this.state.frontCourtVsBackCourt}
                            onValueChange={value => { this.setState({ frontCourtVsBackCourt: value }) }}
                        />   

                         <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{this.getReboundVsRunInTransition()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-3}
                            maximumValue={3}
                            value={this.state.reboundVsRunInTransition}
                            onValueChange={value => { this.setState({ reboundVsRunInTransition: value }) }}
                        />            

                    {
                        this.props.inGame === true ? (null):
                        <View>

                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Rotation Size: " + this.state.rotationSize}</Text>
                            <Slider
                                thumbTintColor={'rgb(180,180,180)'}
                                maximumTrackTintColor={'rgb(180,180,180)'}
                                step={1}
                                minimumValue={8}
                                maximumValue={12}
                                value={this.state.rotationSize}
                                onValueChange={value => { this.setState({ rotationSize: value }) }}
                            />

                        </View>


                    }


                        <Button titleStyle={{ fontFamily: 'advent-pro' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderRadius: 25 }} title="Commit Changes" onPress={() => { this.saveChanges() }}></Button>


                    </Card>





                </ScrollView>
            </Background>





        )
    }
}

