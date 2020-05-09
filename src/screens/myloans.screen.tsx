import React, {Component} from 'react';
import {ImageBackground, ImageStyle, ListRenderItemInfo, SafeAreaView, StyleSheet, View} from 'react-native';
import {
    Button,
    Card,
    Icon,
    Layout, List,
    StyleService,
    Tab,
    TabView,
    Text,
    TopNavigation,
    TopNavigationAction
} from '@ui-kitten/components';
import {AppRoute, AppStackParamList} from "../navigation.component";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {light} from "@eva-design/eva";
import {InterestIcon, MenuIcon, MoneyIcon} from "../icons/icons";
import {MyLoan} from "../model/myLoans";

const BackIcon = (style: ImageStyle) => (
    <Icon {...style} name='arrow-back'/>
);

type NavigationProp = DrawerNavigationProp<AppStackParamList, AppRoute.MY_LOANS>;

type Props = {
    navigation: NavigationProp;
};

type State = {
    selectedIndex: number,
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
    tabContainer: {
        minHeight: '96%',
    },
}, light);

const offers: MyLoan[] = [
    MyLoan.offer1(),
    MyLoan.offer2(),
    MyLoan.offer3(),
    MyLoan.offer4(),
    MyLoan.offer2(),
    MyLoan.offer3(),
];

export default class MyLoansScreen extends Component<Props, State> {


    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            selectedIndex: 0,
        }
    }

    renderHeader(info: ListRenderItemInfo<MyLoan>): React.ReactElement {
        if (info.item.loanSettled) {
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
        if (info.item.loanSettled) {
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
            let dueDate = new Date(info.item.loanIssued);
            console.log(`date: ${dueDate.getDate()}`)
            console.log(`period: ${info.item.repayPeriod}`)
            console.log(`total dates: ${dueDate.getDate()+info.item.repayPeriod}`)
            dueDate.setDate(dueDate.getDate()+info.item.repayPeriod);
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
                    <Text style={styles.activityButton} category='s1'>
                        {`Due by: ${dueDate.toLocaleDateString('en-US')}`}
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
                <TopNavigation title='My Loans'
                               alignment='center'
                               leftControl={<TopNavigationAction icon={MenuIcon} onPress={this.props.navigation.toggleDrawer}/>}/>
                <TabView
                    selectedIndex={this.state.selectedIndex}
                    onSelect={index => {
                        this.setState({selectedIndex: index})
                    }}>
                    <Tab title='All'>

                        <Layout style={styles.tabContainer}>
                            <List
                                style={styles.list}
                                data={offers}
                                renderItem={this.renderItem.bind(this)}
                            />
                        </Layout>

                    </Tab>
                    <Tab title='Pending'>
                        <Layout style={styles.tabContainer}>
                            <List
                                style={styles.list}
                                data={offers.filter(value => !value.loanSettled)}
                                renderItem={this.renderItem.bind(this)}
                            />
                        </Layout>
                    </Tab>
                    <Tab title='Settled'>
                        <Layout style={styles.tabContainer}>
                            <List
                                style={styles.list}
                                data={offers.filter(value => value.loanSettled)}
                                renderItem={this.renderItem.bind(this)}
                            />
                        </Layout>
                    </Tab>
                </TabView>
            </SafeAreaView>

        );
    }
}
