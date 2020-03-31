import {ImageSourcePropType} from "react-native";

export class Profile {

    constructor(readonly fullName: string,
                readonly nic: string,
                readonly photo: ImageSourcePropType,
                readonly dob: Date,
                readonly email: string,
                readonly address: string,
                readonly serviceProvider: string,
                readonly mobilePackageType: string,
                readonly mobileNo: string,
                readonly smartphoneModel: string,
                readonly smartphonePurchaseDate: Date,
                readonly educationLevel: string,
                readonly employmentState: string,
                readonly employmentDuration: string,
                readonly monthlyIncome: string,
                readonly residentialStatus: string,
                readonly savingsAccount: string,
                readonly bank: string,
                readonly branch: string,) {
    }

    static iframIsmath(): Profile {
        return new Profile("Jone Doe",
            "1234567890V",
            require("../assets/image-person.png"),
            new Date("1996-06-12"),
            "asd@asd.com",
            "2nd Lane, 1st Road, Random City",
            "Dialog",
            "Prepaid",
            "077 1234567",
            "Samsung S8",
            new Date("2019-03-04"),
            "Diploma/Bachelors",
            "Employed",
            "1-3 years",
            "More than 30,000",
            "Live in own house",
            "0987654321",
            "Random Bank",
            "Random Branch"
        );
    }
}