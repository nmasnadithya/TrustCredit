import {StackNavigationProp} from "@react-navigation/stack";
import {AppRoute, AuthStackParamList} from "../../navigation.component";
import React, {Component} from "react";
import {
    Button,
    Divider,
    Input,
    Layout,
    StyleService,
    Text,
    useStyleSheet,
    useTheme,
    withStyles
} from "@ui-kitten/components";
import { View} from "react-native";
import {EyeIcon, EyeOffIcon, FacebookIcon, GoogleIcon, PersonIcon, TwitterIcon} from "../../icons/icons";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {light} from "@eva-design/eva";
import auth from '@react-native-firebase/auth';
import {Profile} from "../../model/profile";

type NavigationProp = StackNavigationProp<AuthStackParamList, AppRoute.LOGIN>;

type Props = {
    navigation: NavigationProp;
};

type State = {
    email?: string,
    password?: string,
    passwordVisible: boolean
};
const styles = StyleService.createThemed({
    container: {
        backgroundColor: 'background-basic-color-1',
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 216,
        backgroundColor: "color-primary-default",
    },
    formContainer: {
        flex: 1,
        paddingTop: 32,
        paddingHorizontal: 16,
    },
    signInLabel: {
        marginTop: 16,
    },
    signInButton: {
        marginHorizontal: 16,
    },
    signUpButton: {
        marginVertical: 12,
        marginHorizontal: 16,
    },
    forgotPasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    passwordInput: {
        marginTop: 16,
    },
    forgotPasswordButton: {
        paddingHorizontal: 0,
    },
    socialAuthContainer: {
        marginTop: 24,
    },
    socialAuthButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    socialAuthHintText: {
        alignSelf: 'center',
        marginBottom: 16,
    },
}, light);



export default class LoginScreen extends Component<Props, State> {

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            passwordVisible: false,
        };
    }

    onPasswordIconPress() {
        this.setState({
            passwordVisible: !this.state.passwordVisible
        })
    }

    onForgotPasswordButtonPress() {
        //TODO: implement
    }

    onSignUpButtonPress() {
        this.props.navigation.navigate(AppRoute.SIGNUP);
    }

    onSignInButtonPress() {
        auth()
            .signInWithEmailAndPassword(this.state.email!, this.state.password!)
            .then(userCredential => {
                console.log(`Logged in with user ${userCredential.user.email} (${userCredential.user.uid})`)
                Profile.fetchProfile(userCredential.user.uid);
                this.props.navigation.navigate(AppRoute.APP);
            }).catch(reason => {
                console.log(`Login failed due to ${reason}`)
        })
    }

    render() {

        return (
            <KeyboardAwareScrollView style={styles.container} enableOnAndroid={true} contentContainerStyle={{flexGrow: 1}} bounces={false} bouncesZoom={false} alwaysBounceVertical={false} alwaysBounceHorizontal={false}>
                <View style={styles.headerContainer}>
                    <Text
                        category='h1'
                        status='control'>
                        Hello
                    </Text>
                    <Text
                        style={styles.signInLabel}
                        category='s1'
                        status='control'>
                        Sign in to your account
                    </Text>
                </View>
                <Layout
                    style={styles.formContainer}
                    level='1'>
                    <Input
                        placeholder='Email'
                        icon={PersonIcon}
                        value={this.state.email}
                        onChangeText={text => {
                            this.setState({email: text})
                        }}
                    />
                    <Input
                        style={styles.passwordInput}
                        placeholder='Password'
                        icon={this.state.passwordVisible ? EyeIcon : EyeOffIcon}
                        value={this.state.password}
                        secureTextEntry={!this.state.passwordVisible}
                        onChangeText={text => {
                            this.setState({password: text})
                        }}
                        onIconPress={this.onPasswordIconPress.bind(this)}
                    />
                    <View style={styles.forgotPasswordContainer}>
                        <Button
                            style={styles.forgotPasswordButton}
                            appearance='ghost'
                            status='basic'
                            onPress={this.onForgotPasswordButtonPress.bind(this)}>
                            Forgot your password?
                        </Button>
                    </View>
                    <Divider/>
                    {/*<View style={styles.socialAuthContainer}>
                        <Text style={styles.socialAuthHintText}>
                            Sign in with a social account
                        </Text>
                        <View style={styles.socialAuthButtonsContainer}>
                            <Button
                                appearance='ghost'
                                size='giant'
                                status='basic'
                                icon={GoogleIcon}
                            />
                            <Button
                                appearance='ghost'
                                size='giant'
                                status='basic'
                                icon={FacebookIcon}
                            />
                            <Button
                                appearance='ghost'
                                size='giant'
                                status='basic'
                                icon={TwitterIcon}
                            />
                        </View>
                    </View>*/}
                </Layout>
                <Button
                    style={styles.signInButton}
                    onPress={this.onSignInButtonPress.bind(this)}
                    size='giant'>
                    SIGN IN
                </Button>
                <Button
                    style={styles.signUpButton}
                    appearance='ghost'
                    status='basic'
                    onPress={this.onSignUpButtonPress.bind(this)}>
                    Don't have an account? Create
                </Button>
            </KeyboardAwareScrollView>
        );
    }
}
