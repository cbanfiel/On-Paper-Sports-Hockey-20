import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Card, Slider, Divider, Input } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import { OFF_PRO, OFF_SPREAD, OFF_OPTION, OFF_PISTOL, DEF_43, DEF_34, DEF_335, DEF_425, DEF_52, displaySalary } from '../data/script';
import CachedImage from '../components/CachedImage';
import { portraits } from '../data/Coach';


export default class EditCoach extends React.Component {
    state = {
        name: this.props.coach.name,
        age: this.props.coach.age,
        years: this.props.coach.years,
        salary: this.props.coach.salary,
        faceSrc: this.props.coach.faceSrc,
        offenseRating: this.props.coach.offenseRating,
        defenseRating: this.props.coach.defenseRating,
        signingInterest: this.props.coach.signingInterest,
        training: this.props.coach.training,
        offVsDefFocus: this.props.coach.offVsDefFocus,
        offenseType: this.props.coach.offenseType,
        defenseType: this.props.coach.defenseType,
        runVsPass: this.props.coach.runVsPass,
        offTempo: this.props.coach.offTempo

    }

    saveChanges() {
        this.props.coach.name = this.state.name;
        this.props.coach.age = this.state.age;
        this.props.coach.years = this.state.years;
        this.props.coach.salary = this.state.salary;
        this.props.coach.faceSrc = this.state.faceSrc;
        this.props.coach.offenseRating = this.state.offenseRating;
        this.props.coach.defenseRating = this.state.defenseRating
        this.props.coach.signingInterest = this.state.signingInterest
        this.props.coach.training = this.state.training;
        this.props.coach.offVsDefFocus = this.state.offVsDefFocus;
        this.props.coach.offenseType = this.state.offenseType
        this.props.coach.defenseType = this.state.defenseType;
        this.props.coach.runVsPass= this.state.runVsPass;
        this.props.coach.offTempo= this.state.offTempo;
        this.props.coach.calculateRating();
        this.props.update(Actions.popTo, 'coachsettings');
    }

    previousPortrait(){
        let index=portraits.indexOf(this.state.faceSrc);
        index--;
        if(index<0){
          index = portraits.length-1;
        }
        this.setState({faceSrc: portraits[index]});
       }
   
       nextPortrait(){
         let index=portraits.indexOf(this.state.faceSrc);
         index++;
         if(index>portraits.length-1){
           index = 0;
         }
         this.setState({faceSrc: portraits[index]});
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

    getOffenseType(){
        if(this.state.offenseType === OFF_PRO){
            return "Pro Style"
        }
        if(this.state.offenseType === OFF_SPREAD){
            return "Spread"
        }
        if(this.state.offenseType === OFF_OPTION){
            return "Option"
        }
        if(this.state.offenseType === OFF_PISTOL){
            return "Pistol"
        }
    }

    getDefenseType(){
        if(this.state.defenseType === DEF_43){
            return "4-3"
        }
        if(this.state.defenseType === DEF_34){
            return "3-4"
        }
        if(this.state.defenseType === DEF_335){
            return "3-3-5"
        }
        if(this.state.defenseType === DEF_425){
            return "4-2-5"
        }
        if(this.state.defenseType === DEF_52){
            return "5-2"
        }
    }

    getRunVsPass(){
        if(this.state.runVsPass>60){
            return "Focus: Pass";
        }
        if(this.state.runVsPass<54){
            return "Focus: Run";
        }

        return "Focus: Balanced";
    }
    getOffTempo(){
        if(this.state.offTempo>1){
            return `Tempo: Fast + ${this.state.offTempo}`;
        }
        if(this.state.offTempo<-1){
            return `Tempo: Slow  ${this.state.offTempo}`;
        }

        return `Tempo: Balanced  ${this.state.offTempo}`;
    }

    setFaceSource(value) {
        //check to see if it is link
        if (value.length < 5) {
            return;
        } else {
            this.setState({ faceSrc: value });
        }
    }

    render() {
        return (
            <Background>
                <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>

                    <Card
                        containerStyle={{
                            width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                            borderColor: 'black',
                            alignSelf: 'center'
                        }} >
{
this.props.team == null ?(null):
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <CachedImage uri={this.props.team.logoSrc} style={{ height: 30, width: 30, maxHeight: 30, resizeMode: 'contain', marginRight: 5 }} />
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.props.team.name}</Text>
                        </View>
    
}
<View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                          <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}}  onPress={() =>this.previousPortrait()}>
                          <Text style={{ textAlign: "center", fontSize: 30, color: 'black', fontFamily: 'advent-pro' }}>{'<-'}</Text>

                          </TouchableOpacity>
                        <CachedImage uri={this.state.faceSrc  } style={{flex:1, height: 75, width: 75, resizeMode:'contain', flexDirection: 'column', alignSelf: 'center', marginBottom: 5 }}/>
                          <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}}  onPress={() =>this.nextPortrait()}>
                          <Text style={{textAlign: "center", fontSize: 30, color: 'black', fontFamily: 'advent-pro' }}>{'->'}</Text>
                          </TouchableOpacity>
                        </View>


                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'HC ' + this.state.name}</Text>
                        <Divider style={{ backgroundColor: 'black', margin: 10 }}></Divider>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"NAME: "}</Text>
                        <Input onChangeText={value => this.setState({ name: value })} placeholder={this.state.name} placeholderTextColor={'rgb(180,180,180)'} inputStyle={{ color: 'black', fontFamily: 'advent-pro' }} ></Input>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"FACE LINK: "}</Text>
                        <Input onChangeText={value => this.setFaceSource(value)} placeholder={'Paste Link To Photo'} placeholderTextColor={'rgb(180,180,180)'} inputStyle={{ color: 'black', fontFamily: 'advent-pro' }} ></Input>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"AGE: " + this.state.age}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={80}
                            value={this.state.age}
                            onValueChange={value => this.setState({ age: value })}
                        />

<Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"CONTRACT YEARS: " + this.state.years}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={1}
                            maximumValue={6}
                            value={this.state.years}
                            onValueChange={value => this.setState({ years: value })}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"SALARY: $" + this.state.salary}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={10000}
                            minimumValue={700000}
                            maximumValue={10000000}
                            value={this.state.salary}
                            onValueChange={value => this.setState({ salary: value })}
                        />

                    
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



                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.getOffenseType()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={0}
                            maximumValue={3}
                            value={this.state.offenseType}
                            onValueChange={value => { this.setState({ offenseType: value }) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.getDefenseType()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={0}
                            maximumValue={4}
                            value={this.state.defenseType}
                            onValueChange={value => { this.setState({ defenseType: value }) }}
                        />

                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.getRunVsPass()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={44}
                            maximumValue={70}
                            value={this.state.runVsPass}
                            onValueChange={value => { this.setState({ runVsPass: value }) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.getOffTempo()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-5}
                            maximumValue={5}
                            value={this.state.offTempo}
                            onValueChange={value => { this.setState({ offTempo: value }) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Offense: ' + this.state.offenseRating}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.offenseRating}
                            onValueChange={value => { this.setState({ offenseRating: value }) }}
                        />

<Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Defense: ' + this.state.defenseRating}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.defenseRating}
                            onValueChange={value => { this.setState({ defenseRating: value }) }}
                        />

<Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Training: ' + this.state.training}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.training}
                            onValueChange={value => { this.setState({ training: value }) }}
                        />

<Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Signing: ' + this.state.signingInterest}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.signingInterest}
                            onValueChange={value => { this.setState({ signingInterest: value }) }}
                        />




                        <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderColor: 'black' }} title="Commit Changes" onPress={() => { this.saveChanges() }}></Button>


                    </Card>





                </ScrollView>
            </Background>





        )
    }
}

