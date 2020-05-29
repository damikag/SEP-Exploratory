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

test('getMoreMessages', (done) => {

    ChatServices.getMoreMessages(10005,10050)
        .then(async(res) => {

            await expect(res).checkChatMessageArr();
            done()
        })
        .catch(err => { console.log(err); done(err) })

});

test('getMoreMessages for imposible lastMsg_id', (done) => {

    ChatServices.getMessages(11005,99999)
        .then(async(res) => {

            await expect(res).toEqual([]);
            done()
        })
        .catch(err => { console.log(err); done(err) })

});
