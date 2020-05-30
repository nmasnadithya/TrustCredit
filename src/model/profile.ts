import {ImageSourcePropType} from "react-native";
import firestore from '@react-native-firebase/firestore';

export class Profile {
    static uid: string;
    static instance: Profile;

    constructor(public fullName?: string,
                public email?: string,
                public dob?: Date,
                public age?: number,
                public nic?: string,
                public photo?: string,
                public address?: string,
                public serviceProvider?: string,
                public mobilePackageType?: string,
                public mobileNo?: string,
                public smartphoneModel?: string,
                public smartphonePurchaseDate?: string,
                public educationLevel?: string,
                public employmentState?: string,
                public employmentDuration?: string,
                public monthlyIncome?: string,
                public residentialStatus?: string,
                public savingsAccount?: string,
                public bank?: string,
                public branch?: string,
                readonly creditScore?: number,
                readonly creditScoreDate?: Date) {
    }

    static async fetchProfile(uid: string) {
        this.uid = uid;
        let value = await firestore()
            .collection('Users')
            .doc(this.uid)
            .get();
        console.log("fetched profile")
        let p = value.data();
        this.instance = new Profile(
            p?.fullName,
            p?.email,
            p?.dob.toDate(),
            p?.age,
            p?.nic,
            p?.photo,
            p?.address,
            p?.serviceProvider,
            p?.mobilePackageType,
            p?.mobileNo,
            p?.smartphoneModel,
            p?.smartphonePurchaseDate,
            p?.educationLevel,
            p?.employmentState,
            p?.employmentDuration,
            p?.monthlyIncome,
            p?.residentialStatus,
            p?.savingsAccount,
            p?.bank,
            p?.branch,
            p?.creditScore,
            p?.creditScoreDate?.toDate(),
        )
    }
}
