import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Card, Slider, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import CachedImage from '../components/CachedImage';
import {displaySalary, selectedTeam, teams} from '../data/script';
import { availableCoaches, canSignCoach } from '../data/Coach';


export default class CoachMenu extends React.Component {

    signCoach = (coach) =>{
        if(availableCoaches.includes(coach)){
          if(canSignCoach(coach, selectedTeam)){
            let temp = selectedTeam.coach;
            coach.teamLogoSrc = selectedTeam.logoSrc;
            //checks if retired or if same coach
            if(temp != null && temp != coach){
            if(!availableCoaches.includes(temp)){
                temp.teamLogoSrc = null;
                availableCoaches.push(temp);
            }
            }

            for(let i=0; i<teams.length; i++){
                if(teams[i].coach === coach){
                    teams[i].coach = null;
                }
            }

            selectedTeam.coach = coach;
            coach.contractExpired = false;
            availableCoaches.splice(availableCoaches.indexOf(coach),1);
            this.props.update(Actions.popTo, 'coachsettings');
  
          }else{
            Alert.alert('Not Enough Funds');
          }
          
        }
      }

    canSign(){
        if(this.props.coach.salary > selectedTeam.coachingBudget){
            return false;
        }
        return true;
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
                            {
                        this.props.team!= selectedTeam && this.props.team != null && !this.props.coach.contractExpired ? (
                                    <View>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                        <CachedImage uri={this.props.team.logoSrc} style={{ height: 30, width: 30, maxHeight: 30, resizeMode: 'contain', marginRight: 5 }} />
                                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.props.team.name}</Text>
                                    </View>
                                    <Divider style={{ backgroundColor: 'black'}}></Divider>
                                    </View>):
                        
                        <View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <CachedImage uri={selectedTeam.logoSrc} style={{ height: 30, width: 30, maxHeight: 30, resizeMode: 'contain', marginRight: 5 }} />
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{selectedTeam.name}</Text>
                        </View>
                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'$'+displaySalary(selectedTeam.coachingBudget)}</Text>
                        <Divider style={{ backgroundColor: 'black'}}></Divider>
                        </View>

                            }
                            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <CachedImage uri={this.props.coach.faceSrc} style={{ height: 100, width: 100, maxHeight: 100, resizeMode: 'contain', marginRight: 5 }} />
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'HC: ' + this.props.coach.name}</Text>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Age: ' + this.props.coach.age}</Text>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.props.coach.years + ' Years $' + displaySalary(this.props.coach.salary)}</Text>


                        </View>
                        <Divider style={{ backgroundColor: 'black', margin: 10 }}></Divider>
                            <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'OFF: ' + this.props.coach.offenseRating}</Text>
                            <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'DEF: ' + this.props.coach.defenseRating}</Text>
                            <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'SIGNING: ' + this.props.coach.signingInterest}</Text>
                            <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'TRAINING: ' + this.props.coach.training}</Text>

                            <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderColor: 'black', marginTop: 5}} title="Coach History" onPress={() => Actions.coachhistory({coach: this.props.coach})}></Button>
                            {
                                (this.props.team!=null && !this.props.coach.contractExpired) || this.props.coach.retired? (null):
                                <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} disabled={!this.canSign()} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderColor: 'black', marginTop: 5}} title={this.canSign()? "Sign Coach": "Not Enough Funds"} onPress={() => {this.signCoach(this.props.coach)}}></Button>
                            }
                            <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderColor: 'black', marginTop: 5}} title="Edit Coach" onPress={() => {Actions.editcoach({coach: this.props.coach, update: this.props.update, team: this.props.team})}}></Button>

                            </Card>
                            </ScrollView>


            </Background>
        )
    }
}

