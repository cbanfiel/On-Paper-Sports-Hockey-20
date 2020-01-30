import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Button, Card, Divider, Slider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { selectedTeam,  signPlayer,  canSign, calculateCapRoom, displaySalary, collegeMode, offerContract, availableFreeAgents, getPlayerSigningInterest, teams } from '../data/script';
import Background from '../components/background';
import CachedImage from '../components/CachedImage';

const secondChanceInfluence = 15;

export default class SecondChanceMenu extends React.Component {

    state = {
        interest: this.props.player.interest,
        secondChancePoints: 1,
        declined: false
    }

    subtract = () => {
        if(this.state.secondChancePoints > 1){
            let secondChance = this.state.secondChancePoints -1;
            let interest = this.interestInfluence(secondChance);
            this.setState({secondChancePoints: secondChance, interest: interest});

        }
    }

    add = () => {
        if(this.state.secondChancePoints < selectedTeam.secondChancePoints){
            let secondChance = this.state.secondChancePoints + 1;
            let interest = this.interestInfluence(secondChance);
            this.setState({secondChancePoints: secondChance, interest: interest});
        }
    }

    secondChance = () => {
        if(this.state.interest > Math.random()*100){
            //swap teams
            for(let i=0; i<teams.length; i++){
                if(teams[i].roster.includes(this.props.player)){
                    teams[i].roster.splice(teams[i].roster.indexOf(this.props.player),1);
                }
            }
            selectedTeam.roster.push(this.props.player);
            this.props.player.teamLogoSrc = selectedTeam.logoSrc;
            this.props.player.teamName = selectedTeam.name;
            selectedTeam.secondChancePoints = selectedTeam.secondChancePoints- this.state.secondChancePoints;
            this.props.update(Actions.pop)
        }else{
            //do nothing
            this.setState({declined: true, secondChancePoints: 0});
            selectedTeam.secondChancePoints = selectedTeam.secondChancePoints- this.state.secondChancePoints;
            this.props.update();
        }

    }

    interestInfluence(secondChance) {
        let interest = this.props.player.interest;
        if (secondChance > 1) {
            interest += (secondChanceInfluence * (secondChance - 1));
        }
        else {
            interest = this.props.player.interest;
        }
        return interest;
    }

    render() {

        

        return (
            <Background>
                <Card
                    containerStyle={{
                        width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
                    }} >

                    <CachedImage style={{ width: 100, height:100, resizeMode:'contain',flexDirection: 'column', alignSelf: 'center', marginBottom: 5 }} uri= {selectedTeam.logoSrc } />
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{selectedTeam.name}</Text>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Second Chance Points Remaining: ' + (selectedTeam.secondChancePoints - (this.state.secondChancePoints))}</Text>
                    <Divider style={{ backgroundColor: 'black', margin: 10 }}></Divider>

                    <CachedImage style={{ height: 125, width:125, resizeMode:'contain', flexDirection: 'column', alignSelf: 'center', marginBottom: 5 }} uri= {this.props.player.faceSrc }/>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.props.player.positionString + ' #' + this.props.player.number + ' ' + this.props.player.name}</Text>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Interest: ' + this.state.interest}</Text>


                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                          <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}}  onPress={() =>this.subtract()}>
                          <Text style={{ textAlign: "center", fontSize: 30, color: 'black', fontFamily: 'advent-pro' }}>{'<-'}</Text>

                          </TouchableOpacity>
                          <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Second Chance Points: ' + this.state.secondChancePoints}</Text>
                          <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}}  onPress={() =>this.add()}>
                          <Text style={{textAlign: "center", fontSize: 30, color: 'black', fontFamily: 'advent-pro' }}>{'->'}</Text>
                          </TouchableOpacity>
                        </View>

                    
                    <Divider style={{ backgroundColor: 'black', margin: 10 }}></Divider>
{
    this.state.declined ? 
    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'\"Sorry coach not interested\"'}</Text>
    :
<Button titleStyle={{ fontFamily: 'advent-pro' , color: 'black'}} buttonStyle={{ borderRadius:25, backgroundColor: 'rgba(0,0,0,0)', borderColor: 'black', borderWidth: 1, marginBottom:10 }} title={"Second Chance"} onPress={() => {this.secondChance()}}></Button>


}



                </Card>



            </Background>
        )
    }
}

