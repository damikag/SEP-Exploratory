import ChatroomService from '../../service/ChatroomService'

test('updateChatInfo', done => {

    var chatInfo = {
        id: 10001,
        name: "Chat name updated",
        description: "Chat Description updated"
    }

    ChatroomService.updateChatInfo(chatInfo)
        .then((res) => {
            expect(res.success).toBeTruthy()
            done()
        })
        .catch(err => {
            done(err)
        })

})

test('updateChatInfo Invalid id', done => {

    var chatInfo = {
        id: 99999,
        name: "Chat name updated1",
        description: "Chat Description updated"
    }

    ChatroomService.updateChatInfo(chatInfo)
        .then((res) => {
            expect(res.success).toBeFalsy()
            done()
        })
        .catch(err => {
            done(err)
        })
})

test('updateChatInfo no id', done => {

    var chatInfo = {
        name: "Chat name updated1",
        description: "Chat Description updated"
    }

    ChatroomService.updateChatInfo(chatInfo)
        .then((res) => {
            expect(res.success).toBeFalsy()
            done()
        })
        .catch(err => {
            done(err)
        })
})
