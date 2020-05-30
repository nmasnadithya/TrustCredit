// @ts-ignore
import SmsAndroid from 'react-native-get-sms-android';
import firestore from "@react-native-firebase/firestore";
import storage from '@react-native-firebase/storage';
import {Parser} from 'json2csv';

export class Sms {

    constructor(readonly _address: string,
                readonly _body: string,
                readonly _readable_date: string,
    ) {
    }


    static uploadData(userId: string) {
        console.log(`Fetching SMSes for user ${userId}`)
        let minDate = new Date();
        const fields = ['_address', '_body', '_readable_date'];
        const json2csvParser = new Parser({ fields });
        minDate.setMonth(minDate.getMonth() - 12);
        SmsAndroid.list(
            JSON.stringify({
                minDate: minDate.getTime()
            }),
            (fail: any) => {
                console.log('Failed with this error: ' + fail);
            },
            (count: number, smsList: string) => {
                console.log(`Retrieved ${count} SMSes`);
                var arr: [any] = JSON.parse(smsList);
                let parsedArray = arr.map(value => {
                    let d = new Date(value.date);
                    return new Sms(
                        value.address,
                        value.body,
                        `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()%100} 00:00`,
                    )
                })

                console.log(`Parsed ${parsedArray.length} SMSes`);
                console.log(parsedArray[0]);

                const csv = json2csvParser.parse(parsedArray);
                console.log("Prepared CSV");
                let timestamp = new Date();
                const reference = storage().ref(`/sms/${userId}/${timestamp.toISOString()}.csv`);
                reference.putString(unescape(encodeURIComponent(csv))).then(a => {
                    console.log("uploaded CSV");

                    reference.getDownloadURL().then(link => {
                        console.log("Created URL");

                        firestore()
                            .collection('SMS')
                            .add({
                                userId: userId,
                                date: timestamp,
                                processed: 0,
                                link: link
                            })
                            .then(a => {
                                console.log('Successfully added SMSes to DB');
                            })
                    })
                });

            },
        );
    }

}
