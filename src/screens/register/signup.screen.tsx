import {StackNavigationProp} from "@react-navigation/stack";
import {AppRoute, AuthStackParamList} from "../../navigation.component";
import React, {Component} from "react";
import {Button, CheckBox, Datepicker, Input, Layout, StyleService, Text} from "@ui-kitten/components";
import {ImageStyle, View} from "react-native";
import {
    AddressIcon,
    CalendarIcon,
    EmailIcon,
    EyeIcon,
    EyeOffIcon,
    FacebookIcon,
    GoogleIcon, NICIcon,
    PersonIcon,
    PlusIcon,
    TwitterIcon
} from "../../icons/icons";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {ProfileAvatar} from "../../ui/ProfileAvatar";
import {light} from "@eva-design/eva";
import {AccessToken, LoginManager} from "react-native-fbsdk";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from "@react-native-community/google-signin";
import {err} from "react-native-svg/lib/typescript/xml";
import {Profile} from "../../model/profile";

type NavigationProp = StackNavigationProp<AuthStackParamList, AppRoute.SIGNUP>;

type Props = {
    navigation: NavigationProp;
};

type State = {
    userName?: string,
    email?: string,
    password?: string,
    termsAccepted: boolean,
    passwordVisible: boolean,
    dob?: Date,
    nic?: string,
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
    profileAvatar: {
        width: 116,
        height: 116,
        borderRadius: 58,
        alignSelf: 'center',
        backgroundColor: 'background-basic-color-1',
    },
    editAvatarButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    formContainer: {
        flex: 1,
        paddingTop: 32,
        paddingHorizontal: 16,
    },
    emailInput: {
        marginTop: 16,
    },
    passwordInput: {
        marginTop: 16,
    },
    termsCheckBox: {
        marginTop: 24,
        flexDirection: 'column'
    },
    termsCheckBoxText: {
        color: 'text-hint-color',
    },
    signUpButton: {
        marginHorizontal: 16,
    },
    signInButton: {
        marginVertical: 12,
        marginHorizontal: 16,
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


export default class SignupScreen extends Component<Props, State> {

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            termsAccepted: false,
            passwordVisible: false,
        };
        GoogleSignin.configure({
            webClientId: 'AIzaSyBxrpPVOoMUyMj0LUGj0t4lK1jgwnAriUo', // From Firebase Console Settings
        });
    }

    onPasswordIconPress() {
        this.setState({
            passwordVisible: !this.state.passwordVisible
        })
    }

    onSignInButtonPress() {
        this.props.navigation.navigate(AppRoute.LOGIN);
    }

    onSignUpButtonPress() {
        //TODO: validation
        this.props.navigation.navigate(AppRoute.SIGNUP2, {
            profile: new Profile(this.state.userName, this.state.email, this.state.dob, (new Date()).getFullYear()-this.state.dob!.getFullYear(), this.state.nic),
            password: this.state.password!
        });
    }

    async onFacebookSignUp() {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email', "user_birthday"]);

        console.log(result)
        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }
        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        await auth().signInWithCredential(facebookCredential);
    }

    // Create a Google credential with the token
    async onGoogleSignUp() {
        try {
            await GoogleSignin.hasPlayServices();
            console.log("Starting Google Auth")
            const userInfo = await GoogleSignin.signIn();
            console.log("----------------------------")
            console.log(userInfo)
            console.log("----------------------------")
            const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
            console.log("----------------------------")
            console.log(googleCredential)
            console.log("----------------------------")
            let asd = await auth().signInWithCredential(googleCredential);
            console.log("----------------------------")
            console.log(asd)
            console.log("----------------------------")
        }catch (error) {
            console.log(error)
            console.log(error.message)
        }
    }

    render() {
        return (
            <KeyboardAwareScrollView style={styles.container} enableOnAndroid={true}
                                     contentContainerStyle={{flexGrow: 1}} bounces={false} bouncesZoom={false}
                                     alwaysBounceVertical={false} alwaysBounceHorizontal={false}>
                <View style={styles.headerContainer}>
                    <ProfileAvatar
                        style={styles.profileAvatar as ImageStyle}
                        source={require('../../assets/image-person.png')}
                        editButton={() => <Button
                            style={styles.editAvatarButton}
                            status='basic'
                            icon={PlusIcon}
                        />}
                    />
                </View>
                <Layout
                    style={styles.formContainer}
                    level='1'>
                    <Input
                        autoCapitalize='none'
                        placeholder='Full Name'
                        icon={PersonIcon}
                        value={this.state.userName}
                        onChangeText={text => {
                            this.setState({userName: text})
                        }}
                    />
                    <Input
                        style={styles.emailInput}
                        autoCapitalize='none'
                        placeholder='Email'
                        icon={EmailIcon}
                        value={this.state.email}
                        onChangeText={text => {
                            this.setState({email: text})
                        }}
                    />
                    <Input
                        autoCapitalize='none'
                        placeholder='NIC'
                        style={styles.emailInput}
                        icon={NICIcon}
                        value={this.state.nic}
                        onChangeText={text => {
                            this.setState({nic: text})
                        }}
                    />
                    <Datepicker
                        placeholder='Birthday'
                        style={styles.emailInput}
                        date={this.state.dob}
                        onSelect={date => {
                            this.setState({dob: date})
                        }}
                        icon={CalendarIcon}
                        min={new Date("1900/01/01")}

                    />
                    <Input
                        style={styles.passwordInput}
                        autoCapitalize='none'
                        secureTextEntry={!this.state.passwordVisible}
                        placeholder='Password'
                        icon={this.state.passwordVisible ? EyeIcon : EyeOffIcon}
                        value={this.state.password}
                        onChangeText={text => {
                            this.setState({password: text})
                        }}
                        onIconPress={this.onPasswordIconPress.bind(this)}
                    />
                    <Layout
                        style={styles.termsCheckBox}>
                        <CheckBox
                            textStyle={styles.termsCheckBoxText}
                            text='I read and agree to Terms & Conditions'
                            checked={this.state.termsAccepted}
                            onChange={(checked: boolean) => this.setState({termsAccepted: checked})}
                        />
                    </Layout>
                    {/*<View style={styles.socialAuthContainer}>
                        <Text style={styles.socialAuthHintText}>
                            Sign up with a social account
                        </Text>
                        <View style={styles.socialAuthButtonsContainer}>
                            <Button
                                appearance='ghost'
                                size='giant'
                                status='basic'
                                icon={GoogleIcon}
                                onPress={this.onGoogleSignUp.bind(this)}
                            />
                            <Button
                                appearance='ghost'
                                size='giant'
                                status='basic'
                                icon={FacebookIcon}
                                onPress={this.onFacebookSignUp.bind(this)}
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
                    style={styles.signUpButton}
                    size='giant'
                    onPress={this.onSignUpButtonPress.bind(this)}>
                    NEXT >
                </Button>
                <Button
                    style={styles.signInButton}
                    appearance='ghost'
                    status='basic'
                    onPress={this.onSignInButtonPress.bind(this)}>
                    Already have an account? Sign In
                </Button>
            </KeyboardAwareScrollView>
        );
    }
}
