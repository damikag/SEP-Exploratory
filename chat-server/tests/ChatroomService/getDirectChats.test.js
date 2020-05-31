import ChatroomService from '../../service/ChatroomService'

test('getDirectChat', done => {
  
    ChatroomService.getDirrectChat(10001,10005)
        .then(async(res) => {
            expect(res).not.toBeNull()
            expect(res.chat_id).toBeGreaterThan(0)
            done()
        })
        .catch(err => {
            done(err)
        })

})


test('getDirectChat invalid user couple', done => {
  
    ChatroomService.getDirrectChat(99999,10001)
        .then(async(res) => {
            expect(res).toBeNull()
            done()
        })
        .catch(err => {
            done(err)
        })

})