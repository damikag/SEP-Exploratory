const db = require("../../db/db");
var Researcher = require("./Researcher");
var Project = require("./Project");
var mysql = require("mysql");

function Feed(email) {
  this.email = email;
  this.projects = {};
  var tmpResearcher = new Researcher();
  tmpResearcher.find_by_email(email).then((user) => {
    this.researcher = user;
  });
  this.scores = {
    newProject: 2,
    updateProject: 1,
    updateFollow: 6,
    institution: 3,
    follower: 4,
  };
}

Feed.prototype.automate = function automate(procedure, params, scoreAddition) {
  return new Promise((resolve, reject) => {
    var projects = this.projects;

    const cb = async function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        if (results[0].length > 0) {
          var tmpProject = new Project();

          results[0].forEach(function (result, index) {
            var id = result.id;
            if (projects.hasOwnProperty(id)) {
              projects[id] += scoreAddition;
            } else {
              projects[id] = scoreAddition;
            }
          });
          resolve();
        } else {
          resolve();
        }
      }
    };
    db.call_proc(procedure, params, cb);
  });
};

Feed.prototype.get_new_projects = function get_new_projects(params) {
  return this.automate("get_new_projects", params, this.scores.newProject);
};

Feed.prototype.get_newlyupdated_projects = function get_newlyupdated_projects(
  params
) {
  return this.automate(
    "get_newlyupdated_projects",
    params,
    this.scores.updateProject
  );
};

Feed.prototype.get_followed_projects = function get_followed_projects(params) {
  return this.automate(
    "get_followed_projects",
    params,
    this.scores.updateFollow
  );
};

// Bug in the procedure
// Feed.prototype.get_projects_from_followed_institutions = function get_projects_from_followed_institutions(params){
//     return this.automate('get_projects_from_followed_institutions',params,this.scores.institution)
// }

Feed.prototype.get_projects_from_followers = function get_projects_from_followers(
  params
) {
  return this.automate(
    "get_projects_from_followers",
    params,
    this.scores.follower
  );
};

const refineFeed = (projects, index) => {
  return new Promise(async (resolve, reject) => {
    var projectArr = [];
    for (let [id, score] of Object.entries(projects)) {
      projectArr.push({
        id: id,
        score: score,
      });
    }
    await projectArr.sort((a, b) =>
      a.score > b.score ? -1 : b.score > a.score ? 1 : 0
    );

    if (index + 5 > projectArr.length) {
      // resolve([]);
      projectArr = projectArr.slice(index);
    }
    else{
      projectArr = projectArr.slice(index, index + 5);
    }

    

    var resultArr = [];
    var promiseArr = [];

    await projectArr.forEach(({ id, score }) => {
      promiseArr.push(
        new Promise((resolve2, reject2) => {
          var sql = mysql.format(
            "SELECT project.id, project.title, project.description,poster_image, first_name,last_name,institution.name as institution, profile_picture,project.published_at FROM project,institution,researcher WHERE project.id=? AND project.creator=researcher.id AND researcher.institution=institution.id",
            [id]
          );
          db.query(sql, (error, results, fields) => {
            if (error) {
              resolve2();
            } else {
              resultArr.push(Object.assign({ score: score }, results[0]));
              resolve2();
            }
          });
        })
      );
    });

    Promise.all(promiseArr)
      .then(async () => {
        await resultArr.sort((a, b) =>
          a.score > b.score ? -1 : b.score > a.score ? 1 : 0
        );
        // console.log(resultArr)

        var promiseArrLoadImg = []
        resultArr.forEach((project, ind) => {
          // console.log(project.id)

          promiseArrLoadImg.push(
            new Promise((resolve3, reject3) => {
              var sql = mysql.format(
                "SELECT url FROM image WHERE project_id=? AND deleted_at IS NULL;",
                [project.id]
              );
              db.query(sql, (error, results, fields) => {
                if (error) {
                  resolve3();
                } else {
                  // resultArr.push(Object.assign({ score: score }, results[0]));
                  var imgArr = []
                  results.forEach(img => {
                    imgArr.push(process.env.BACK_END+":"+process.env.PORT+"/related_images/"+ img.url)
                  })
                  resultArr[ind].poster_image = imgArr
                  resolve3();
                }
              });
            })
          );


        })

        Promise.all(promiseArrLoadImg)
          .then(() => {
            resolve(resultArr)
          })
          .catch(err => {
            resolve(resultArr)
          })
        // resolve(resultArr);
      })
      .catch((err) => {
        console.log(err);
        resolve([]);
      });
  });
};

Feed.prototype.getFeed = function getFeed(index) {
  return new Promise((resolve, reject) => {
    this.get_new_projects([1000])
      .then(() => {
        this.get_newlyupdated_projects([1000])
          .then(() => {
            this.get_followed_projects([this.researcher.id, 1000])
              .then(() => {
                this.get_projects_from_followers([this.researcher.id, 1000])
                  .then(() => {
                    refineFeed(this.projects, index)
                      .then((resArr) => {
                        resolve(resArr);
                      })
                      .catch((err) => {
                        resolve([]);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                    resolve([]);
                  });
              })
              .catch((err) => {
                console.log(err);
                resolve([]);
              });
          })
          .catch((err) => {
            console.log(err);
            resolve([]);
          });
      })
      .catch((err) => {
        console.log(err);
        resolve([]);
      });
  });
};

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
