const db = require('../../db/db')
var Researcher = require('./Researcher')
var Project = require('./Project')

function Feed(email){

    this.email=email
    this.projects={}
    var tmpResearcher = new Researcher()
    tmpResearcher.find_by_email(email)
    .then((user) => {
        this.researcher=user
    })
    this.scores={
        newProject:2,
        updateProject:1,
        updateFollow:6,
        institution:3,
        follower:4,
    }
    // console.log(this.email)
}


Feed.prototype.automate = function automate(procedure,params,scoreAddition){
    return new Promise((resolve, reject) => {
        var projects=this.projects

        const cb = async function(error, results, fields){
            
            if (error){
                reject(error);
            }
            else{
                if(results[0].length > 0){

                    var tmpProject= new Project()
                    // var promiseArr=[]

                    // results[0].forEach((result,index)=>{
                    //     var id=result.id
                    //     if( !projects.hasOwnProperty(id)){
                    //         promiseArr.push(tmpProject.find_by_id(id)
                    //         .then(res=>{
                    //             projects[id]=Object.assign({score:0},res)
                    //         })
                    //         .catch(err=>{console.log(err)}))
                    //     }
                    // })

                    // Promise.all(promiseArr).then((res)=>{

                        results[0].forEach(function(result, index){
                            var id=result.id
                            if( projects.hasOwnProperty(id)){
                                projects[id]+= scoreAddition
                            }
                            else{
                                projects[id]= scoreAddition
                            }
                        })
                        // console.log(projects)
                        resolve()
                    // }).catch(err=>{console.log(err);resolve()})

                } else {
                    resolve();
                }
            }
        }
        db.call_proc(procedure, params, cb);
    });
}

Feed.prototype.get_new_projects = function get_new_projects(params){  
    return this.automate('get_new_projects',params,this.scores.newProject)
}


Feed.prototype.get_newlyupdated_projects = function get_newlyupdated_projects(params){
    return this.automate('get_newlyupdated_projects',params,this.scores.updateProject)
}


Feed.prototype.get_followed_projects = function get_followed_projects(params){
    return this.automate('get_followed_projects',params,this.scores.updateFollow)
}

// Bug in the procedure
// Feed.prototype.get_projects_from_followed_institutions = function get_projects_from_followed_institutions(params){
//     return this.automate('get_projects_from_followed_institutions',params,this.scores.institution)
// }


Feed.prototype.get_projects_from_followers = function get_projects_from_followers(params){
    return this.automate('get_projects_from_followers',params,this.scores.follower)
}

const refineFeed=(projects)=>{
    
    return new Promise((resolve,reject)=>{
        var projectArr=[]
        for (let [id, score] of Object.entries(projects)) {
            projectArr.push({
                id:id,
                score:score,
            })
        }
        projectArr.sort((a,b) => (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0))
           
        resolve(projectArr)
    
    })
    
}
Feed.prototype.getFeed = function getFeed(){
    
    return new Promise((resolve, reject) => {

      
        this.get_new_projects([1000]).then(()=>{
            this.get_newlyupdated_projects([1000]).then(()=>{
                this.get_followed_projects([this.researcher.id,1000]).then(()=>{
                    this.get_projects_from_followers([this.researcher.id,1000]).then(()=>{
                        
                        refineFeed(this.projects).then((resArr)=>{
                            resolve(resArr)
                        }).catch(err=>{resolve([])})
                        // resolve(this.projects)

                    }).catch(err=>{console.log(err);resolve([])})
                }).catch(err=>{console.log(err);resolve([])})
            }).catch(err=>{console.log(err);resolve([])})
            // console.log("done gene")
            // console.log(this.researcher.id)
            // resolve()
        }).catch(err=>{console.log(err);resolve([])})
          
        
    });
}

// Feed.prototype.getFeed = function getFeed(){
    
//     return new Promise((resolve, reject) => {

//         Promise.all([
//             this.get_new_projects([1000]),
//             this.get_newlyupdated_projects([1000]),
//             this.get_followed_projects([this.researcher.id, 1000]),
//             this.get_projects_from_followed_institutions([this.researcher.id, 1000]),
//             this.get_projects_from_followers([this.researcher.id, 1000])
//         ])
//         .then( (res) =>{
//             var project_arr=[]
    
//             for (let [id, project] of Object.entries(this.projects)) {
//                 project_arr.push(project)
//             }
    
//             project_arr.sort((a,b) => (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0))
            
//             resolve(project_arr.slice(0,50))
//         })
//         .catch((err)=>{
//             console.log(err)
//             reject(err)
//         })

//     });
// }

module.exports = Feed;