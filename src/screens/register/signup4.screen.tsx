import {StackNavigationProp} from "@react-navigation/stack";
import {AppRoute, AuthStackParamList} from "../../navigation.component";
import React, {Component} from "react";
import {
    Button,
    CheckBox,
    Datepicker,
    Input,
    Layout,
    Select, SelectOption,
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

type NavigationProp = StackNavigationProp<AuthStackParamList, AppRoute.SIGNUP4>;

type Props = {
    navigation: NavigationProp;
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
        this.state = {
        };
    }

    onSignUpButtonPress() {
        this.props.navigation.navigate(AppRoute.APP);
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
