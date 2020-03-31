import React, {Component} from 'react';
import {ImageStyle, SafeAreaView} from 'react-native';
import {Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {AppRoute, AppStackParamList} from "../navigation.component";
import {DrawerNavigationProp} from "@react-navigation/drawer";

const BackIcon = (style: ImageStyle) => (
    <Icon {...style} name='arrow-back'/>
);

type NavigationProp = DrawerNavigationProp<AppStackParamList, AppRoute.CONTACT>;

type Props = {
    navigation: NavigationProp;
};

export default class ContactScreen extends Component<Props> {

    navigateBack() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation
                    title='MyApp'
                    alignment='center'
                    leftControl={<TopNavigationAction
                        icon={BackIcon}
                        onPress={this.navigateBack.bind(this)}
                    />}
                />
                <Divider/>
                <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text category='h1'>DETAILS</Text>
                </Layout>
            </SafeAreaView>
        );
    }
}