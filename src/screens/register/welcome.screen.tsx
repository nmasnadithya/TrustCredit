import React, {Component} from 'react';
import {Image, SafeAreaView} from 'react-native';
import {Button, Layout, StyleService, Text} from '@ui-kitten/components';
import {StackNavigationProp} from "@react-navigation/stack";
import {AppRoute, RootStackParamList} from "../../navigation.component";

type NavigationProp = StackNavigationProp<RootStackParamList, AppRoute.HOME>;

type Props = {
    navigation: NavigationProp;
};

const styles = StyleService.create({
    logo: {
        width: 64,
        height: 64
    },
    container: {
        flex: 1
    },
    layoutContainer: {
        padding: 16,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    buttonContainer: {
        flex: 0.2,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignContent: 'stretch',
        alignItems: 'flex-end'
    },
    button: {
        height: 64,
        margin: 4,
        flexGrow: 1
    }

});

export default class WelcomeScreen extends Component<Props> {

    openSignUp() {
        this.props.navigation.navigate(AppRoute.SIGNUP);
    }

    openLogin() {
        this.props.navigation.navigate(AppRoute.LOGIN);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Layout style={styles.layoutContainer}>
                    <Image
                        style={styles.logo}
                        source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                    />
                    <Text category='h1'>Trust Credit.</Text>
                    <Text category='h2'>Securely.</Text>
                    <Layout style={styles.buttonContainer}>
                        <Button style={styles.button} onPress={this.openSignUp.bind(this)} size='giant'>Sign
                            Up</Button>
                        <Button style={styles.button} onPress={this.openLogin.bind(this)} size='giant'
                                appearance='outline'>Sign In</Button>
                    </Layout>
                </Layout>
            </SafeAreaView>
        );
    }
}