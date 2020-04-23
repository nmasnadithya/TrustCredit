// @ts-ignore
import SmsAndroid from 'react-native-get-sms-android';
// @ts-ignore
import convertArrayToCSV from 'convert-array-to-csv';
import firestore from "@react-native-firebase/firestore";
import storage from '@react-native-firebase/storage';

export class Sms {

    constructor(readonly _address: string,
                readonly _readable_date: string,
                readonly _body: string,
    ) {
    }

    static uploadData(userId: string) {
        console.log(`Fetching SMSes for user ${userId}`)
        SmsAndroid.list(
            JSON.stringify({}),
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
                        `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`,
                        value.body
                    )
                })

                console.log(`Parsed ${parsedArray.length} SMSes`);
                console.log(parsedArray[0]);

                const csv = convertArrayToCSV(parsedArray);
                console.log("Prepared CSV");
                let timestamp = new Date();
                const reference = storage().ref(`/sms/${userId}/${timestamp.toTimeString()}.csv`);
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
