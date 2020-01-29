import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, Card, Slider, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import { selectedTeam, displaySalary } from '../data/script';
import CachedImage from '../components/CachedImage';

export default class CoachSettings extends React.Component {

    update = (_callback, popto) => {
        this.setState({
            offVsDefFocus: selectedTeam.coach.offVsDefFocus,
            qualityVsQuantity: selectedTeam.coach.qualityVsQuantity,
            defenseAggresiveVsConservative: selectedTeam.coach.defenseAggresiveVsConservative,
            forwardsVsDefensemen: selectedTeam.coach.forwardsVsDefensemen,
            rotationSize: selectedTeam.coach.rotationSize,
            frontCourtVsBackCourt: selectedTeam.coach.frontCourtVsBackCourt,
            freezeThePuckVsPlayThePuck: selectedTeam.coach.freezeThePuckVsPlayThePuck
        }, () => _callback(popto))
    }

    constructor(props){
        super(props);

        if(selectedTeam.coach != null){
            this.state = {
                offVsDefFocus: selectedTeam.coach.offVsDefFocus,
                qualityVsQuantity: selectedTeam.coach.qualityVsQuantity,
                defenseAggresiveVsConservative: selectedTeam.coach.defenseAggresiveVsConservative,
                forwardsVsDefensemen: selectedTeam.coach.forwardsVsDefensemen,
                rotationSize: selectedTeam.coach.rotationSize,
                frontCourtVsBackCourt: selectedTeam.coach.frontCourtVsBackCourt,
                freezeThePuckVsPlayThePuck: selectedTeam.coach.freezeThePuckVsPlayThePuck
            }
        }
    }



    saveChanges() {
        selectedTeam.coach.offVsDefFocus = this.state.offVsDefFocus;
        selectedTeam.coach.qualityVsQuantity = this.state.qualityVsQuantity;
        selectedTeam.coach.defenseAggresiveVsConservative = this.state.defenseAggresiveVsConservative;
        selectedTeam.coach.forwardsVsDefensemen = this.state.forwardsVsDefensemen;
        selectedTeam.coach.frontCourtVsBackCourt = this.state.frontCourtVsBackCourt;
        selectedTeam.coach.freezeThePuckVsPlayThePuck =  this.state.freezeThePuckVsPlayThePuck;
        if(this.props.inGame!=true){
            if(this.state.rotationSize != selectedTeam.rotationSize){
                selectedTeam.coach.rotationSize = this.state.rotationSize;
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

    getqualityVsQuantityString() {
        if (this.state.qualityVsQuantity === 0) {
            return "Shot Focus: Balanced"
        } else if (this.state.qualityVsQuantity > 0) {
            return "Shot Focus: Quantity"
        } else {
            return "Shot Focus: Quality"
        }
    }

    getdefenseAggresiveVsConservative() {
        if (this.state.defenseAggresiveVsConservative === 0) {
            return "Defensive Focus: Balanced"
        } else if (this.state.defenseAggresiveVsConservative > 0) {
            return "Defensive Focus: Aggresive"
        } else {
            return "Defensive Focus: Conservative"
        }
    }

    getforwardsVsDefensemen() {
        if (this.state.forwardsVsDefensemen === 0) {
            return "Scoring Focus: Balanced"
        } else if (this.state.forwardsVsDefensemen > 0) {
            return "Scoring Focus: Forwards"
        } else {
            return "Scoring Focus: Defenseman"
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

    getfreezeThePuckVsPlayThePuck() {
        if (this.state.freezeThePuckVsPlayThePuck === 0) {
            return "Goalie Focus: Balanced"
        } else if (this.state.freezeThePuckVsPlayThePuck > 0) {
            return "Goalie Focus: Play The Puck"
        } else {
            return "Goalie Focus: Freeze The Puck"
        }
    }



    render() {
        return (
            <Background>
                        {selectedTeam.coach != null?(

                <ScrollView contentContainerStyle={{paddingBottom: 20}}>

                    {!this.props.inGame ? (
                    <Card
                
                containerStyle={{
                    width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                    borderColor: 'black',
                    alignSelf:'center'
                }} >
                         <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <CachedImage uri={selectedTeam.logoSrc} style={{ height: 30, width: 30, maxHeight: 30, resizeMode: 'contain', marginRight: 5 }} />
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{selectedTeam.name}</Text>
                </View>
                <Divider style={{ backgroundColor: 'black'}}></Divider>
                    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <CachedImage uri={selectedTeam.coach.faceSrc} style={{ height: 100, width: 100, maxHeight: 100, resizeMode: 'contain', marginRight: 5 }} />
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'HC: ' + selectedTeam.coach.name}</Text>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Age: ' + selectedTeam.coach.age}</Text>
                    <Text style={{ textAlign: "center", fontSize: 20, color: selectedTeam.coach.contractExpired? 'red' : 'black', fontFamily: 'advent-pro' }}>{selectedTeam.coach.contractExpired? 'CONTRACT EXPIRED' :selectedTeam.coach.years + ' Years $' + displaySalary(selectedTeam.coach.salary)}</Text>


                </View>
                <Divider style={{ backgroundColor: 'black', margin: 10 }}></Divider>
                    <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'OFF: ' + selectedTeam.coach.offenseRating}</Text>
                    <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'DEF: ' + selectedTeam.coach.defenseRating}</Text>
                    <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'SIGNING: ' + selectedTeam.coach.signingInterest}</Text>
                    <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'TRAINING: ' + selectedTeam.coach.training}</Text>

                    <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderColor: 'black', marginTop: 5}} title="View Coaches" onPress={() => {Actions.coachlist({update: this.update})}}></Button>
                    <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderColor: 'black', marginTop: 5}} title={selectedTeam.coach.contractExpired?"Resign Coach" : "Coach Menu"} onPress={() => {Actions.coachmenu({coach: selectedTeam.coach, team: selectedTeam, update:this.update})}}></Button>

                    </Card>

                    ):null}


                    <Card
                        containerStyle={{
                            width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                            borderColor: 'black',
                            alignSelf:'center'
                        }} >
{
                this.props.inGame ===  true? (

                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                            <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'Note: These changes only affect the current game, to make them permanent make sure to set them in your teams Coach Settings'}</Text>
                        </View>    
                ): null
}

                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <CachedImage uri={selectedTeam.logoSrc} style={{ height: 30, width: 30, maxHeight: 30, resizeMode: 'contain', marginRight: 5 }} />
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{selectedTeam.name}</Text>
                        </View>
                        <Divider style={{ backgroundColor: 'black', margin: 10 }}></Divider>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.getOffVsDefFocusString()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-3}
                            maximumValue={3}
                            value={this.state.offVsDefFocus}
                            onValueChange={value => { this.setState({ offVsDefFocus: value }) }}
                        />



                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.getqualityVsQuantityString()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-3}
                            maximumValue={3}
                            value={this.state.qualityVsQuantity}
                            onValueChange={value => { this.setState({ qualityVsQuantity: value }) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.getdefenseAggresiveVsConservative()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-3}
                            maximumValue={3}
                            value={this.state.defenseAggresiveVsConservative}
                            onValueChange={value => { this.setState({ defenseAggresiveVsConservative: value }) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.getforwardsVsDefensemen()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-3}
                            maximumValue={3}
                            value={this.state.forwardsVsDefensemen}
                            onValueChange={value => { this.setState({ forwardsVsDefensemen: value }) }}
                        />

                         <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.getfreezeThePuckVsPlayThePuck()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-3}
                            maximumValue={3}
                            value={this.state.freezeThePuckVsPlayThePuck}
                            onValueChange={value => { this.setState({ freezeThePuckVsPlayThePuck: value }) }}
                        />            


                        <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'black', borderWidth: 1, borderColor: 'black' }} title="Commit Changes" onPress={() => { this.saveChanges() }}></Button>


                    </Card>





                </ScrollView>
                      ): <Card
                      containerStyle={{
                          width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                          borderColor: 'black',
                          alignSelf:'center'
                      }} >
                      <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderColor: 'black', marginTop: 5}} title="Hire A Coach" onPress={() => {Actions.coachlist({update: this.update})}}></Button>
                      </Card>
    }
            </Background>





        )
    }
}

