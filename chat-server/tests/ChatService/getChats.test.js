import ChatServices from '../../service/ChatService'
import { chatObject_validation } from './validation'


expect.extend({
    checkChatObject(msg) {

        var pass = true
        var errMessge=""
        try {
            const { error } = chatObject_validation(msg)
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
            return {message: () => `expected  not to be a chat object`, pass: true,};
        } else {
            return { message: () => errMessge, pass: false,};
        }

    },
});

test('getchats', (done) => {

    ChatServices.getChats(10005)
        .then(async(res) => {
            await res.forEach(msg=>{
                expect(msg).checkChatObject();
            })
            done()
        })
        .catch(err => { console.log(err); done(err) })

});


test('getchats from non existing user', (done) => {

    ChatServices.getChats(11005)
        .then((res) => {
            expect(res).toEqual([])
            done()
        })
        .catch(err => { console.log(err); done(err) })

});