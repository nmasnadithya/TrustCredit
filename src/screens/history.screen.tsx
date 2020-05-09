import React, {Component} from 'react';
import {Dimensions, ImageStyle, SafeAreaView} from 'react-native';
import {Divider, Icon, Layout, Popover, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {AppRoute, AppStackParamList} from "../navigation.component";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {LineChart} from "react-native-chart-kit";

const BackIcon = (style: ImageStyle) => (
    <Icon {...style} name='arrow-back'/>
);

type NavigationProp = DrawerNavigationProp<AppStackParamList, AppRoute.HISTORY>;

type Props = {
    navigation: NavigationProp;
};

type State = {
    showValue: boolean;
    value?: number;
    valueX?: string;

};

export default class HistoryScreen extends Component<Props, State> {

    data: number[] = [];
    x: string[] = [];

    constructor(props: Readonly<Props>) {
        super(props);
        this.data = [
           45,
            55,
            63,
            57,
        ];
        this.x = [ "July", "October", "January", "April",];
        this.state = {
            showValue: false,
        }
    }

    navigateBack() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <TopNavigation
                    title='Score History'
                    alignment='center'
                    leftControl={<TopNavigationAction
                        icon={BackIcon}
                        onPress={this.navigateBack.bind(this)}
                    />}
                />
                <Divider/>
                <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Popover
                        visible={this.state.showValue}
                        placement='top'
                        content={<Layout style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 24,
                            backgroundColor:'#E7F99E',
                        }}>
                            <Text>Your score on 1st of {this.state.valueX!}: {(Math.round((this.state.value! + Number.EPSILON) * 100) / 100).toString()}</Text>
                        </Layout>}
                        onBackdropPress={() => {
                            this.setState({showValue: false})
                        }}>
                        <Text></Text>
                    </Popover>
                        <LineChart
                            data={{
                                labels: this.x,
                                datasets: [
                                    {
                                        data: this.data
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width * 0.9} // from react-native
                            height={Dimensions.get("window").width * 0.75}
                            yAxisLabel=""
                            yAxisSuffix=""
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "#3366FF",
                                backgroundGradientFrom: "#3366FF",
                                backgroundGradientTo: "#84A9FF",
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                propsForDots: {
                                    r: "4",
                                    strokeWidth: "2",
                                    stroke: "#3FD9FF"
                                },
                            }}
                            fromZero={true}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                            onDataPointClick={data => {
                                this.setState({
                                    value: data.value,
                                    valueX: this.x[data.index],
                                    showValue: true
                                })
                                console.log(data)
                            }}
                        />

                </Layout>
            </SafeAreaView>
        );
    }
}
