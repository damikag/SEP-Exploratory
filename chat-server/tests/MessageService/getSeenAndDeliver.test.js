import MessageService from '../../service/MessageService'
import { seenResearcherArr_validation } from './validation'


expect.extend({
    checkSeenDeliver(arr) {

        var pass = true
        var errMessge=""
        try {
            const { error } = seenResearcherArr_validation(arr)
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

test('getSeen', (done) => {

    MessageService.getSeen(10001,10001)
        .then(async(res) => {
            await expect(res).checkSeenDeliver();
            done()
        })
        .catch(err => { console.log(err); done(err) })

});

test('getSeen for invalid chat_id and message id', (done) => {

    MessageService.getSeen(99999,99999)
        .then(async(res) => {
            await expect(res).toEqual([]);
            done()
        })
        .catch(err => { console.log(err); done(err) })

});

test('getDeliver', (done) => {

    MessageService.getDeliver(10001,10001)
        .then(async(res) => {
            await expect(res).checkSeenDeliver();
            done()
        })
        .catch(err => { console.log(err); done(err) })

});

test('getDeliver for invalid chat_id and message id', (done) => {

    MessageService.getDeliver(99999,99999)
        .then(async(res) => {
            await expect(res).toEqual([]);
            done()
        })
        .catch(err => { console.log(err); done(err) })

});