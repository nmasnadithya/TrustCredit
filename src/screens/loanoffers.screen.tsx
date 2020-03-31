import React, {Component} from 'react';
import {ImageBackground, ListRenderItemInfo, SafeAreaView, View} from 'react-native';
import {
    Button,
    Card,
    Divider, Layout,
    List, Spinner,
    StyleService,
    Text,
    TopNavigation,
    TopNavigationAction
} from '@ui-kitten/components';
import {AppRoute, AppStackParamList} from "../navigation.component";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {LoanOffer} from "../model/loanOffer";
import {light} from "@eva-design/eva";
import {ClockIcon, InterestIcon, MenuIcon, MoneyIcon} from "../icons/icons";

type NavigationProp = DrawerNavigationProp<AppStackParamList, AppRoute.LOAN_OFFERS>;

type Props = {
    navigation: NavigationProp;
};

const styles = StyleService.createThemed({
    list: {
        flex: 1,
    },
    item: {
        borderRadius: 0,
        marginVertical: 8,
    },
    itemHeader: {
        height: 160,
    },
    itemFooter: {
        flexDirection: 'row',
        marginTop: 16,
        marginHorizontal: -4,
    },
    activityButton: {
        marginHorizontal: 4,
        paddingHorizontal: 0,
    },
}, light);

const offers: LoanOffer[] = [
    LoanOffer.offer1(),
    LoanOffer.offer2(),
    LoanOffer.offer3(),
    LoanOffer.offer4(),
    LoanOffer.offer1(),
    LoanOffer.offer2(),
    LoanOffer.offer3(),
    LoanOffer.offer4(),
];

export default class LoanOffersScreen extends Component<Props> {

    navigateBack() {
        this.props.navigation.goBack();
    }

    openOffer(offer: LoanOffer) {
        this.props.navigation.navigate(AppRoute.LOAN_DETAILS, {
            offer: offer
        });
    }

    renderItem(info: ListRenderItemInfo<LoanOffer>): React.ReactElement {
        return (
            <Card
                style={styles.item}
                header={() => <ImageBackground
                    resizeMode={"contain"}
                    style={styles.itemHeader}
                    source={info.item.bankImage}
                />}
                onPress={this.openOffer.bind(this, info.item)}
            >
                <Text category='h4'>{info.item.bank}</Text>
                <View style={styles.itemFooter}>
                    <Button
                        style={styles.activityButton}
                        appearance='ghost'
                        size='tiny'
                        icon={MoneyIcon}>
                        {`LKR ${info.item.amount}`}
                    </Button>
                    <Button
                        style={styles.activityButton}
                        appearance='ghost'
                        size='tiny'
                        icon={ClockIcon}>
                        {`${info.item.repayPeriod} days`}
                    </Button>
                    <Button
                        style={styles.activityButton}
                        appearance='ghost'
                        size='tiny'
                        status='danger'
                        icon={InterestIcon}>
                        {`${info.item.interestRate * 100}%`}
                    </Button>
                </View>
            </Card>
        );
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation title='Loan Offers' alignment='center' leftControl={<TopNavigationAction icon={MenuIcon} onPress={this.props.navigation.toggleDrawer}/>}/>
                <Divider/>
                <List
                    style={styles.list}
                    data={offers}
                    renderItem={this.renderItem.bind(this)}
                />
            </SafeAreaView>

        );
    }
}