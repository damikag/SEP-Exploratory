const db = require('../../db/db')
var Researcher = require('./Researcher')
var Project = require('./Project')
var Insitution = require('./Institution')

function Search(searchString){

    this.searchString=searchString
    this.search_result={
        researchers:[],
        projects:[],
        institutions:[],
    }

}


Search.prototype.getProjects() = function getProjects(){
    
    return new Promise((resolve, reject) => {
        const cb = function (error, results, fields) {
            if (error) {
              reject(error);
            } else {
              if (results.length > 0) {
                var res_array = [];
                results.forEach(function (result, index) {
                  res_array.push(new Project(result));
                });
                this.search_result.projects=res_array
                resolve(true);
              } else {
                resolve(false);
              }
            }
          };

        db.query('SELECT id,title,description,poster_image FROM project WHERE  MATCH(title,description) AGAINST(? IN NATURAL LANGUAGE MODE) AND deleted_at IS NULL AND visibility_public=TRUE', this.searchString, cb);
    });
}

Search.prototype.getResearchers() = function getResearchers(){
    
    return new Promise((resolve, reject) => {
        const cb = function (error, results, fields) {
            if (error) {
              reject(error);
            } else {
              if (results.length > 0) {
                var res_array = [];
                results.forEach(function (result, index) {
                  res_array.push(new Researcher(result));
                });
                this.search_result.researchers=res_array
                resolve(true);
              } else {
                resolve(false);
              }
            }
          };

        db.query('SELECT researcher.id AS id, first_name AS first_name, last_name,profile_picture, institution.name as institution FROM project,institution WHERE  MATCH(title,description) AGAINST(? IN NATURAL LANGUAGE MODE) AND deleted_at IS NULL AND visibility_public=TRUE AND researcher.institution=institution.id', this.searchString, cb);
    });
}

Search.prototype.getInstitutions() = function getInstitutions(){
    
    return new Promise((resolve, reject) => {
        const cb = function (error, results, fields) {
            if (error) {
              reject(error);
            } else {
              if (results.length > 0) {
                var res_array = [];
                results.forEach(function (result, index) {
                  res_array.push(new Insitution(result));
                });
                this.search_result.institutions=res_array
                resolve(true);
              } else {
                resolve(false);
              }
            }
          };

        db.query('SELECT id,name FROM institution WHERE  MATCH(title,description) AGAINST(? IN NATURAL LANGUAGE MODE) AND deleted_at IS NULL', this.searchString, cb);
    });
}

Search.prototype.getSearch() = function getSearch(){
    
    return new Promise((resolve, reject) => {

        
        Promise.all([
            this.getProjects(),
            this.getResearchers(),
            this.getInstitutions(),
        ])
        .then( (res) =>{
            resolve(this.search_result)
        })
        .catch((err)=>{
            console.log(err)
            reject(err)
        })

    })
}

module.exports = Search;