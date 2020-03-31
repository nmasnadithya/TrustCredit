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
    AddressIcon, CalendarIcon,
    PhoneIcon, SmartPhoneIcon,
} from "../../icons/icons";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {ProfileAvatar} from "../../ui/ProfileAvatar";
import {light} from "@eva-design/eva";

type NavigationProp = StackNavigationProp<AuthStackParamList, AppRoute.SIGNUP2>;

type Props = {
    navigation: NavigationProp;
};

type State = {
    address?: string,
    serviceProvider?: SelectOption,
    mobilePackage?: SelectOption
    mobileNumber?: string,
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

const serviceProviderSelect = [
    { text: 'Dialog' },
    { text: 'Mobitel' },
    { text: 'Hutch' },
    { text: 'Airtel' },
];

const mobilePackageSelect = [
    { text: 'Prepaid' },
    { text: 'Postpaid' },

];


export default class SignupScreen2 extends Component<Props, State> {

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
        };
    }

    onSignUpButtonPress() {
        this.props.navigation.navigate(AppRoute.SIGNUP3);
    }

    render() {
        return (
            <KeyboardAwareScrollView style={styles.container} enableOnAndroid={true}
                                     contentContainerStyle={{flexGrow: 1}} bounces={false} bouncesZoom={false}
                                     alwaysBounceVertical={false} alwaysBounceHorizontal={false}>
                <Layout
                    style={styles.formContainer}
                    level='1'>
                    <Text category='h4' style={styles.stepCounterText}>Basic Details</Text>
                    <Input
                        autoCapitalize='none'
                        style={styles.emailInput}
                        placeholder='Home Address'
                        icon={AddressIcon}
                        value={this.state.address}
                        onChangeText={text => {
                            this.setState({address: text})
                        }}
                    />
                    <Select
                        style={styles.emailInput}
                        placeholder='Mobile Service Provider'
                        data={serviceProviderSelect}
                        selectedOption={this.state.serviceProvider}
                        onSelect={option => {
                            this.setState({serviceProvider: option})
                        }}
                    />
                    <Select
                        style={styles.emailInput}
                        placeholder='Mobile Package Type'
                        data={mobilePackageSelect}
                        selectedOption={this.state.mobilePackage}
                        onSelect={option => {
                            this.setState({mobilePackage: option})
                        }}
                    />
                    <Input
                        style={styles.emailInput}
                        autoCapitalize='none'
                        placeholder='Mobile number'
                        icon={PhoneIcon}
                        value={this.state.mobileNumber}
                        onChangeText={text => {
                            this.setState({mobileNumber: text})
                        }}
                    />
                </Layout>

                <Button
                    style={styles.signUpButton}
                    size='giant'
                    onPress={this.onSignUpButtonPress.bind(this)}>
                    NEXT >
                </Button>
            </KeyboardAwareScrollView>
        );
    }
}
