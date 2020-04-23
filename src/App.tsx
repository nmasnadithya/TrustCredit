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
import {ApplicationProvider, IconRegistry,} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {light as theme, mapping,} from '@eva-design/eva';
import 'react-native-gesture-handler';
import {Navigator} from "./navigation.component";
import {MaterialIconsPack} from "./icons/material.icons";
import {Material2IconsPack} from "./icons/material2.icons";
import { GoogleSignin } from '@react-native-community/google-signin';

/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */

const App = (): React.ReactFragment => (
    <React.Fragment>
        <IconRegistry icons={[EvaIconsPack, MaterialIconsPack, Material2IconsPack]}/>
        <ApplicationProvider mapping={mapping} theme={theme}>
            <Navigator/>
        </ApplicationProvider>
    </React.Fragment>
);


export default App;
