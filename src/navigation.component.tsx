import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from "./screens/home.screen";
import MyLoansScreen from "./screens/myloans.screen";
import WelcomeScreen from "./screens/register/welcome.screen";
import LoginScreen from "./screens/register/login.screen";
import SignupScreen from "./screens/register/signup.screen";
import GuideScreen from "./screens/register/guide.component";
import SignupScreen2 from "./screens/register/signup2.screen";
import SignupScreen3 from "./screens/register/signup3.screen";
import SignupScreen4 from "./screens/register/signup4.screen";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {Drawer as UIKittenDrawer, DrawerHeaderFooter} from '@ui-kitten/components';
import {BellIcon, FaqIcon, HistoryIcon, HomeIcon, LoansIcon, LogOutIcon, OffersIcon, PersonIcon} from "./icons/icons";
import LoanOffersScreen from "./screens/loanoffers.screen";
import ContactScreen from "./screens/contactus.screen";
import ProfileScreen from "./screens/profile.screen";
import LoanDetailsScreen, {RouteParams as OfferDetailsProps} from "./screens/loandetails.screen";
import {Profile} from "./model/profile";
import HistoryScreen from "./screens/history.screen";
import FaqScreen from "./screens/faq.screen";

export enum AppRoute {
    AUTH = 'Auth',
    APP = 'App',
    WELCOME = 'Welcome',
    LOGIN = 'Login',
    HOME = 'Home',
    MY_LOANS = 'MyLoans',
    LOAN_OFFERS = 'LoanOffers',
    LOAN_DETAILS = 'LoanDetails',
    CONTACT = 'Contact',
    PROFILE = 'Profile',
    FAQ = 'Faq',
    HISTORY = 'History',
    GUIDE = 'Guide',
    SPLASH = 'Splash',
    SIGNUP = 'Signup',
    SIGNUP2 = 'Signup2',
    SIGNUP3 = 'Signup3',
    SIGNUP4 = 'Signup4',
}

const token = undefined;


type StackNavigatorProps = React.ComponentProps<typeof AppStack.Navigator>;

export type AppNavigatorParams = {
    [AppRoute.AUTH]: undefined;
    [AppRoute.APP]: undefined;
}
export type AppStackParamList = AppNavigatorParams & {
    [AppRoute.HOME]: undefined;
    [AppRoute.MY_LOANS]: undefined;
    [AppRoute.LOAN_OFFERS]: undefined;
    [AppRoute.HISTORY]: undefined;
    [AppRoute.CONTACT]: undefined;
    [AppRoute.FAQ]: undefined;
    [AppRoute.PROFILE]: undefined;
    [AppRoute.LOAN_DETAILS]: OfferDetailsProps;
};

export type AuthStackParamList = AppNavigatorParams & {
    [AppRoute.SPLASH]: undefined;
    [AppRoute.LOGIN]: undefined;
    [AppRoute.WELCOME]: undefined;
    [AppRoute.SIGNUP]: undefined;
    [AppRoute.SIGNUP2]: { profile: Profile, password: string };
    [AppRoute.SIGNUP3]: { profile: Profile, password: string };
    [AppRoute.SIGNUP4]: { profile: Profile, password: string };
    [AppRoute.GUIDE]: undefined;
};

const AppStack = createStackNavigator<AppNavigatorParams>();
const HomeStack = createDrawerNavigator<AppStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();

const AppNavigator = (props: Partial<StackNavigatorProps>): React.ReactElement => (
    <AppStack.Navigator {...props} headerMode='none'>
        <AppStack.Screen name={AppRoute.AUTH} component={AuthNavigator}/>
        <AppStack.Screen name={AppRoute.APP} component={HomeNavigator}/>
    </AppStack.Navigator>
);

const AuthNavigator = (): React.ReactElement => (
    <AuthStack.Navigator headerMode='none' initialRouteName={AppRoute.WELCOME}>
        <AuthStack.Screen name={AppRoute.WELCOME} component={WelcomeScreen}/>
        <AuthStack.Screen name={AppRoute.LOGIN} component={LoginScreen}/>
        <AuthStack.Screen name={AppRoute.SIGNUP} component={SignupScreen}/>
        <AuthStack.Screen name={AppRoute.SIGNUP2} component={SignupScreen2}/>
        <AuthStack.Screen name={AppRoute.SIGNUP3} component={SignupScreen3}/>
        <AuthStack.Screen name={AppRoute.SIGNUP4} component={SignupScreen4}/>
        <AuthStack.Screen name={AppRoute.GUIDE} component={GuideScreen}/>
    </AuthStack.Navigator>
);

const drawerData = [
    {title: 'My Credit Score', icon: HomeIcon},
    {title: 'My Loans', icon: LoansIcon},
    {title: 'Loan Offers', icon: OffersIcon},
    {title: 'Score History', icon: HistoryIcon},
    {title: 'Contact Us', icon: BellIcon},
    {title: 'FAQ', icon: FaqIcon},
];

class DrawerContent extends React.Component<{ navigation: any, state: any }> {
    render() {
        let {navigation, state} = this.props;

        const onSelect = (index: number) => {
            navigation.navigate(state.routeNames[index]);
        };
        const onProfile = (index: number) => {
            navigation.navigate(AppRoute.PROFILE);
        };
        const onLogout = (index: number) => {
            navigation.navigate(AppRoute.AUTH);
        };

        return (
            <UIKittenDrawer
                data={drawerData}
                selectedIndex={state.index}
                header={() => <DrawerHeaderFooter
                    title='JONE DOE'
                    description='077 8060 988'
                    icon={PersonIcon}
                    onPress={onProfile}
                />}
                footer={() => <DrawerHeaderFooter
                    title='Logout'
                    icon={LogOutIcon}
                    onPress={onLogout}
                />}
                onSelect={onSelect}
            />
        );
    }
}

const HomeNavigator = () => (
    <HomeStack.Navigator drawerContent={props => <DrawerContent {...props}/>} initialRouteName={AppRoute.HOME}>
        <HomeStack.Screen name={AppRoute.HOME} component={HomeScreen}/>
        <HomeStack.Screen name={AppRoute.MY_LOANS} component={MyLoansScreen}/>
        <HomeStack.Screen name={AppRoute.LOAN_OFFERS} component={LoanOffersScreen}/>
        <HomeStack.Screen name={AppRoute.HISTORY} component={HistoryScreen}/>
        <HomeStack.Screen name={AppRoute.CONTACT} component={ContactScreen}/>
        <HomeStack.Screen name={AppRoute.FAQ} component={FaqScreen}/>
        <HomeStack.Screen name={AppRoute.PROFILE} component={ProfileScreen}/>
        <HomeStack.Screen name={AppRoute.LOAN_DETAILS} component={LoanDetailsScreen}/>
    </HomeStack.Navigator>
);

export const Navigator = () => (
    <NavigationContainer>
        <AppNavigator initialRouteName={token ? AppRoute.APP : AppRoute.AUTH}/>
    </NavigationContainer>
);
