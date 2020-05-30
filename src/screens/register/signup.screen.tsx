import {StackNavigationProp} from "@react-navigation/stack";
import {AppRoute, AuthStackParamList} from "../../navigation.component";
import React, {Component} from "react";
import {Button, CheckBox, Input, Layout, StyleService} from "@ui-kitten/components";
import {ImageStyle, ImageURISource, View} from "react-native";
import {CalendarIcon, EmailIcon, EyeIcon, EyeOffIcon, NICIcon, PersonIcon, PlusIcon} from "../../icons/icons";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {ProfileAvatar} from "../../ui/ProfileAvatar";
import {light} from "@eva-design/eva";
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from "@react-native-community/google-signin";
import {Profile} from "../../model/profile";
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

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
    avatarSource: ImageURISource
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
            avatarSource: require('../../assets/image-person.png')
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
        this.props.navigation.navigate(AppRoute.SIGNUP1_5, {
            profile: new Profile(this.state.userName, this.state.email, this.state.dob, (new Date()).getFullYear() - this.state.dob!.getFullYear(), this.state.nic, this.state.avatarSource.uri),
            password: this.state.password!
        });

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
        } catch (error) {
            console.log(error)
            console.log(error.message)
        }
    }

    onProfileImage() {
        ImagePicker.showImagePicker({
            title: 'Select Profile Picture'
        }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const ext = response.fileName?.split('.');
                let path = `/profileImage/${uuidv4()}.${ext![ext!.length-1]}`;
                console.log(path);
                const reference = storage().ref(path);
                console.log(response.path);
                reference.putFile(response.path!).then(async a => {
                    console.log(a);
                    let url = await reference.getDownloadURL();
                    console.log(url);
                    const source = {uri: url};

                    // You can also display the image using data:
                    // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                    this.setState({
                        avatarSource: source,
                    });
                }).catch(reason => {
                    console.log(reason);
                });

            }
        });
    }

    render() {
        return (
            <KeyboardAwareScrollView style={styles.container} enableOnAndroid={true}
                                     contentContainerStyle={{flexGrow: 1}} bounces={false} bouncesZoom={false}
                                     alwaysBounceVertical={false} alwaysBounceHorizontal={false}>
                <View style={styles.headerContainer}>
                    <ProfileAvatar
                        style={styles.profileAvatar as ImageStyle}
                        source={this.state.avatarSource}
                        editButton={() => <Button
                            style={styles.editAvatarButton}
                            status='basic'
                            icon={PlusIcon}
                            onPress={this.onProfileImage.bind(this)}
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
                            this.setState({nic: text.substr(0, 10)})
                        }}
                    />
                    <Input
                        placeholder='Birthday (yyyy/mm/dd)'
                        style={styles.emailInput}
                        onChangeText={text => {
                            this.setState({dob: new Date(text)})
                        }}
                        icon={CalendarIcon}

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
