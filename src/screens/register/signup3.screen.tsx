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
    AddressIcon, CalendarIcon, ClockIcon, MoneyIcon,
    PhoneIcon, SmartPhoneIcon,
} from "../../icons/icons";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {ProfileAvatar} from "../../ui/ProfileAvatar";
import {light} from "@eva-design/eva";
import {RouteProp} from "@react-navigation/native";

type NavigationProp = StackNavigationProp<AuthStackParamList, AppRoute.SIGNUP3>;

type Props = {
    navigation: NavigationProp;
    route: RouteProp<AuthStackParamList, AppRoute.SIGNUP2>;
};

type State = {
    phoneModel?: string,
    phonePurchase?: Date,
    educationLevel?: SelectOption,
    employment?: SelectOption
    employmentDuration?: string
    employmentDurationValidation: boolean
    monthlyIncome?: string
    monthlyIncomeValidation: boolean
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
    { text: 'Rent' },
    { text: 'Own' },
];

export default class SignupScreen3 extends Component<Props, State> {

    constructor(props: Readonly<Props>) {
        super(props);
        console.log(this.props.route.params.profile)
        this.state = {
            employmentDurationValidation: false,
            monthlyIncomeValidation: false
        };
    }

    onSignUpButtonPress() {
        let profile = this.props.route.params.profile;
        profile.smartphoneModel = this.state.phoneModel;
        profile.smartphonePurchaseDate = this.state.phonePurchase;
        profile.educationLevel = (this.state.educationLevel as SelectOptionType).text;
        profile.employmentState = (this.state.employment as SelectOptionType).text;
        profile.employmentDuration = this.state.employmentDuration;
        profile.monthlyIncome = this.state.monthlyIncome;
        profile.residentialStatus = (this.state.residentialStatus as SelectOptionType).text;
        this.props.navigation.navigate(AppRoute.SIGNUP4, {
            profile: profile,
            password: this.props.route.params.password
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
                    <Input
                        style={styles.emailInput}
                        placeholder='Time in current job(years)'
                        disabled={this.state.employment == employmentSelect[0]}
                        value = {this.state.employmentDuration}
                        onChangeText={text => {
                            this.setState({
                                employmentDuration: text,
                                employmentDurationValidation: this.state.employment != undefined &&
                                    this.state.employment != employmentSelect[0] &&
                                    this.state.employmentDuration != undefined &&
                                    this.state.employmentDuration.length > 0 &&
                                    isNaN(parseFloat(this.state.employmentDuration))
                            })
                        }}
                        caption={this.state.employmentDurationValidation ? 'Enter valid value' : ''}
                        status={this.state.employmentDurationValidation ? 'danger': ''}
                        icon={ClockIcon}
                    />
                    <Input
                        style={styles.emailInput}
                        placeholder='Monthly income(LKR)'
                        disabled={this.state.employment == employmentSelect[0]}
                        value = {this.state.monthlyIncome}
                        onChangeText={text => {
                            this.setState({
                                monthlyIncome: text,
                                monthlyIncomeValidation: this.state.employment != undefined &&
                                    this.state.employment != employmentSelect[0] &&
                                    this.state.monthlyIncome != undefined &&
                                    this.state.monthlyIncome.length > 0 &&
                                    isNaN(parseInt(this.state.monthlyIncome))
                            })
                        }}
                        caption={this.state.monthlyIncomeValidation ? 'Enter valid amount' : ''}
                        status={this.state.monthlyIncomeValidation ? 'danger': ''}
                        icon={MoneyIcon}
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
