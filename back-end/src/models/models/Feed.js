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

}

Feed.prototype.get_new_projects = function get_new_projects(params){
  
    return new Promise((resolve, reject) => {
        const cb = function(error, results, fields){
            if (error){
                reject(error);
            }
            else{
                if(results.length > 0){
                    var tmpProject= new Project()
                    
                    results.forEach(function(result, index){
                        
                        id=result.id
                        if( this.projects.hasOwnProperty(id)){
                            this.projects.id.score= this.projects.id.score + this.scores.newProject
                        }
                        else{
                            tmpProject.find_by_id(id)
                            .then(async (result) =>{
                                
                                if(!(this.projects.hasOwnProperty(id))){
                                    this.projects[id]=result
                                    this.projects.id[score]=0
                                }
                                this.projects.id.score= this.projects.id.score + this.scores.newProject
                            })
                            .catch((err)=>{
                                console.log(err)
                                continue
                            })
                        }
                    })
                    resolve();
                } else {
                    resolve(false);
                }
            }
        }
        db.call_proc('get_new_projects', params, cb);
    });
}

Feed.prototype.get_newlyupdated_projects = function get_newlyupdated_projects(params){
  
    return new Promise((resolve, reject) => {
        const cb = function(error, results, fields){
            if (error){
                reject(error);
            }
            else{
                if(results.length > 0){
                    var tmpProject= new Project()
                    
                    results.forEach(function(result, index){
                        
                        id=result.id
                        if( this.projects.hasOwnProperty(id)){
                            this.projects.id.score= this.projects.id.score + this.scores.updateProject
                        }
                        else{
                            tmpProject.find_by_id(id)
                            .then(async (result) =>{
                                
                                if(!(this.projects.hasOwnProperty(id))){
                                    this.projects[id]=result
                                    this.projects.id[score]=0
                                }
                                this.projects.id.score= this.projects.id.score + this.scores.updateProject
                            })
                            .catch((err)=>{
                                console.log(err)
                                continue
                            })
                        }
                    })
                    resolve();
                } else {
                    resolve(false);
                }
            }
        }
        db.call_proc('get_newlyupdated_projects', params, cb);
    });
}

Feed.prototype.get_followed_projects = function get_followed_projects(params){
  
    return new Promise((resolve, reject) => {
        const cb = function(error, results, fields){
            if (error){
                reject(error);
            }
            else{
                if(results.length > 0){
                    var tmpProject= new Project()
                    
                    results.forEach(function(result, index){
                        
                        id=result.id
                        if( this.projects.hasOwnProperty(id)){
                            this.projects.id.score= this.projects.id.score + this.scores.updateFollow
                        }
                        else{
                            tmpProject.find_by_id(id)
                            .then(async (result) =>{
                                
                                if(!(this.projects.hasOwnProperty(id))){
                                    this.projects[id]=result
                                    this.projects.id[score]=0
                                }
                                this.projects.id.score= this.projects.id.score + this.scores.updateFollow
                            })
                            .catch((err)=>{
                                console.log(err)
                                continue
                            })
                        }
                    })
                    resolve();
                } else {
                    resolve(false);
                }
            }
        }
        db.call_proc('get_followed_projects', params, cb);
    });
}


Feed.prototype.get_projects_from_followed_institutions = function get_projects_from_followed_institutions(params){
  
    return new Promise((resolve, reject) => {
        const cb = function(error, results, fields){
            if (error){
                reject(error);
            }
            else{
                if(results.length > 0){
                    var tmpProject= new Project()
                    
                    results.forEach(function(result, index){
                        
                        id=result.id
                        if( this.projects.hasOwnProperty(id)){
                            this.projects.id.score= this.projects.id.score + this.scores.institution
                        }
                        else{
                            tmpProject.find_by_id(id)
                            .then(async (result) =>{
                                
                                if(!(this.projects.hasOwnProperty(id))){
                                    this.projects[id]=result
                                    this.projects.id[score]=0
                                }
                                this.projects.id.score= this.projects.id.score + this.scores.institution
                            })
                            .catch((err)=>{
                                console.log(err)
                                continue
                            })
                        }
                    })
                    resolve();
                } else {
                    resolve(false);
                }
            }
        }
        db.call_proc('get_projects_from_followed_institutions', params, cb);
    });
}


Feed.prototype.get_projects_from_followers = function get_projects_from_followers(params){
  
    return new Promise((resolve, reject) => {
        const cb = function(error, results, fields){
            if (error){
                reject(error);
            }
            else{
                if(results.length > 0){
                    var tmpProject= new Project()
                    
                    results.forEach(function(result, index){
                        
                        id=result.id
                        if( this.projects.hasOwnProperty(id)){
                            this.projects.id.score= this.projects.id.score + this.scores.follower
                        }
                        else{
                            tmpProject.find_by_id(id)
                            .then(async (result) =>{
                                
                                if(!(this.projects.hasOwnProperty(id))){
                                    this.projects[id]=result
                                    this.projects.id[score]=0
                                }
                                this.projects.id.score= this.projects.id.score + this.scores.follower
                            })
                            .catch((err)=>{
                                console.log(err)
                                continue
                            })
                        }
                    })
                    resolve();
                } else {
                    resolve(false);
                }
            }
        }
        db.call_proc('get_projects_from_followers', params, cb);
    });
}
Feed.prototype.getFeed() = function getFeed(){
    
    return new Promise((resolve, reject) => {

        Promise.all([
            this.get_new_projects([1000]),
            this.get_newlyupdated_projects([1000]),
            this.get_followed_projects([this.researcher.id, 1000]),
            this.get_projects_from_followed_institutions([this.researcher.id, 1000]),
            this.get_projects_from_followers([this.researcher.id, 1000])
        ])
        .then( (res) =>{
            var project_arr=[]
    
            for (let [id, project] of Object.entries(this.projects)) {
                project_arr.push(project)
            }
    
            project_arr.sort((a,b) => (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0))
            
            resolve(project_arr.slice(0,50))
        })
        .catch((err)=>{
            console.log(err)
            reject(err)
        })

    })
}

module.exports = Feed;