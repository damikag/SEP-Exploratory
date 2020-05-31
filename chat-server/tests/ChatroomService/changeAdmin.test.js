import ChatroomService from '../../service/ChatroomService'

test('change admin', done => {

    var userInfo = {
        chat_id: 10001,
        user_id: 10001,
        isAdmin: 1
    }

    ChatroomService.changeAdmin(userInfo)
        .then((res) => {
            expect(res.success).toBeTruthy()
            done()
        })
        .catch(err => {
            done(err)
        })

})

test('change admin invalid chat_id', done => {

    var userInfo = {
        chat_id: 99999,
        user_id: 10001,
        isAdmin: 1
    }

    ChatroomService.changeAdmin(userInfo)
        .then((res) => {
            expect(res.success).toBeFalsy()
            done()
        })
        .catch(err => {
            done(err)
        })

})

test('change admin invalid user_id', done => {

    var userInfo = {
        chat_id: 10001,
        user_id: 99999,
        isAdmin: 1
    }
    
    ChatroomService.changeAdmin(userInfo)
        .then((res) => {
            expect(res.success).toBeFalsy()
            done()
        })
        .catch(err => {
            done(err)
        })

})
