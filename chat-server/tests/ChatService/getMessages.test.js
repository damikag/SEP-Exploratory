import ChatServices from '../../service/ChatService'
import { chatMessageArr_validation } from './validation'


expect.extend({
    checkChatMessageArr(msgAr) {

        var pass = true
        var errMessge=""
        try {
            const { error } = chatMessageArr_validation(msgAr)
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
            return {message: () => `expected  not to be a chat message array`, pass: true,};
        } else {
            return { message: () => errMessge, pass: false,};
        }

    },
});

test('getMessages', (done) => {

    ChatServices.getMessages(10005)
        .then(async(res) => {

            await expect(res).checkChatMessageArr();
            done()
        })
        .catch(err => { console.log(err); done(err) })

});

test('getMessages from non existing chat', (done) => {

    ChatServices.getMessages(11005)
        .then(async(res) => {

            await expect(res).toEqual([]);
            done()
        })
        .catch(err => { console.log(err); done(err) })

});
