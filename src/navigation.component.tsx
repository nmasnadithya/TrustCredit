import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from "./screens/home.screen";
import DetailsScreen from "./screens/details.component";
import SplashScreen from "./screens/splash.screen";
import WelcomeScreen from "./screens/register/welcome.screen";
import LoginScreen from "./screens/register/login.screen";
import SignupScreen from "./screens/register/signup.screen";

export enum AppRoute {
    AUTH = 'Auth',
    APP = 'App',
    WELCOME = 'Welcome',
    LOGIN = 'Login',
    HOME = 'Home',
    DETAILS = 'Details',
    SPLASH = 'Splash',
    SIGNUP = 'Signup'
}

export type RootStackParamList = AppStackParamList & AuthStackParamList


const token = undefined;


type StackNavigatorProps = React.ComponentProps<typeof AppStack.Navigator>;

export type AppNavigatorParams = {
    [AppRoute.AUTH]: undefined;
    [AppRoute.HOME]: undefined;
}
export type AppStackParamList = {
    [AppRoute.HOME]: undefined;
    [AppRoute.DETAILS]: undefined;
};

export type AuthStackParamList = {
    [AppRoute.SPLASH]: undefined;
    [AppRoute.LOGIN]: undefined;
    [AppRoute.WELCOME]: undefined;
    [AppRoute.SIGNUP]: undefined;
};

const AppStack = createStackNavigator<AppNavigatorParams>();
const HomeStack = createStackNavigator<AppStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();

const AppNavigator = (props: Partial<StackNavigatorProps>): React.ReactElement => (
    <AppStack.Navigator {...props} headerMode='none'>
        <AppStack.Screen name={AppRoute.AUTH} component={AuthNavigator}/>
        <AppStack.Screen name={AppRoute.HOME} component={HomeNavigator}/>
    </AppStack.Navigator>
);

const AuthNavigator = (): React.ReactElement => (
    <AuthStack.Navigator headerMode='none' initialRouteName={AppRoute.WELCOME}>
        <AuthStack.Screen name={AppRoute.WELCOME} component={WelcomeScreen}/>
        <AuthStack.Screen name={AppRoute.SPLASH} component={SplashScreen}/>
        <AuthStack.Screen name={AppRoute.LOGIN} component={LoginScreen}/>
        <AuthStack.Screen name={AppRoute.SIGNUP} component={SignupScreen}/>
    </AuthStack.Navigator>
);

const HomeNavigator = () => (
    <HomeStack.Navigator headerMode='none' initialRouteName={AppRoute.HOME}>
        <HomeStack.Screen name={AppRoute.HOME} component={HomeScreen}/>
        <HomeStack.Screen name={AppRoute.DETAILS} component={DetailsScreen}/>
    </HomeStack.Navigator>
);

export const Navigator = () => (
    <NavigationContainer>
        <AppNavigator initialRouteName={token ? AppRoute.HOME : AppRoute.AUTH}/>
    </NavigationContainer>
);
