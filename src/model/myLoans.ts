import {ImageSourcePropType} from "react-native";
import {LoanOffer} from "./loanOffer";

export class MyLoan extends LoanOffer {

    constructor(readonly loanIssued: Date,
                loanOffer: LoanOffer,
                readonly loanSettled?: Date,) {
        super(
            loanOffer.id,
            loanOffer.bank,
            loanOffer.bankImage,
            loanOffer.amount,
            loanOffer.repayPeriod,
            loanOffer.interestRate,
            loanOffer.description,
            loanOffer.creditScore,
            loanOffer.email,
        );
    }

    static offer1(): MyLoan {
        return new MyLoan(
            new Date("2020-01-01"),
            LoanOffer.offer1()
        );
    }
    static offer2(): MyLoan {
        return new MyLoan(
            new Date("2019-12-01"),
            LoanOffer.offer2(),
            new Date("2020-01-03")
        );
    }
    static offer3(): MyLoan {
        return new MyLoan(
            new Date("2020-02-14"),
            LoanOffer.offer3(),
            new Date("2020-02-20")
        );
    }
    static offer4(): MyLoan {
        return new MyLoan(
            new Date("2020-03-05"),
            LoanOffer.offer2()
        );
    }
}
