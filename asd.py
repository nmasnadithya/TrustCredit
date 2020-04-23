smses = db.collection(u'SMS').stream()

for sms in smses:
    if (sms.processed == 0) {
        sms.link
        //DO the ML thing
        sms.set({
            u'processed': 1
        }, merge=True)
        user_ref = db.collection(u'Users').document(sms.userId)
        user_ref.set({
            u'score': //score,
            scoreCalculated: datetime.datetime.now()
        }, merge=True)
    }

