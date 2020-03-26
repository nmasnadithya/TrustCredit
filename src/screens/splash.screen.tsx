import React, {Component} from 'react';
import {Image, SafeAreaView, StyleSheet} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {StackNavigationProp} from "@react-navigation/stack";
import {AppRoute, RootStackParamList} from "../navigation.component";

type NavigationProp = StackNavigationProp<RootStackParamList, AppRoute.SPLASH>;

type Props = {
    navigation: NavigationProp;
};

const styles = StyleSheet.create({
    logo: {
        width: 64,
        height: 64
    }
});

export default class SplashScreen extends Component<Props> {

    openDetails() {
        this.props.navigation.navigate('Details');
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        style={styles.logo}
                        source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                    />
                </Layout>
            </SafeAreaView>
        );
    }
}