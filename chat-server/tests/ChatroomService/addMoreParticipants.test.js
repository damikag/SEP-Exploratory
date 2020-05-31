import ChatroomService from '../../service/ChatroomService'

// test('add more participants', done => {

//     var usersInfo={
//         chat_id:10001,
//         participants:[10002],
//       }
//     ChatroomService.addMoreParticipants(usersInfo)
//         .then((res) => {
//             console.log(res)
//             expect(res.success).toBeTruthy()
//             done()
//         })
//         .catch(err => {
//             console.log(err)
//             done(err)
//         })

// })

test('add more participant - available participant', done => {

    var usersInfo={
        chat_id:10001,
        participants:[10002],
      }
    ChatroomService.addMoreParticipants(usersInfo)
        .then((res) => {
            done(res)
        })
        .catch(err => {
            expect(err.success).toBeFalsy()
            done()
        })

})

test('add more participant - invalid participant', done => {

    var usersInfo={
        chat_id:10001,
        participants:[99999],
      }
    ChatroomService.addMoreParticipants(usersInfo)
        .then((res) => {
            done(res)
        })
        .catch(err => {
            expect(err.success).toBeFalsy()
            done()
        })

})

test('add more participant - invalid chat', done => {

    var usersInfo={
        chat_id:99999,
        participants:[10002],
      }
    ChatroomService.addMoreParticipants(usersInfo)
        .then((res) => {
            done(res)
        })
        .catch(err => {
            expect(err.success).toBeFalsy()
            done()
        })

})
