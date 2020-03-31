import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const MaterialIconsPack = {
    name: 'material',
    icons: createIconsMap(),
};

function createIconsMap() {
    return new Proxy({}, {
        get(target, name) {
            return IconProvider(name as string);
        },
    });
}

const IconProvider = (name: string) => ({
    toReactElement: (props: any) => MaterialIcon({ name, ...props }),
});

function MaterialIcon(input: { name: string, style: any }) {
    const {height, tintColor, ...iconStyle} = StyleSheet.flatten(input.style);
    return (
        <Icon name={input.name} size={height} color={tintColor} style={iconStyle}/>
    );
}