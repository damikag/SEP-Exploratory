const db = require('../../db/db')
var Researcher = require('./Researcher')
var Project = require('./Project')
var Insitution = require('./Institution')
var mysql = require('mysql');

function Search(searchString){
    this.searchString=searchString
    this.pageAmount=6
}


Search.prototype.getProjects = function getProjects(index){
    var pageAmount=this.pageAmount

    return new Promise((resolve, reject) => {
        const cb = function (error, results, fields) {
            if (error) {
              reject(error);
            } else {
              resolve({res:results.slice(index,index+pageAmount),resLength:results.length})
            }
        };
        var sql= mysql.format('SELECT project.id as id,title,project.description,poster_image,first_name,last_name,profile_picture,institution.name AS institution, published_at FROM project,researcher,institution WHERE  MATCH(project.title,project.description) AGAINST(? IN NATURAL LANGUAGE MODE) AND researcher.id=project.creator AND researcher.institution=institution.id AND project.deleted_at IS NULL AND project.visibility_public=TRUE LIMIT 100000',[this.searchString])
        db.query(sql, cb);
    });
}

Search.prototype.getResearchers = function getResearchers(index){
    var pageAmount=this.pageAmount

    return new Promise((resolve, reject) => {
        const cb = function (error, results, fields) {
            if (error) {
              reject(error);
            } else {
              resolve({res:results.slice(index,index+pageAmount),resLength:results.length})
              }
        }
        var sql= mysql.format('SELECT researcher.id AS id, first_name AS first_name, last_name,profile_picture, institution.name as institution FROM researcher,institution WHERE  MATCH(first_name,last_name) AGAINST(? IN NATURAL LANGUAGE MODE) AND researcher.deleted_at IS NULL AND researcher.institution=institution.id LIMIT 25',[this.searchString])
        db.query(sql, cb);
    });
}

Search.prototype.getInstitutions = function getInstitutions(index){
  var pageAmount=this.pageAmount

    return new Promise((resolve, reject) => {
        const cb = function (error, results, fields) {
            if (error) {
              reject(error);
            } else {
              resolve({res:results.slice(index,index+pageAmount),resLength:results.length})
            }
          };
        var sql= mysql.format('SELECT id,name,display_image FROM institution WHERE  MATCH(name) AGAINST(? IN NATURAL LANGUAGE MODE) AND deleted_at IS NULL LIMIT 25',[this.searchString])
        db.query(sql, cb);
    });
}

// Search.prototype.getSearch = function getSearch(){
//   var search_result={
//     researchers:[],
//     researchersLength:0,
//     projects:[],
//     projectsLength:0,
//     institutions:[],
//     institutionsLength:0,
// }
//     return new Promise((resolve, reject) => {

//         this.getProjects(0)
//         .then( ({res,resLength}) =>{

//           search_result.projects=res
//           search_result.projectsLength=resLength

//           this.getResearchers(0)
//           .then(({res,resLength}) => {

//               search_result.researchers=res
//               search_result.researchersLength=resLength

//               this.getInstitutions(0)
//               .then(({res,resLength})=>{

//                 search_result.institutions=res
//                 search_result.institutionsLength=resLength
//                 resolve(search_result)

//               })
//               .catch((err)=>{ reject(err)})
              
//           })
//           .catch((err)=>{ reject(err)})
      
//         })
//         .catch((err)=>{
//             reject(err)
//         })

//     })
// }

module.exports = Search;