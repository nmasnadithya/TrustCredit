import {StackNavigationProp} from "@react-navigation/stack";
import {AppRoute, AuthStackParamList} from "../../navigation.component";
import React, {Component} from "react";
import {
    Button,
    CheckBox,
    Datepicker,
    Input,
    Layout,
    Select, SelectOption, SelectOptionType,
    StyleService,
    Text
} from "@ui-kitten/components";
import {ImageStyle, View} from "react-native";
import {
    AddressIcon, BankIcon, HashIcon,
    PhoneIcon,
} from "../../icons/icons";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {ProfileAvatar} from "../../ui/ProfileAvatar";
import {light} from "@eva-design/eva";
import {RouteProp} from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Profile} from "../../model/profile";

type NavigationProp = StackNavigationProp<AuthStackParamList, AppRoute.SIGNUP4>;

type Props = {
    navigation: NavigationProp;
    route: RouteProp<AuthStackParamList, AppRoute.SIGNUP2>;
};

type State = {
    accountNo?: string,
    bank?: SelectOption,
    branch?: string,
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
        tintColor: 'color-primary-default',
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
        marginVertical: 16,
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
    stepCounterText: {
        textAlign: 'center',
    },
}, light);

const educationLevelSelect = [
    { text: 'Commercial Bank' },
    { text: 'Bank of Ceylon' },
    { text: 'Sampath Bank' },
    { text: 'NSB' },
    { text: 'People\'s Bank' },
];

export default class SignupScreen4 extends Component<Props, State> {

    constructor(props: Readonly<Props>) {
        super(props);
        console.log(this.props.route.params.profile)
        this.state = {
        };
    }

    onSignUpButtonPress() {
        let profile = this.props.route.params.profile;
        profile.savingsAccount = this.state.accountNo;
        profile.bank = (this.state.bank as SelectOptionType).text;
        profile.branch = this.state.branch;

        auth()
            .createUserWithEmailAndPassword(profile.email!, this.props.route.params.password)
            .then(userCredential => {
                console.log('User account created on auth');
                firestore()
                    .collection('Users')
                    .doc(userCredential.user.uid)
                    .set(profile)
                    .then(a => {
                        console.log('Added User Account details');
                        Profile.fetchProfile(userCredential.user.uid).then(r => {
                            this.props.navigation.popToTop();
                            this.props.navigation.navigate(AppRoute.APP);
                        });
                    })
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });

    }

    render() {
        return (
            <KeyboardAwareScrollView style={styles.container} enableOnAndroid={true}
                                     contentContainerStyle={{flexGrow: 1}} bounces={false} bouncesZoom={false}
                                     alwaysBounceVertical={false} alwaysBounceHorizontal={false}>
                <Layout
                    style={styles.formContainer}
                    level='1'>
                    <Text category='h4' style={styles.stepCounterText}>Bank Details</Text>
                    <Input
                        style={styles.emailInput}
                        autoCapitalize='none'
                        placeholder='Savings Account Number'
                        icon={HashIcon}
                        value={this.state.accountNo}
                        onChangeText={text => {
                            this.setState({accountNo: text})
                        }}
                    />
                    <Select
                        style={styles.emailInput}
                        placeholder='Bank'
                        data={educationLevelSelect}
                        selectedOption={this.state.bank}
                        onSelect={option => {
                            this.setState({bank: option})
                        }}
                    />
                    <Input
                        style={styles.emailInput}
                        autoCapitalize='none'
                        placeholder='Bank Branch'
                        icon={AddressIcon}
                        value={this.state.branch}
                        onChangeText={text => {
                            this.setState({branch: text})
                        }}
                    />
                </Layout>

                <Button
                    style={styles.signUpButton}
                    size='giant'
                    onPress={this.onSignUpButtonPress.bind(this)}>
                    SIGN UP
                </Button>
            </KeyboardAwareScrollView>
        );
    }
}
