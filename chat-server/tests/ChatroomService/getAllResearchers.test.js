import ChatroomService from '../../service/ChatroomService'
import { researcherObject_validation } from './validation'

expect.extend({
    checkResearcher(researcherObject) {

        var pass = true
        var errMessge=""
        try {
            const { error } = researcherObject_validation(researcherObject)
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
            return {message: () => `expected  not to be a researcher object`, pass: true,};
        } else {
            return { message: () => errMessge, pass: false,};
        }

    },
});

test('getAllResearchers', done => {
  
    ChatroomService.allResearchers()
        .then(async(res) => {
            await res.forEach(researcher=>{
                expect(researcher).checkResearcher()
            })
            done()
        })
        .catch(err => {
            done(err)
        })

})
