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
        reb: this.props.selectedPlayer.reb,
        ft: this.props.selectedPlayer.ft,
        threePoint: this.props.selectedPlayer.threePoint,
    }

    ratingFormula(){
            let bestrating = [this.state.off, this.state.def, this.state.reb, this.state.threePoint];
            bestrating.sort(function (a, b) {
                if (a < b) {
                    return 1;
                }
                if (a > b) {
                    return -1;
                }
                return 0;
            });
    
    
    
             let ovr = Math.round(((this.state.off * 2) + (this.state.def * 2) + (this.state.threePoint / 2) + (this.state.reb / 2) + (bestrating[0] * 2)) / 7);

             this.setState({rating : ovr});
    }

    saveChanges(){
        this.props.selectedPlayer.rating=this.state.rating;
        this.props.selectedPlayer.off=this.state.off;
        this.props.selectedPlayer.def=this.state.def;
        this.props.selectedPlayer.reb=this.state.reb;
        this.props.selectedPlayer.ft=this.state.ft;
        this.props.selectedPlayer.threePoint=this.state.threePoint;
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
            reb: (this.state.reb - change>99 ? 99 : this.state.reb-change<40 ? 40 : this.state.reb-change ),
            ft: (this.state.ft - change>99 ? 99 : this.state.ft-change<40 ? 40 : this.state.ft-change ),
            threePoint: (this.state.threePoint - change>99 ? 99 : this.state.threePoint-change<40 ? 40 : this.state.threePoint-change )
        })

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

                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <CachedImage uri={this.props.selectedPlayer.teamLogoSrc } style={{ height: 30, width: 30, maxHeight: 30, resizeMode: 'contain', marginRight: 5 }}/>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{this.props.selectedPlayer.teamName}</Text>
                        </View>

                        <CachedImage rounded style={{ height: 75, width: 75, resizeMode:'contain', flexDirection: 'column', alignSelf: 'center', marginBottom: 5 }} uri={this.props.selectedPlayer.faceSrc } />
                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{this.props.selectedPlayer.positionString + ' #' + this.props.selectedPlayer.number + ' ' + this.props.selectedPlayer.name}</Text>
                        <Divider style={{ backgroundColor: 'white', margin: 10 }}></Divider>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"OVR: " + this.state.rating}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.rating}
                            onValueChange={value => this.overallSlider(value)}
                        />



                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"OFF: " + this.state.off}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.off}
                            onValueChange={value => {this.setState({ off: value }), this.ratingFormula()}}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"DEF: " + this.state.def}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.def}
                            onValueChange={value =>{ this.setState({ def: value }), this.ratingFormula()}}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"REB: " + this.state.reb}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.reb}
                            onValueChange={value =>{ this.setState({ reb: value }), this.ratingFormula()}}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"3PT: " + this.state.threePoint}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.threePoint}
                            onValueChange={value => {this.setState({ threePoint: value }), this.ratingFormula()}}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"FT: " + this.state.ft}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.ft}
                            onValueChange={value => this.setState({ ft: value })}
                        />
                <Button titleStyle={{ fontFamily: 'advent-pro' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderRadius:25}} title="Commit Changes" onPress={() => {this.saveChanges()}}></Button>


                    </Card>





                </ScrollView>
            </Background>





        )
    }
}

