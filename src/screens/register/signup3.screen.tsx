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

type NavigationProp = StackNavigationProp<AuthStackParamList, AppRoute.SIGNUP3>;

type Props = {
    navigation: NavigationProp;
};

type State = {
    phoneModel?: string,
    phonePurchase?: Date,
    educationLevel?: SelectOption,
    employment?: SelectOption
    employmentDuration?: SelectOption
    monthlyIncome?: SelectOption
    residentialStatus?: SelectOption
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
    { text: 'None' },
    { text: 'OL/AL' },
    { text: 'Diploma/Bachelors' },
];

const employmentSelect = [
    { text: 'Student' },
    { text: 'Self Employed' },
    { text: 'Employed' },
];

const employmentDurationSelect = [
    { text: 'Less than 1 year' },
    { text: '1 - 3 years' },
    { text: 'More than 3 years' },
];

const incomeSelect = [
    { text: 'Less than 15,000' },
    { text: '15,000 - 30,000' },
    { text: 'More than 30,000' },
];

const residentialSelect = [
    { text: 'Parents' },
    { text: 'Rented' },
    { text: 'Own' },
    { text: 'Other' },
];

export default class SignupScreen3 extends Component<Props, State> {

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
        };
    }

    onSignUpButtonPress() {
        this.props.navigation.navigate(AppRoute.SIGNUP4);
    }

    render() {
        return (
            <KeyboardAwareScrollView style={styles.container} enableOnAndroid={true}
                                     contentContainerStyle={{flexGrow: 1}} bounces={false} bouncesZoom={false}
                                     alwaysBounceVertical={false} alwaysBounceHorizontal={false}>
                <Layout
                    style={styles.formContainer}
                    level='1'>
                    <Text category='h4' style={styles.stepCounterText}>Personal Details</Text>
                    <Input
                        style={styles.emailInput}
                        autoCapitalize='none'
                        placeholder='Smartphone Model'
                        icon={SmartPhoneIcon}
                        value={this.state.phoneModel}
                        onChangeText={text => {
                            this.setState({phoneModel: text})
                        }}
                    />
                    <Datepicker
                        placeholder='Smartphone Purchase Date'
                        style={styles.emailInput}
                        date={this.state.phonePurchase}
                        onSelect={date => {
                            this.setState({phonePurchase: date})
                        }}
                        icon={CalendarIcon}
                        min={new Date("2015-01-01")}
                    />
                    <Select
                        style={styles.emailInput}
                        placeholder='Education Level'
                        data={educationLevelSelect}
                        selectedOption={this.state.educationLevel}
                        onSelect={option => {
                            this.setState({educationLevel: option})
                        }}
                    />
                    <Select
                        style={styles.emailInput}
                        placeholder='State of employment'
                        data={employmentSelect}
                        selectedOption={this.state.employment}
                        onSelect={option => {
                            this.setState({employment: option})
                        }}
                    />
                    <Select
                        style={styles.emailInput}
                        placeholder='Time in current job'
                        data={employmentDurationSelect}
                        selectedOption={this.state.employmentDuration}
                        disabled={this.state.employment != employmentSelect[2]}
                        onSelect={option => {
                            this.setState({employmentDuration: option})
                        }}
                    />
                    <Select
                        style={styles.emailInput}
                        placeholder='Monthly income'
                        data={incomeSelect}
                        selectedOption={this.state.monthlyIncome}
                        disabled={this.state.employment != employmentSelect[2]}
                        onSelect={option => {
                            this.setState({monthlyIncome: option})
                        }}
                    />
                    <Select
                        style={styles.emailInput}
                        placeholder='Residential Status'
                        data={residentialSelect}
                        selectedOption={this.state.residentialStatus}
                        onSelect={option => {
                            this.setState({residentialStatus: option})
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
