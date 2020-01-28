import React from 'react';
import { ScrollView } from 'react-native';
import { selectedTeam, franchise } from '../data/script';
import Background from '../components/background';
import ListItem from '../components/ListItem';
import StatListItem from '../components/StatListItem';

export default class CoachHistory extends React.Component {

    

    render() {
        return (
            <Background>
                <ScrollView contentContainerStyle={{paddingBottom: 20}}>

                    {this.props.coach.history.map((history, i) => (
                        <StatListItem 
                        teamName={"YEAR #" + (i+1)} 
                        key={i} 
                        teamLogoSrc={history.logoSrc }
                        stats={history.champions ?  'CHAMPS\n' : '' + 'Record: ' + history.wins + '-' + (history.losses)}
                        playerInfo = {'HC ' + this.props.coach.name}
                        faceSrc = {this.props.coach.faceSrc}
                        
                        ></StatListItem>
                    ))}


<StatListItem 
                        teamName={"CURRENT"} 
                        teamLogoSrc={this.props.coach.teamLogoSrc }
                        stats={''}
                        playerInfo = {'HC ' + this.props.coach.name}
                        faceSrc = {this.props.coach.faceSrc}
                        
                        ></StatListItem>

                </ScrollView>
            </Background>

        )
    }
}