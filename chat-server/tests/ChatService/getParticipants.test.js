import ChatServices from '../../service/ChatService'
import { chatParticipantArr_validation } from './validation'


expect.extend({
    checkParticipantArr(msgAr) {

        var pass = true
        var errMessge=""
        try {
            const { error } = chatParticipantArr_validation(msgAr)
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

test('getParticipants', (done) => {

    ChatServices.getParticipants(10001)
        .then(async(res) => {

            await expect(res).checkParticipantArr();
            done()
        })
        .catch(err => { console.log(err); done(err) })

});

test('getParticipants for non existing chat', (done) => {

    ChatServices.getParticipants(99999)
        .then((res) => {
    
            expect(res).toEqual([]);
            done()
        })
        .catch(err => { console.log(err); done(err) })

});
