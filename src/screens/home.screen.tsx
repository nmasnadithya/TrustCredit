import React, {Component} from 'react';
import {PermissionsAndroid, Share} from 'react-native';
import {Divider, Layout, Spinner, StyleService, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {AppRoute, AppStackParamList} from "../navigation.component";
import {MenuIcon, ShareIcon} from "../icons/icons";
import {DrawerNavigationProp} from "@react-navigation/drawer";
// @ts-ignore
import RNSpeedometer from "react-native-speedometer";
import {light} from "@eva-design/eva";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Sms} from "../model/sms";
import auth from '@react-native-firebase/auth';
import {Profile} from '../model/profile';


type NavigationProp = DrawerNavigationProp<AppStackParamList, AppRoute.HOME>;

type Props = {
    navigation: NavigationProp;
};
type State = {
    score: number;
}

const requiredPermissions = [
    PermissionsAndroid.PERMISSIONS.READ_SMS,
    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    PermissionsAndroid.PERMISSIONS.GET_ACCOUNTS,
    PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
];

const styles = StyleService.createThemed({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsTable: {
        marginTop: 64,
    },
    tableColumn: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    tableRow: {
        height: 64,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 16
    }
}, light);

export default class HomeScreen extends Component<Props, State> {
    validDate: Date | undefined;
    profile: Profile;

    openDetails() {
        this.props.navigation.navigate(AppRoute.MY_LOANS);
    }


    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            score: 750
        }
        this.profile = Profile.instance;

        if (this.profile.creditScoreDate) {
            this.validDate = this.profile.creditScoreDate;
            this.validDate.setMonth(this.validDate.getMonth() + 3);
        }
        this.requestPermissions();
    }

    async requestPermissions() {
        let response = await PermissionsAndroid.requestMultiple(requiredPermissions);
        requiredPermissions.forEach(value => {
            console.log(`${value} ${response[value]}`);
        })
        if (!(this.validDate && this.validDate >= new Date())) {
            Sms.uploadData(auth().currentUser!.uid);
        }
    }

    onShare() {
        Share.share({
            title: 'My credit score',
            message: `I calculated my credit score via Trust credit. \n
            My credit score is ${this.state.score}. \n
            Calculate yours by visiting http://www.crib.lk/en/index.php/about-us-2 `,
            url: 'http://www.crib.lk/en/index.php/about-us-2'
        },)
    }

    render() {
        console.log(`validDate: ${this.validDate}`)

        return (
            <KeyboardAwareScrollView enableOnAndroid={true}
                                     contentContainerStyle={{flexGrow: 1}} bounces={false} bouncesZoom={false}
                                     alwaysBounceVertical={false} alwaysBounceHorizontal={false}>
                <TopNavigation
                    title='My Credit Score'
                    alignment='center'
                    leftControl={
                        <TopNavigationAction
                            icon={MenuIcon}
                            onPress={this.props.navigation.toggleDrawer}/>
                    }
                    rightControls={[
                        <TopNavigationAction
                            icon={ShareIcon}
                            onPress={this.onShare.bind(this)}/>
                    ]}

                />
                <Divider/>
                {(this.validDate == undefined || this.validDate < new Date()) &&
                <Layout style={styles.spinnerContainer}>
                    <Spinner size='giant'/>
                    <Text category='h4' style={{marginTop: 16}}>Computing Credit Score</Text>
                </Layout>
                }

                {(this.validDate && this.validDate >= new Date()) &&
                <Layout style={styles.container}>
                    <RNSpeedometer
                        value={this.profile.creditScore}
                        minValue={0}
                        maxValue={100}
                        labels={[
                            {
                                name: 'Poor',
                                labelColor: '#ff5400',
                                activeBarColor: '#ff5400',
                            }, {
                                name: 'Fair',
                                labelColor: '#f4ab44',
                                activeBarColor: '#f4ab44',
                            }, {
                                name: 'Good',
                                labelColor: '#f2cf1f',
                                activeBarColor: '#f2cf1f',
                            }, {
                                name: 'Very Good',
                                labelColor: '#14eb6e',
                                activeBarColor: '#14eb6e',
                            }, {
                                name: 'Exceptional',
                                labelColor: '#00ff6b',
                                activeBarColor: '#00ff6b',
                            },
                        ]}
                        labelStyle={{display: 'none'}}
                        labelNoteStyle={{width: 100, textAlign: 'center', fontSize: 20}}

                    />
                    <Text style={{marginTop: 32}}> Your credit score is valid till {`${this.profile.creditScoreDate?.toDateString()}`}</Text>
                    <Layout style={{marginTop: 16, flexDirection: 'row', margin: 32}}>
                        <Layout level='3' style={styles.tableColumn}>
                            <Layout level='4' style={[styles.tableRow, {alignItems: 'center'}]}>
                                <Text>Rating</Text>
                            </Layout>
                            <Layout level='2' style={[styles.tableRow, {alignItems: 'center'}]}>
                                <Text>Poor</Text>
                            </Layout>
                            <Layout level='2' style={[styles.tableRow, {alignItems: 'center'}]}>
                                <Text>Fair</Text>
                            </Layout>
                            <Layout level='2' style={[styles.tableRow, {alignItems: 'center'}]}>
                                <Text>Good</Text>
                            </Layout>
                            <Layout level='2'
                                    style={[styles.tableRow, {alignItems: 'center', backgroundColor: '#14eb6e'}]}>
                                <Text>Very Good</Text>
                            </Layout>
                            <Layout level='2' style={[styles.tableRow, {alignItems: 'center'}]}>
                                <Text>Exceptional</Text>
                            </Layout>
                        </Layout>
                        <Layout level='2' style={styles.tableColumn}>
                            <Layout level='4' style={[styles.tableRow]}>
                                <Text>What the score means </Text>
                            </Layout>
                            <Layout level='2' style={[styles.tableRow]}>
                                <Text>{`Well below average\nDemonstrates to lenders that you're a risky borrower`}</Text>
                            </Layout>
                            <Layout level='2' style={styles.tableRow}>
                                <Text>{`Below average\nMany lenders will approve loans`}</Text>
                            </Layout>
                            <Layout level='2' style={styles.tableRow}>
                                <Text>{`Near or slightly above average\nMost lenders consider this a good score`}</Text>
                            </Layout>
                            <Layout level='2' style={[styles.tableRow, {backgroundColor: '#14eb6e'}]}>
                                <Text>{`Above average\nDemonstrates to lenders you're a very dependable borrower`}</Text>
                            </Layout>
                            <Layout level='2' style={styles.tableRow}>
                                <Text>{`Well above average\nDemonstrates to lenders you're an exceptional borrower`}</Text>
                            </Layout>
                        </Layout>
                    </Layout>
                </Layout>
                }
            </KeyboardAwareScrollView>
        );
    }
}
