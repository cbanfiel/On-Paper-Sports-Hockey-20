import React from 'react';
import { ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { conferences } from '../data/script';
import Background from '../components/background';
import ListItem from '../components/ListItem';

export default class TeamList extends React.Component {

    render() {
        return (
            <Background>

                <ScrollView>

                    {conferences.map((conference, i) => (
                        <ListItem 
                        onPress={() => Actions.standings({conferenceId : conference.id, linkTimer: this.props.linkTimer})} 
                        title={conference.name} 
                        key={i} 
                        leftAvatar={conference.logoSrc } ></ListItem>
                    ))}
                </ScrollView>
            </Background>
        )
    }
}