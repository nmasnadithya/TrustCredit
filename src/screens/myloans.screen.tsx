import React, {Component} from 'react';
import {ImageBackground, ImageStyle, ListRenderItemInfo, SafeAreaView, StyleSheet, View} from 'react-native';
import {
    Button,
    Card,
    Divider,
    Icon,
    List,
    StyleService,
    Text,
    TopNavigation,
    TopNavigationAction
} from '@ui-kitten/components';
import {AppRoute, AppStackParamList} from "../navigation.component";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {light} from "@eva-design/eva";
import {ClockIcon, InterestIcon, LogInIcon, LogOutIcon, MenuIcon, MoneyIcon} from "../icons/icons";
import {MyLoan} from "../model/myLoans";

const BackIcon = (style: ImageStyle) => (
    <Icon {...style} name='arrow-back'/>
);

type NavigationProp = DrawerNavigationProp<AppStackParamList, AppRoute.MY_LOANS>;

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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: 'column'
    },
    itemFooter: {
        flexDirection: 'row',
        marginTop: 16,
        marginHorizontal: -4,
        alignItems: 'center'
    },
    activityButton: {
        marginHorizontal: 4,
        paddingHorizontal: 0,
    },
}, light);

const offers: MyLoan[] = [
    MyLoan.offer1(),
    MyLoan.offer2(),
    MyLoan.offer3(),
    MyLoan.offer4(),
    MyLoan.offer1(),
    MyLoan.offer2(),
    MyLoan.offer3(),
    MyLoan.offer4(),
];

export default class MyLoansScreen extends Component<Props> {

    renderHeader(info: ListRenderItemInfo<MyLoan>): React.ReactElement {
        if(info.item.loanSettled) {
            return (
                <View style={styles.itemHeader}>
                    <ImageBackground
                        style={{height: 160}}
                        resizeMode={"contain"}
                        source={info.item.bankImage}
                    />
                    <View style={{
                        ...StyleSheet.absoluteFillObject,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text category='h4' style={{color: 'white'}}>LOAN SETTLED</Text>
                    </View>

                </View>
            );
        } else {
            return (
                <View style={styles.itemHeader}>
                    <ImageBackground
                        style={{height: 160}}
                        resizeMode={"contain"}
                        source={info.item.bankImage}
                    />
                </View>
            );
        }
    }

    renderFooter(info: ListRenderItemInfo<MyLoan>): React.ReactElement {
        if(info.item.loanSettled) {
            return (
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
                        status='danger'
                        icon={InterestIcon}>
                        {`${info.item.interestRate * 100}%`}
                    </Button>
                    <Text style={styles.activityButton} category='s1'>
                        {`Issued: ${info.item.loanIssued.toLocaleDateString('en-US')}`}
                    </Text>
                    {/*TODO: fix alignments*/}
                    <Text style={styles.activityButton} category='s1'>
                        {`Settled: ${info.item.loanSettled?.toLocaleDateString('en-US')}`}
                    </Text>
                </View>
            );
        } else {
            return (
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
                        status='danger'
                        icon={InterestIcon}>
                        {`${info.item.interestRate * 100}%`}
                    </Button>
                    <Text style={styles.activityButton} category='s1'>
                        {`Issued: ${info.item.loanIssued.toLocaleDateString('en-US')}`}
                    </Text>
                </View>
            );
        }
    }

    renderItem(info: ListRenderItemInfo<MyLoan>): React.ReactElement {
        return (
            <Card
                style={styles.item}
                header={this.renderHeader.bind(this, info)}>
                <Text category='h4'>{info.item.bank}</Text>
                {this.renderFooter(info)}
            </Card>
        );
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation title='My Loans' alignment='center' leftControl={<TopNavigationAction icon={MenuIcon}
                                                                                                        onPress={this.props.navigation.toggleDrawer}/>}/>
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