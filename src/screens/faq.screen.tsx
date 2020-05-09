import React, {Component} from 'react';
import {ImageBackground, ImageStyle, ListRenderItemInfo, SafeAreaView, ScrollView, View} from 'react-native';
import {
    Button,
    Card, CardHeader,
    Divider,
    Icon,
    Layout,
    List,
    StyleService,
    Text,
    TopNavigation,
    TopNavigationAction
} from '@ui-kitten/components';
import {StackNavigationProp} from "@react-navigation/stack";
import {AppRoute, AppStackParamList} from "../navigation.component";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {light} from "@eva-design/eva";
import {LoanOffer} from "../model/loanOffer";
import {ClockIcon, InterestIcon, MoneyIcon} from "../icons/icons";

const BackIcon = (style: ImageStyle) => (
    <Icon {...style} name='arrow-back'/>
);

type NavigationProp = DrawerNavigationProp<AppStackParamList, AppRoute.FAQ>;

type Props = {
    navigation: NavigationProp;
};

export default class FaqScreen extends Component<Props> {

    faq: {title: string, text: string}[] = [
        {title: 'How do I know if I\'m eligible to receive a loan?', text: 'This digital loan is offered to customers on an invitational basis. You will be eligible to apply for loans from multiple MFIs based on your credit score'},
        {title: 'How do I obtain a loan?', text: 'Go to the loan offers section, select on a preferred loan option and click on apply'},
        {title: 'What are the loan options available?', text: 'Subject to loan eligibility conditions, you can request any loan amount between LKR 1,000 and LKR 20,000'},
        {title: 'How many loans can I obtain?', text: 'At any given time, you can have two active loans (two loans per NIC)'},
    ]


    constructor(props: Readonly<Props>) {
        super(props);
    }

    navigateBack() {
        this.props.navigation.goBack();
    }

    renderItem(info: ListRenderItemInfo<{title: string, text: string}>): React.ReactElement {
        return (
            <Card style={styles.card} header={() => <CardHeader title={info.item.title} />} status={info.index%2==0?'success':'success'}>
                <Text>
                    {info.item.text}
                </Text>
            </Card>
        );
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation
                    title='FAQ'
                    alignment='center'
                    leftControl={<TopNavigationAction
                        icon={BackIcon}
                        onPress={this.navigateBack.bind(this)}
                    />}
                />
                <Divider/>
                <List
                    style={styles.list}
                    data={this.faq}
                    renderItem={this.renderItem.bind(this)}
                />
            </SafeAreaView>
        );
    }
}
const styles = StyleService.createThemed({
    list: {
        flex: 1,
        padding: 4
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
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 256,
        padding: 32,
    },card: {
        marginVertical: 8,
    },
}, light);
