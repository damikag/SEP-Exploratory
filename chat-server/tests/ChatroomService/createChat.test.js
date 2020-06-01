import ChatroomService from '../../service/ChatroomService'

expect.extend({
    checkCreateChat(response) {

        var pass = response.success
        var errMessge = response.message

        return { message: () => errMessge, pass: pass, };
    },
});

test('Create chat', done => {
    var chatDetails = {
        name: "Test chat",
        description: "Test descriptio",
        creator_id: 10001,
        participants: [
            {
                user_id: 10001,
                isAdmin: 1,
            },
            {
                user_id: 10002,
                isAdmin: 0,
            }
        ],
        isDirrect: 0
    }

    ChatroomService.createChatRoom(chatDetails)
        .then((res) => {
            expect(res.success).toBeTruthy()
            done()
        })
        .catch(err => {
            done(err)
        })

})


test('Create chat without creator', done => {
    var chatDetails = {
        name: "Test chat",
        description: "Test descriptio",
        // creator_id: 10001,
        participants: [
            {
                user_id: 10001,
                isAdmin: 1,
            },
            {
                user_id: 10002,
                isAdmin: 0,
            }
        ],
        isDirrect: 0
    }

    ChatroomService.createChatRoom(chatDetails)
        .then((res) => {
            done(res)
        })
        .catch(err => {
            expect(err.success).toBeFalsy()
            done()
        })

})

test('Create chat invalid participant', done => {
    var chatDetails = {
        name: "Test chat",
        description: "Test descriptio",
        creator_id: 10001,
        participants: [
            {
                user_id: 10001,
                isAdmin: 1,
            },
            {
                user_id: 99999,
                isAdmin: 0,
            }
        ],
        isDirrect: 0
    }

    ChatroomService.createChatRoom(chatDetails)
        .then((res) => {
            done(res)
        })
        .catch(err => {
            expect(err.success).toBeFalsy()
            done()
        })

})

test('Create chat empty participants', done => {
    var chatDetails = {
        name: "Test chat",
        description: "Test descriptio",
        creator_id: 10001,
        isDirrect: 0
    }

    ChatroomService.createChatRoom(chatDetails)
        .then((res) => {
            done(res)
        })
        .catch(err => {
            expect(err.success).toBeFalsy()
            done()
        })

})

test('Create chat no name', done => {
    var chatDetails = {

        description: "Test descriptio",
        creator_id: 10001,
        participants: [
            {
                user_id: 10001,
                isAdmin: 1,
            },
            {
                user_id: 99999,
                isAdmin: 0,
            }
        ],
        isDirrect: 0
    }

    ChatroomService.createChatRoom(chatDetails)
        .then( (res) => {
            done(res)
        })
        .catch(err => {
            expect(err.success).toBeFalsy()
            done()
        })

})
