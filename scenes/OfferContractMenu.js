import React from 'react';
import { Text, View } from 'react-native';
import { Button, Card, Divider, Slider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { selectedTeam,  signPlayer,  canSign, calculateCapRoom, displaySalary, collegeMode, offerContract, availableFreeAgents, getPlayerSigningInterest } from '../data/script';
import Background from '../components/background';
import CachedImage from '../components/CachedImage';

export default class OfferContractMenu extends React.Component {

    constructor() {
        super();
        this.state = {
            years: 1,
            salary: 1200000,
            signable : true,
            declined: ''
        }


    }

    sendContract(isForced){
        if(offerContract(selectedTeam, this.props.selectedPlayer, this.state.years, this.state.salary, this.props.playerpool, isForced)){
            Actions.popTo(this.props.back);
        }else{
            this.setState({declined: true});
        }
    }

    componentDidMount(){
        this.setState({
            salary : getPlayerSigningInterest(selectedTeam,this.props.selectedPlayer,this.state.years),
            signable : canSign(selectedTeam, getPlayerSigningInterest(selectedTeam,this.props.selectedPlayer,this.state.years))
        })
    }


    render() {

        

        return (
            <Background>
                <Card
                    containerStyle={{
                        width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                        borderColor: 'black',
                        alignSelf:'center'
                    }} >

                    <CachedImage style={{ width: 100, height:100, resizeMode:'contain',flexDirection: 'column', alignSelf: 'center', marginBottom: 5 }} uri= {selectedTeam.logoSrc } />
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{selectedTeam.name}</Text>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{collegeMode? 'Recruiting Points Available: ' + displaySalary(calculateCapRoom(selectedTeam)) : 'CAP SPACE: $' + displaySalary(calculateCapRoom(selectedTeam)) }</Text>
                    <Divider style={{ backgroundColor: 'black', margin: 10 }}></Divider>

                    <CachedImage style={{ height: 125, width:125, resizeMode:'contain', flexDirection: 'column', alignSelf: 'center', marginBottom: 5 }} uri= {this.props.selectedPlayer.faceSrc }/>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.props.selectedPlayer.positionString + ' #' + this.props.selectedPlayer.number + ' ' + this.props.selectedPlayer.name}</Text>
                    <Divider style={{ backgroundColor: 'black', margin: 10 }}></Divider>

{
        !collegeMode?
        <View>
                <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"CONTRACT YEARS: " + this.state.years}</Text>
                <Slider
                    thumbTintColor={'rgb(180,180,180)'}
                    maximumTrackTintColor={'rgb(180,180,180)'}
                    step={1}
                    minimumValue={1}
                    maximumValue={6}
                    value={this.state.years}
                    onValueChange={value => this.setState({ years: value, declined:'' })}
                />
                </View>
    : null
}
                <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro', marginBottom:20 }}>{"SALARY: $" + displaySalary(getPlayerSigningInterest(selectedTeam,this.props.selectedPlayer,this.state.years))}</Text>

                    {/* <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{collegeMode? "Recruiting Points: " + displaySalary(this.state.salary) : "SALARY: $" + displaySalary(this.state.salary)}</Text>
                    <Slider
                        thumbTintColor={'rgb(180,180,180)'}
                        maximumTrackTintColor={'rgb(180,180,180)'}
                        step={10000}
                        minimumValue={this.props.selectedPlayer.salary}
                        maximumValue={50000000}
                        value={this.state.salary}
                        onValueChange={value => this.setState({ salary: value, signable:canSign(selectedTeam,value), declined:'' })}
                    /> */}
{

    this.state.declined ? 

    <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ borderColor: 'black', backgroundColor: 'rgba(255,0,0,0.75)', borderColor: 'black', borderWidth: 1, marginBottom:10 }} title={"Offer Declined"} onPress={() => {}}></Button>


    :

    this.props.forced === false ? ( canSign(selectedTeam, this.state.salary) ? (

        <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ borderColor: 'black', backgroundColor: 'rgba(0,0,0,0)', borderColor: 'black', borderWidth: 1, marginBottom:10 }} title={collegeMode? "Offer Scholarship": "Sign Player"} onPress={() => { this.sendContract(false); }}></Button>
    ) :
        <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ borderColor: 'black', backgroundColor: 'rgba(0,0,0,0)', borderColor: 'black', borderWidth: 1, marginBottom:10 }} title={collegeMode? "Not Enough Recruiting Points" : "Not Enough Cap Space"} disabled ></Button>

        ) :
        <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ borderColor: 'black', backgroundColor: 'rgba(0,0,0,0)', borderColor: 'black', borderWidth: 1, marginBottom:10 }} title={collegeMode? "Offer Scholarship": "Sign Player"} onPress={() => { this.sendContract(true); }}></Button>
    
    }


                </Card>



            </Background>
        )
    }
}

