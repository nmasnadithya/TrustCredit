import {StackNavigationProp} from "@react-navigation/stack";
import {AppRoute, AppStackParamList, AuthStackParamList} from "../../navigation.component";
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
    AddressIcon, CalendarIcon,
    PhoneIcon, SmartPhoneIcon,
} from "../../icons/icons";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {ProfileAvatar} from "../../ui/ProfileAvatar";
import {light} from "@eva-design/eva";
import {Profile} from "../../model/profile";
import {RouteProp} from "@react-navigation/native";
import ImagePicker from 'react-native-image-picker';
import {v4 as uuidv4} from 'uuid';
import storage from '@react-native-firebase/storage';

type NavigationProp = StackNavigationProp<AuthStackParamList, AppRoute.SIGNUP1_5>;

type Props = {
    navigation: NavigationProp
    route: RouteProp<AuthStackParamList, AppRoute.SIGNUP1_5>;
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


export default class SignupScreen1_5 extends Component<Props, State> {

    constructor(props: Readonly<Props>) {
        super(props);
        console.log(this.props.route.params.profile)
        this.state = {
        };
    }

    onSignUpButtonPress() {
        let fileName = uuidv4();
        ImagePicker.showImagePicker({
            title: 'Upload NIC (Front)'
        }, (response) => {

            if (response.didCancel) {
                console.log('User cancelled NIC image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {

                const ext = response.fileName?.split('.');
                let path = `/NIC/${fileName}-front.${ext![ext!.length-1]}`;
                console.log(path);
                const reference = storage().ref(path);
                console.log(response.path);
                reference.putFile(response.path!).then(async a => {
                    console.log(a);
                    let url = await reference.getDownloadURL();
                    console.log(url);
                }).catch(reason => {
                    console.log(reason);
                });

                ImagePicker.showImagePicker({
                    title: 'Upload NIC (Back)'
                }, (response) => {

                    if (response.didCancel) {
                        console.log('User cancelled NIC image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        console.log('User tapped custom button: ', response.customButton);
                    } else {
                        const ext = response.fileName?.split('.');
                        let path = `/NIC/${fileName}-back.${ext![ext!.length-1]}`;
                        console.log(path);
                        const reference = storage().ref(path);
                        console.log(response.path);
                        reference.putFile(response.path!).then(async a => {
                            console.log(a);
                            let url = await reference.getDownloadURL();
                            console.log(url);
                        }).catch(reason => {
                            console.log(reason);
                        });
                        let profile = this.props.route.params.profile;
                        this.props.navigation.navigate(AppRoute.SIGNUP2, {
                            profile: profile,
                            password: this.props.route.params.password
                        });
                    }
                });
            }
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
                    <Text category='h4' style={styles.stepCounterText}>Upload Your NIC</Text>

                </Layout>

                <Button
                    style={styles.signUpButton}
                    size='giant'
                    onPress={this.onSignUpButtonPress.bind(this)}>
                    UPLOAD
                </Button>
            </KeyboardAwareScrollView>
        );
    }
}
