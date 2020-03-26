import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import {Button, Divider, Layout, TopNavigation} from '@ui-kitten/components';
import {StackNavigationProp} from "@react-navigation/stack";
import {AppRoute, RootStackParamList} from "../navigation.component";

type NavigationProp = StackNavigationProp<RootStackParamList, AppRoute.HOME>;

type Props = {
    navigation: NavigationProp;
};

export default class HomeScreen extends Component<Props> {

    openDetails() {
        this.props.navigation.navigate(AppRoute.DETAILS);
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation title='MyApp' alignment='center'/>
                <Divider/>
                <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Button onPress={this.openDetails.bind(this)}>OPEN DETAILS</Button>
                </Layout>
            </SafeAreaView>
        );
    }
}