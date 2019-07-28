import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, Card, Slider, Divider, Input } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import { conferences, selectedTeam, generateCustomRoster, deleteTeam, reloadConferences, teams} from '../data/script';
import CachedImage from '../components/CachedImage';

export default class EditTeam extends React.Component {
    
    componentWillUnmount(){
        if(this.props.update!=null){
          this.props.update();
        }
      }
    
    state = {
        name: selectedTeam.name,
        logoSrc: selectedTeam.logoSrc,
        conference: selectedTeam.conferenceId,
        conferenceName : conferences[selectedTeam.conferenceId].name,
        rating : selectedTeam.rating
    }

    setLogoSrc(value){
        //check to see if it is link
        if(value.length < 5){
            return;
        }else{
            this.setState({logoSrc: value});
        }
    }

    saveChanges() {
        if(this.state.name != ''){
            selectedTeam.name = this.state.name;
            selectedTeam.logoSrc = this.state.logoSrc;
            selectedTeam.conferenceId = this.state.conference;
            for(let i=0; i<selectedTeam.roster.length; i++){
                selectedTeam.roster[i].teamName = this.state.name;
                selectedTeam.roster[i].teamLogoSrc = this.state.logoSrc;
            }
            reloadConferences();
            Actions.pop();
        }
    }

    generateNewRoster(){
        generateCustomRoster(selectedTeam,this.state.rating);
    }

    deleteTeam(){
        deleteTeam(selectedTeam);
        Actions.reset('mainmenu');
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

                        <CachedImage rounded style={{ height: 75, width: 75, resizeMode:'contain', flexDirection: 'column', alignSelf: 'center', marginBottom: 5 }} uri={this.state.logoSrc!= '' ? this.state.logoSrc : null} />
                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{this.state.name + ' OVR: ' + this.state.rating}</Text>
                        <Divider style={{ backgroundColor: 'white', margin: 10 }}></Divider>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"NAME: "}</Text>
                        <Input onChangeText={value => this.setState({ name: value })} placeholder={'Enter Team Name'} placeholderTextColor={'rgb(180,180,180)'} inputStyle={{ color: 'white', fontFamily: 'advent-pro' }} ></Input>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"LOGO LINK: "}</Text>
                        <Input onChangeText={value => this.setLogoSrc(value)} placeholder={'Paste Link To Logo'} placeholderTextColor={'rgb(180,180,180)'} inputStyle={{ color: 'white', fontFamily: 'advent-pro' }} ></Input>
                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Rating: " + this.state.rating}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.rating}
                            onValueChange={value => this.setState({ rating: value })}
                        />

                        <Button titleStyle={{ fontFamily: 'advent-pro' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderRadius: 25, marginVertical:10 }} title="Generate New Roster" onPress={() => { this.generateNewRoster() }}></Button>
                        

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Conference: " + this.state.conferenceName}</Text>
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
                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro', margin:5 }}>{conferences[0].name + ' Teams: ' + conferences[0].teams.length}</Text>
                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro', margin:5 }}>{conferences[1].name + ' Teams: ' + conferences[1].teams.length}</Text>
                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro', margin:5 }}>{'Total Teams: ' + teams.length}</Text>

                        </View>

                        <Button titleStyle={{ fontFamily: 'advent-pro' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderRadius: 25, marginVertical:10 }} title="Commit Changes" onPress={() => { this.saveChanges() }}></Button>

                

                        <Button titleStyle={{ fontFamily: 'advent-pro' }} buttonStyle={{ backgroundColor: 'rgba(255,0,0,0.75)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderRadius: 25, marginVertical:10 }} title="Delete Team" onPress={() => { this.deleteTeam() }}></Button>
                        
                    </Card>





                </ScrollView>
            </Background>





        )
    }
}

