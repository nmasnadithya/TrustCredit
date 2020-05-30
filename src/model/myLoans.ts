import {LoanOffer} from "./loanOffer";
import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {Profile} from './profile';

export class MyLoan extends LoanOffer {

    constructor(
        loanOffer: LoanOffer,
        readonly loanRequested: Date,
        readonly loanIssued?: Date,
        readonly loanSettled?: Date,
    ) {
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

    static async getLoans(): Promise<MyLoan[]> {
        let output: MyLoan[] = [];
        let data: FirebaseFirestoreTypes.QuerySnapshot;
        data = await firestore()
            .collection('Loans')
            .where('user', '==', Profile.uid)
            .get();
        data.forEach(loan => {
            let d = loan.data();
            output.push(new MyLoan(
                new LoanOffer(
                    loan.id,
                        d.bank,
                        {uri: d.bankImage},
                        d.amount,
                        d.repayPeriod,
                        d.interestRate,
                        d.description,
                        d.creditScore,
                        d.email
                ),
                d.loanRequested.toDate(),
                d.loanIssued?.toDate(),
                d.loanSettled?.toDate(),
                )
            )
            // output.push(new LoanOffer(offer.id,
            //     d.bank,
            //     {uri: d.bankImage},
            //     d.amount,
            //     d.repayPeriod,
            //     d.interestRate,
            //     d.description,
            //     d.creditScore,
            //     d.email))
        })
        return output;
    }

    // static offer1(): MyLoan {
    //     return new MyLoan(
    //         new Date("2020-01-01"),
    //         LoanOffer.offer1()
    //     );
    // }
    //
    // static offer2(): MyLoan {
    //     return new MyLoan(
    //         new Date("2019-12-01"),
    //         LoanOffer.offer2(),
    //         new Date("2020-01-03")
    //     );
    // }
    //
    // static offer3(): MyLoan {
    //     return new MyLoan(
    //         new Date("2020-02-14"),
    //         LoanOffer.offer3(),
    //         new Date("2020-02-20")
    //     );
    // }
    //
    // static offer4(): MyLoan {
    //     return new MyLoan(
    //         new Date("2020-03-05"),
    //         LoanOffer.offer2()
    //     );
    // }
}
