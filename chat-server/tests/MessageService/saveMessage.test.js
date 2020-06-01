import MessageService from '../../service/MessageService'
import { chatObject_validation } from './validation'

test('saveMessage', (done) => {
    var msg = {
        chat_id: 10001,
        message: "Test Message saveMessage Test",
        message_time: "2020-05-12 10:59:28",
        sender_id: 10001
    }

    MessageService.saveMessages(msg)
        .then(async (res) => {
            expect(res.insertId).toBeDefined()
            done()
        })
        .catch(err => { console.log(err); done(err) })

});

  test('Save msg without chat id ',done=>{
    var msg = {
                // chat_id: 10001,
                message: "Test Message saveMessage Test",
                message_time: "2020-05-12 10:59:28",
                sender_id: 10001
            }
        
            MessageService.saveMessages(msg)
                .then(async (res) => {
                    done(res)
                })
                .catch(err => { 
                    done() 
                })
        
  })

//   test('Save msg without sender_id ',done=>{
//     var msg = {
//                 chat_id: 10001,
//                 message: "Test Message saveMessage Test",
//                 message_time: "2020-05-12 10:59:28",
//                 // sender_id: 10001
//             }
        
//             MessageService.saveMessages(msg)
//                 .then(async (res) => {
//                     done(res)
//                 })
//                 .catch(err => { 
//                     done() 
//                 })
        
//   })