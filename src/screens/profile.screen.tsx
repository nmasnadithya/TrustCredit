import React, {Component} from 'react';
import {ImageStyle, ScrollView} from 'react-native';
import {Button, Icon, StyleService} from '@ui-kitten/components';
import {AppRoute, AppStackParamList} from "../navigation.component";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {ProfileAvatar} from "../ui/ProfileAvatar";
import {light} from "@eva-design/eva";
import {ProfileSetting} from "../ui/ProfileSetting";
import {Profile} from "../model/profile";
import {CameraIcon} from "../icons/icons";

const BackIcon = (style: ImageStyle) => (
    <Icon {...style} name='arrow-back'/>
);

type NavigationProp = DrawerNavigationProp<AppStackParamList, AppRoute.PROFILE>;

type Props = {
    navigation: NavigationProp;
};

const styles = StyleService.createThemed({
    container: {
        flex: 1,
        backgroundColor: 'background-basic-color-2',
    },
    contentContainer: {
        paddingVertical: 24,
    },
    profileAvatar: {
        aspectRatio: 1.0,
        height: 124,
        alignSelf: 'center',
    },
    editAvatarButton: {
        aspectRatio: 1.0,
        height: 48,
        borderRadius: 24,
    },
    profileSetting: {
        padding: 16,
    },
    section: {
        marginTop: 24,
    },
    doneButton: {
        marginHorizontal: 24,
        marginTop: 24,
    },
}, light);

const profile: Profile = Profile.iframIsmath();

export default class ProfileScreen extends Component<Props> {

    navigateBack() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}>
                <ProfileAvatar
                    style={styles.profileAvatar as ImageStyle}
                    source={profile.photo}
                    editButton={() => <Button
                        style={styles.editAvatarButton}
                        status='basic'
                        icon={CameraIcon}
                    />}
                />
                <ProfileSetting
                    style={[styles.profileSetting, styles.section]}
                    hint='Full Name'
                    value={profile.fullName}
                />
                <ProfileSetting
                    style={styles.profileSetting}
                    hint='Email'
                    value={profile.email}
                />
                <ProfileSetting
                    style={styles.profileSetting}
                    hint='NIC'
                    value={profile.nic}
                />
                <ProfileSetting
                    style={styles.profileSetting}
                    hint='Date of Birth'
                    value={profile.dob.toDateString()}
                />
                <ProfileSetting
                    style={[styles.profileSetting, styles.section]}
                    hint='Home Address'
                    value={profile.address}
                />
                <ProfileSetting
                    style={styles.profileSetting}
                    hint='Service Provider'
                    value={profile.serviceProvider}
                />
                <ProfileSetting
                    style={styles.profileSetting}
                    hint='Mobile Package Type'
                    value={profile.mobilePackageType}
                />
                <ProfileSetting
                    style={styles.profileSetting}
                    hint='Mobile Number'
                    value={profile.mobileNo}
                />
                <ProfileSetting
                    style={[styles.profileSetting, styles.section]}
                    hint='Smartphone Model'
                    value={profile.smartphoneModel}
                />
                <ProfileSetting
                    style={styles.profileSetting}
                    hint='Smartphone Purchase Date'
                    value={profile.smartphonePurchaseDate.toDateString()}
                />
                <ProfileSetting
                    style={styles.profileSetting}
                    hint='Highest Level of Education'
                    value={profile.educationLevel}
                />
                <ProfileSetting
                    style={styles.profileSetting}
                    hint='Employment State'
                    value={profile.employmentState}
                />
                <ProfileSetting
                    style={styles.profileSetting}
                    hint='Time in current job'
                    value={profile.employmentDuration}
                />
                <ProfileSetting
                    style={styles.profileSetting}
                    hint='Monthly Income'
                    value={profile.monthlyIncome}
                />
                <ProfileSetting
                    style={styles.profileSetting}
                    hint='Residential Status'
                    value={profile.residentialStatus}
                />
                <ProfileSetting
                    style={[styles.profileSetting, styles.section]}
                    hint='Savings Account Number'
                    value={profile.savingsAccount}
                />
                <ProfileSetting
                    style={styles.profileSetting}
                    hint='Bank'
                    value={profile.bank}
                />
                <ProfileSetting
                    style={styles.profileSetting}
                    hint='Branch'
                    value={profile.email}
                />
                <Button
                    style={styles.doneButton}
                    onPress={this.navigateBack.bind(this)}>
                    DONE
                </Button>
            </ScrollView>
        );
    }
}