import MessageService from '../../service/MessageService'
import { researcherObject_validation } from './validation'


expect.extend({
    checkSenderDetails(senderObject) {

        var pass = true
        var errMessge=""
        try {
            const { error } = researcherObject_validation(senderObject)
            if (error) {
                errMessge = error.details[0].message
                pass = false
            }
        }
        catch (error) {
            console.log(error)
            pass = false
        }

        if (pass) {
            return {message: () => `expected  not to be a researcher object`, pass: true,};
        } else {
            return { message: () => errMessge, pass: false,};
        }

    },
});

test('getSenderDetails', (done) => {

    MessageService.getSenderDetails(10001)
        .then(async(res) => {
            await expect(res[0]).checkSenderDetails();
            done()
        })
        .catch(err => { console.log(err); done(err) })

});

test('getSenderDetails for non existing researcher', (done) => {

    MessageService.getSenderDetails(99999)
        .then((res) => {
            expect(res).toEqual([]);
            done()
        })
        .catch(err => { console.log(err); done(err) })

});
