/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the UI Kitten TypeScript template
 * https://github.com/akveo/react-native-ui-kitten
 *
 * Documentation: https://akveo.github.io/react-native-ui-kitten/docs
 *
 * @format
 */

import React from 'react';
import {ImageProps, ImageStyle, StyleSheet,} from 'react-native';
import {ApplicationProvider, Button, Icon, IconRegistry, Layout, Text,} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {light as theme, mapping,} from '@eva-design/eva';
import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native";
import {Navigator} from "./navigation.component";

/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */
const HeartIcon = (style: ImageStyle): React.ReactElement<ImageProps> => (
    <Icon {...style} name='heart'/>
);

const App = (): React.ReactFragment => (
    <React.Fragment>
        <IconRegistry icons={EvaIconsPack}/>
        <ApplicationProvider mapping={mapping} theme={theme}>
            <Navigator/>
        </ApplicationProvider>
    </React.Fragment>
);



export default App;
