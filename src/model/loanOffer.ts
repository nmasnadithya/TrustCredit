import {ImageSourcePropType} from "react-native";
import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export class LoanOffer {

    constructor(readonly id: string,
                readonly bank: string,
                readonly bankImage: ImageSourcePropType,
                readonly amount: number,
                readonly repayPeriod: number,
                readonly interestRate: number,
                readonly description: string,
                readonly creditScore: number,
                readonly email: string,
    ) {
    }

    static async getOffers(score?: number): Promise<LoanOffer[]> {
        let output: LoanOffer[] = [];
        let data: FirebaseFirestoreTypes.QuerySnapshot;
        if (score) {
            data = await firestore()
                .collection('LoanOffers')
                .where('creditScore', '<=', score)
                .get();


        } else {
            data = await firestore()
                .collection('LoanOffers')
                .get();
        }
        data.forEach(offer => {
            let d = offer.data();
            output.push(new LoanOffer(d.key,
                d.bank,
                {uri: d.bankImage},
                d.amount,
                d.repayPeriod,
                d.interestRate,
                d.description,
                d.creditScore,
                d.email))
        })
        return output;
    }

    static offer1(): LoanOffer {
        return new LoanOffer("dsfsdfsdfsdf",
            "Patrickgold Microfinance",
            require("../assets/bank-1.png"),
            10000,
            45,
            0.1,
            "You earn +25 points if settled on time",
            123,
            "iframismath@gmail.com"
        );
    }

    static offer2(): LoanOffer {
        return new LoanOffer("dsfsdfsdfsdf",
            "Addosser Microfinance",
            require("../assets/bank-2.png"),
            10000,
            15,
            0.1,
            "You earn +25 points if settled on time",
            45,
            "iframismath@gmail.com"
        );
    }

    static offer3(): LoanOffer {
        return new LoanOffer("dsfsdfsdfsdf",
            "IBILE Microfinance",
            require("../assets/bank-3.png"),
            15000,
            16,
            0.12,
            "You earn +25 points if settled on time",
            89,
            "iframismath@gmail.com"
        );
    }

    static offer4(): LoanOffer {
        return new LoanOffer("dsfsdfsdfsdf",
            "BaOBaB Microfinance",
            require("../assets/bank-4.png"),
            17000,
            21,
            0.115,
            "You earn +25 points if settled on time",
            10,
            "iframismath@gmail.com"
        );
    }
}
