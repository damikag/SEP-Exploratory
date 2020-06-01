import ChatroomService from '../../service/ChatroomService'

// test('remove participants', done => {

//     ChatroomService.removeParticipant(10001,10005)
//         .then((res) => {
//             expect(res.success).toBeTruthy()
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })

// })

test('remove participant - unavailable participant', done => {

    ChatroomService.removeParticipant(10001,99999)
        .then((res) => {
            expect(res.success).toBeFalsy()
            done()
        })
        .catch(err => {
            done(err)
        })

})

test('remove participant - invalid chat_id', done => {

      ChatroomService.removeParticipant(99999,10001)
        .then((res) => {
            expect(res.success).toBeFalsy()
            done()
        })
        .catch(err => {
            done(err)
        })

})
