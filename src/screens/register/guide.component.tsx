import React, {Component} from 'react';
import {ImageStyle, SafeAreaView} from 'react-native';
import {Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {StackNavigationProp} from "@react-navigation/stack";
import {AppRoute, AuthStackParamList} from "../../navigation.component";

const BackIcon = (style: ImageStyle) => (
    <Icon {...style} name='arrow-back'/>
);

type NavigationProp = StackNavigationProp<AuthStackParamList, AppRoute.GUIDE>;

type Props = {
    navigation: NavigationProp;
};

export default class GuideScreen extends Component<Props> {

    navigateBack() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation
                    title='Guide'
                    alignment='center'
                    leftControl={<TopNavigationAction
                        icon={BackIcon}
                        onPress={this.navigateBack.bind(this)}
                    />}
                />
                <Divider/>
                <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text category='h1'>This is the guide</Text>
                </Layout>
            </SafeAreaView>
        );
    }
}