import React, {Component} from 'react';
import {Image, ImageStyle, SafeAreaView, View} from 'react-native';
import {
    Button,
    Divider,
    Icon,
    Layout,
    Modal,
    Spinner,
    StyleService,
    Text,
    TopNavigation,
    TopNavigationAction
} from '@ui-kitten/components';
import {AppRoute, AppStackParamList} from "../navigation.component";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {LoanOffer} from "../model/loanOffer";
import {light} from "@eva-design/eva";
import {RouteProp} from '@react-navigation/native';
import {addDays} from "../utils/dateutils";
import {Profile} from "../model/profile";

const BackIcon = (style: ImageStyle) => (
    <Icon {...style} name='arrow-back'/>
);

type NavigationProp = DrawerNavigationProp<AppStackParamList, AppRoute.LOAN_DETAILS>;

type ScreenProps = {
    navigation: NavigationProp;
    route: RouteProp<AppStackParamList, AppRoute.LOAN_DETAILS>;
};
export type RouteParams = {
    offer: LoanOffer,
};

type State = {
    showModal: boolean,
    modalMessage?: string,
};

const styles = StyleService.createThemed({
    container: {
        flex: 1,
    },
    list: {
        flex: 1,
    },
    listContent: {
        padding: 16,
    },
    cardItem: {
        margin: 8,
        height: 480,
        padding: 24,
        borderRadius: 4,
        backgroundColor: 'color-primary-default',
    },
    cardLogoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardLogo: {
        height: 60,
        width: 60,
        tintColor: 'text-control-color',
        resizeMode: 'contain',
    },
    cardOptionsButton: {
        position: 'absolute',
        right: -16,
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    cardNumber: {
        marginVertical: 12,
    },
    cardDetailsLabel: {
        marginVertical: 4,
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    },
    cardExpirationContainer: {
        right: 24,
        bottom: 24,
    },
    placeholderCard: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 192,
        margin: 8,
        backgroundColor: 'background-basic-color-3',
    },
    creditCardIcon: {
        alignSelf: 'center',
        width: 48,
        height: 48,
        tintColor: 'text-hint-color',
    },
    buyButtonContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    dividerStyle: {
        marginVertical: 8
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 256,
        padding: 32,
    },
}, light);

export default class LoanDetailsScreen extends Component<ScreenProps, State> {


    constructor(props: Readonly<ScreenProps>) {
        super(props);
        this.state = {
            showModal: false,
            modalMessage: undefined,
        }
    }

    navigateBack() {
        this.props.navigation.goBack();
    }

    onApply() {

        let offer = this.props.route.params.offer;
        let profile = Profile.instance;
        let url = `https://us-central1-trust-credit.cloudfunctions.net/sendMail?to=${offer.email}&nic=${profile.nic}&id=${offer.id}&amount=${offer.amount}&interest=${offer.interestRate}&period=${offer.repayPeriod}&bank=${profile.bank}&branch=${profile.branch}&accountNo=${profile.savingsAccount}&name=${profile.fullName}`;
        this.setState({showModal: true})
        fetch(url)
            .then((response) => {
                this.setState({modalMessage: "Loan Requested Successfully!"})
                console.log(response)
            })
            .catch((error) => {
                this.setState({modalMessage: error})
            });
    }

    render() {
        let offer = this.props.route.params.offer;
        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation
                    title='Loan Offer Details'
                    alignment='center'
                    leftControl={<TopNavigationAction
                        icon={BackIcon}
                        onPress={this.navigateBack.bind(this)}
                    />}
                />
                <Divider/>
                <React.Fragment>
                    <View style={styles.cardItem}>
                        <View style={styles.cardLogoContainer}>
                            <Image
                                style={styles.cardLogo as ImageStyle}
                                source={offer.bankImage}
                            />
                            <Button
                                style={styles.cardOptionsButton}
                                appearance='ghost'
                                status='control'
                            />
                        </View>
                        <Text
                            style={styles.cardNumber}
                            category='h6'
                            status='control'>
                            {offer.bank}
                        </Text>
                        <View style={{
                            flex: 1,
                            alignItems: 'stretch',
                            justifyContent: 'space-between',
                            flexDirection: 'column'
                        }}>
                            <View style={styles.itemContainer}>
                                <Text
                                    category='s1'
                                    status='control'>
                                    Loan Amount
                                </Text>
                                <Text
                                    category='s1'
                                    status='control'>
                                    {`${offer.amount} LKR`}
                                </Text>
                            </View>
                            <View style={styles.itemContainer}>
                                <Text
                                    style={styles.cardDetailsLabel}
                                    category='s1'
                                    status='control'>
                                    {`Interest (${offer.interestRate * 100}%)`}
                                </Text>
                                <Text
                                    category='s1'
                                    status='control'>
                                    {`${offer.amount * offer.interestRate} LKR`}
                                </Text>
                            </View>
                            <Divider style={styles.dividerStyle}/>
                            <View style={styles.itemContainer}>
                                <Text
                                    style={[styles.cardDetailsLabel, {fontWeight: 'bold'}]}
                                    category='s1'
                                    status='control'>
                                    Total
                                </Text>
                                <Text
                                    category='s1'
                                    status='control'>
                                    {`${offer.amount * (offer.interestRate + 1)} LKR`}
                                </Text>
                            </View>
                            <Divider style={styles.dividerStyle}/>
                            <View style={styles.itemContainer}>
                                <Text
                                    style={[styles.cardDetailsLabel]}
                                    category='s1'
                                    status='control'>
                                    Repayment period
                                </Text>
                                <Text
                                    category='s1'
                                    status='control'>
                                    {`${offer.repayPeriod} days`}
                                </Text>
                            </View>
                            <View style={styles.itemContainer}>
                                <Text
                                    style={[styles.cardDetailsLabel]}
                                    category='s1'
                                    status='control'>
                                    Repayment Date
                                </Text>
                                <Text
                                    category='s1'
                                    status='control'>
                                    {`${addDays(new Date(), offer.repayPeriod).toDateString()}`}
                                </Text>
                            </View>
                            <Divider style={styles.dividerStyle}/>
                            <Text
                                style={{textAlign: 'center'}}
                                category='s1'
                                status='control'>
                                {offer.description}
                            </Text>
                        </View>
                    </View>
                    <Layout style={styles.buyButtonContainer}>
                        <Button
                            size='giant'
                            onPress={this.onApply.bind(this)}>
                            APPLY
                        </Button>
                    </Layout>
                </React.Fragment>
                <Modal
                    backdropStyle={styles.backdrop}
                    onBackdropPress={() => {
                    }}
                    visible={this.state.showModal}>
                    <Layout
                        level='3'
                        style={styles.modalContainer}>
                        {this.state.modalMessage &&
                        <>
                            <Text style={{textAlign: 'center'}} category='h4'>{this.state.modalMessage}</Text>
                            <Button onPress={event => {
                                this.setState({showModal: false});
                                this.navigateBack();
                            }}>
                                DISMISS
                            </Button>
                        </>
                        }
                        {this.state.modalMessage == undefined &&
                        <>
                            <Spinner size='giant'/>
                            <Text category='h4'>Requesting Loan</Text>
                        </>
                        }
                    </Layout>
                </Modal>
            </SafeAreaView>
        );
    }
}
