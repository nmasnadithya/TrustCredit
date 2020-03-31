import {ImageSourcePropType} from "react-native";

export class LoanOffer {

    constructor(readonly bank: string,
                readonly bankImage: ImageSourcePropType,
                readonly amount: number,
                readonly repayPeriod: number,
                readonly interestRate: number,
                readonly description: string,
                ) {
    }

    static offer1(): LoanOffer {
        return new LoanOffer("Patrickgold Microfinance",
            require("../assets/bank-1.png"),
            10000,
            45,
            0.1,
            "You earn +25 points if settled on time"
        );
    }
    static offer2(): LoanOffer {
        return new LoanOffer("Addosser Microfinance",
            require("../assets/bank-2.png"),
            10000,
            15,
            0.1,
            "You earn +25 points if settled on time"
        );
    }
    static offer3(): LoanOffer {
        return new LoanOffer("IBILE Microfinance",
            require("../assets/bank-3.png"),
            15000,
            16,
            0.12,
            "You earn +25 points if settled on time"
        );
    }
    static offer4(): LoanOffer {
        return new LoanOffer("BaOBaB Microfinance",
            require("../assets/bank-4.png"),
            17000,
            21,
            0.115,
            "You earn +25 points if settled on time"
        );
    }
}