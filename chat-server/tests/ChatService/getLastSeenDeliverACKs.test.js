import ChatServices from '../../service/ChatService'
import { ACK_validation } from './validation'

expect.extend({
    checkACK(ack) {

        var pass = true
        var errMessge = ""
        try {
            const { error } = ACK_validation(ack)
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
            return { message: () => `expected  not to be a chat object`, pass: true, };
        } else {
            return { message: () => errMessge, pass: false, };
        }

    },
});

test('getLastSeenACK', (done) => {

    ChatServices.getLastSeenACK(10005, 10005)
        .then((res) => {
            expect(res).checkACK();
            done()
        })
        .catch(err => { console.log(err); done(err) })

});

test('getLastDeliverACK', (done) => {

    ChatServices.getLastDeliverACK(10005, 10005)
        .then((res) => {
            expect(res).checkACK();
            done()
        })
        .catch(err => { console.log(err); done(err) })

});
