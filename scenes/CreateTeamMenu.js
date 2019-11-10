import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Button, Card, Slider, Divider, Input } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import {createTeam, conferences, teams, saveData, teamsData} from '../data/script';
import CachedImage from '../components/CachedImage';


export default class CreateTeamMenu extends React.Component {
    state = {
        name: '',
        logoSrc: teamsData[Math.floor(Math.random()*teamsData.length)].logoSrc,
        rating : 75,
        conference: this.initialConference(),
        conferenceName : this.initialConferenceName(this.initialConference()),
    }

    previousPortrait(){
        let index = 1;
        for(let i=0; i<teamsData.length; i++){
            if(this.state.logoSrc === teamsData[i].logoSrc){
                index = i;
            }
        }
        index--;
        if(index<0){
          index = teamsData.length-1;
        }
        this.setState({logoSrc: teamsData[index].logoSrc});
       }
   
       nextPortrait(){
        let index = 1;
        for(let i=0; i<teamsData.length; i++){
            if(this.state.logoSrc === teamsData[i].logoSrc){
                index = i;
            }
        }
         index++;
         if(index>teamsData.length-1){
           index = 0;
         }
         this.setState({logoSrc: teamsData[index].logoSrc});
        }

    saveChanges() {
        if(this.state.name != ''){
            createTeam(this.state.name, this.state.rating, this.state.logoSrc, this.state.conference);
            //roster autosave
            saveData('Roster_Autosave');
            Actions.popTo('mainmenu');
        }
    }

    setLogoSrc(value){
        //check to see if it is link
        if(value.length < 5){
            return;
        }else{
            this.setState({logoSrc: value});
        }
    }

    initialConferenceName(input){
        return conferences[input].name;
    }

    initialConference(){
        if(conferences[0].teams.length > conferences[1].teams.length){
            return 1;
        }
        else if(conferences[1].teams.length > conferences[0].teams.length){
            return 0;
        }
        else{
            return 0;
        }

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

<View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                          <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}}  onPress={() =>this.previousPortrait()}>
                          <Text style={{ textAlign: "center", fontSize: 30, color: 'black', fontFamily: 'advent-pro' }}>{'<-'}</Text>

                          </TouchableOpacity>
                        <CachedImage uri={this.state.logoSrc} style={{flex:1, height: 75, width: 75, resizeMode:'contain', flexDirection: 'column', alignSelf: 'center', marginBottom: 5 }}/>
                          <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}}  onPress={() =>this.nextPortrait()}>
                          <Text style={{textAlign: "center", fontSize: 30, color: 'black', fontFamily: 'advent-pro' }}>{'->'}</Text>
                          </TouchableOpacity>
                        </View>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.state.name + ' OVR:' + this.state.rating }</Text>
                        <Divider style={{ backgroundColor: 'black', margin: 10 }}></Divider>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"NAME: "}</Text>
                        <Input onChangeText={value => this.setState({ name: value })} placeholder={'Enter Team Name'} placeholderTextColor={'rgb(180,180,180)'} inputStyle={{ color: 'black', fontFamily: 'advent-pro' }} ></Input>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"LOGO LINK: "}</Text>
                        <Input onChangeText={value => this.setLogoSrc(value)} placeholder={'Paste Link To Logo'} placeholderTextColor={'rgb(180,180,180)'} inputStyle={{ color: 'black', fontFamily: 'advent-pro' }} ></Input>


                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"Rating: " + this.state.rating}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.rating}
                            onValueChange={value => this.setState({ rating: value })}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"Conference: " + this.state.conferenceName}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={0}
                            maximumValue={conferences.length-1}
                            value={this.state.conference}
                            onValueChange={value => this.setState({ conference: value, conferenceName: conferences[value].name })}
                        />

                        <View>
                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro', margin:5 }}>{conferences[0].name + ' Teams: ' + conferences[0].teams.length}</Text>
                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro', margin:5 }}>{conferences[1].name + ' Teams: ' + conferences[1].teams.length}</Text>
                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro', margin:5 }}>{'Total Teams: ' + teams.length}</Text>

                        </View>

                        <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'black', borderWidth: 1, borderColor: 'black', marginTop:15 }} title="Create Team" onPress={() => { this.saveChanges() }}></Button>


                    </Card>





                </ScrollView>
            </Background>





        )
    }
}

