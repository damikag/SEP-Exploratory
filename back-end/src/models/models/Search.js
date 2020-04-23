const db = require('../../db/db')
var Researcher = require('./Researcher')
var Project = require('./Project')
var Insitution = require('./Institution')
var mysql = require('mysql');

function Search(searchString){
    this.searchString=searchString
}


Search.prototype.getProjects = function getProjects(){
    
    return new Promise((resolve, reject) => {
        const cb = function (error, results, fields) {
            if (error) {
              reject(error);
            } else {
              resolve(results)
            }
        };
        var sql= mysql.format('SELECT id,title,description,poster_image FROM project WHERE  MATCH(title,description) AGAINST(? IN NATURAL LANGUAGE MODE) AND project.deleted_at IS NULL AND project.visibility_public=TRUE',[this.searchString])
        db.query(sql, cb);
    });
}

Search.prototype.getResearchers = function getResearchers(){
    
    return new Promise((resolve, reject) => {
        const cb = function (error, results, fields) {
            if (error) {
              reject(error);
            } else {
              resolve(results)
              }
        }
        var sql= mysql.format('SELECT researcher.id AS id, first_name AS first_name, last_name,profile_picture, institution.name as institution FROM researcher,institution WHERE  MATCH(first_name,last_name) AGAINST(? IN NATURAL LANGUAGE MODE) AND researcher.deleted_at IS NULL AND researcher.institution=institution.id',[this.searchString])
        db.query(sql, cb);
    });
}

Search.prototype.getInstitutions = function getInstitutions(){
    
    return new Promise((resolve, reject) => {
        const cb = function (error, results, fields) {
            if (error) {
              reject(error);
            } else {
              resolve(results)
            }
          };
        var sql= mysql.format('SELECT id,name,display_image FROM institution WHERE  MATCH(name) AGAINST(? IN NATURAL LANGUAGE MODE) AND deleted_at IS NULL',[this.searchString])
        db.query(sql, cb);
    });
}

Search.prototype.getSearch = function getSearch(){
  var search_result={
    researchers:[],
    projects:[],
    institutions:[],
}
    return new Promise((resolve, reject) => {

        this.getProjects()
        .then( (res) =>{

          search_result.projects=res

          this.getResearchers()
          .then((res2) => {

              search_result.researchers=res2;
              
              this.getInstitutions()
              .then((res3)=>{

                search_result.institutions=res3
                resolve(search_result)

              })
              .catch((err)=>{ reject(err)})
              
          })
          .catch((err)=>{ reject(err)})
      
        })
        .catch((err)=>{
            reject(err)
        })

    })
}

module.exports = Search;