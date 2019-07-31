import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, Card, Slider, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import {selectedTeam} from '../data/script';
import CachedImage from '../components/CachedImage';

export default class EditPlayerRatings extends React.Component {
    state = {
        off: this.props.selectedPlayer.off,
        rating: this.props.selectedPlayer.rating,
        def: this.props.selectedPlayer.def,
        pass: this.props.selectedPlayer.pass,
        faceOff: this.props.selectedPlayer.faceOff,
        save: this.props.selectedPlayer.save,
    }

    ratingFormula(){
            let bestrating = [this.state.off, this.state.def, this.state.pass, this.state.save];
            bestrating.sort(function (a, b) {
                if (a < b) {
                    return 1;
                }
                if (a > b) {
                    return -1;
                }
                return 0;
            });
    
    
    
             let ovr = Math.round(((this.state.off * 2) + (this.state.def * 2) + (this.state.save / 2) + (this.state.pass / 2) + (bestrating[0] * 2)) / 7);

             this.setState({rating : ovr});
    }

    saveChanges(){
        this.props.selectedPlayer.rating=this.state.rating;
        this.props.selectedPlayer.off=this.state.off;
        this.props.selectedPlayer.def=this.state.def;
        this.props.selectedPlayer.pass=this.state.pass;
        this.props.selectedPlayer.faceOff=this.state.faceOff;
        this.props.selectedPlayer.save=this.state.save;
        selectedTeam.reorderLineup();
        this.props.updateState();
        Actions.pop();

    }

    overallSlider(value){
        change=(this.state.rating - value);
        this.setState({
            rating: value,
            off: (this.state.off - change>99 ? 99 : this.state.off-change<40 ? 40 : this.state.off-change ),
            def: (this.state.def - change>99 ? 99 : this.state.def-change<40 ? 40 : this.state.def-change ),
            pass: (this.state.pass - change>99 ? 99 : this.state.pass-change<40 ? 40 : this.state.pass-change ),
            faceOff: (this.state.faceOff - change>99 ? 99 : this.state.faceOff-change<40 ? 40 : this.state.faceOff-change ),
            save: (this.state.save - change>99 ? 99 : this.state.save-change<40 ? 40 : this.state.save-change )
        })

    }


    render() {
        return (
            <Background>
                <ScrollView contentContainerStyle={{paddingBottom: 20}}>

                    <Card
                        containerStyle={{
                            width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                            borderColor: 'black',
                            alignSelf:'center'
                        }} >

                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <CachedImage uri={this.props.selectedPlayer.teamLogoSrc } style={{ height: 30, width: 30, maxHeight: 30, resizeMode: 'contain', marginRight: 5 }}/>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.props.selectedPlayer.teamName}</Text>
                        </View>

                        <CachedImage rounded style={{ height: 75, width: 75, resizeMode:'contain', flexDirection: 'column', alignSelf: 'center', marginBottom: 5 }} uri={this.props.selectedPlayer.faceSrc } />
                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.props.selectedPlayer.positionString + ' #' + this.props.selectedPlayer.number + ' ' + this.props.selectedPlayer.name}</Text>
                        <Divider style={{ backgroundColor: 'black', margin: 10 }}></Divider>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"OVR: " + this.state.rating}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.rating}
                            onValueChange={value => this.overallSlider(value)}
                        />



                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"OFF: " + this.state.off}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.off}
                            onValueChange={value => {this.setState({ off: value }), this.ratingFormula()}}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"DEF: " + this.state.def}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.def}
                            onValueChange={value =>{ this.setState({ def: value }), this.ratingFormula()}}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"PASS: " + this.state.pass}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.pass}
                            onValueChange={value =>{ this.setState({ pass: value }), this.ratingFormula()}}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"SAVE: " + this.state.save}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.save}
                            onValueChange={value => {this.setState({ save: value }), this.ratingFormula()}}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"FACEOFF: " + this.state.faceOff}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.faceOff}
                            onValueChange={value => this.setState({ faceOff: value })}
                        />
                <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderColor: 'black'}} title="Commit Changes" onPress={() => {this.saveChanges()}}></Button>


                    </Card>





                </ScrollView>
            </Background>





        )
    }
}

