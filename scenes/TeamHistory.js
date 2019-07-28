import React from 'react';
import { ScrollView } from 'react-native';
import { selectedTeam, franchise } from '../data/script';
import Background from '../components/background';
import ListItem from '../components/ListItem';

export default class TeamHistory extends React.Component {

    

    render() {
        return (
            <Background>
{

    this.props.view === 'pastchampions' ? (
        <ScrollView>

                    {franchise.pastChampions.map((history, i) => (
                        <ListItem
                         title={'Year: ' + (i+1) + ' ' + history.name} 
                         key={i} 
                         leftAvatar={history.logoSrc } 
                         subtitle={'Record: ' + history.history.wins + '-' + history.history.losses }
                        rightTitle={'CHAMPS'}
                        >
                        
                        </ListItem>
                    ))}
                </ScrollView>


    ) : 

                <ScrollView>

                    {selectedTeam.history.map((history, i) => (
                        <ListItem 
                        title={'Year: ' + (i+1) + ' ' + selectedTeam.name} 
                        key={i} 
                        leftAvatar={selectedTeam.logoSrc }
                         subtitle={'Record: ' + history.wins + '-' + history.losses }
                        rightTitle={ history.champions ?  'CHAMPS' : null} ></ListItem>
                    ))}
                </ScrollView>

    
}
            </Background>




        )
    }
}