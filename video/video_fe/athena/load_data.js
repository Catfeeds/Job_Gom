/**
 *
 Created by zhangzhao on 2017/6/4.
 Email: zhangzhao@gomeplus.com
 */
const fs = require('fs-extra')
const _ = require('lodash');
const axios  = require('axios');
const projectObj = fs.readJsonSync('./project.json')
//console.log(projectObj) // => 2.0.0
let result = _.pickBy(projectObj, (data)=>{
    return data.git != undefined;
});
let branchArray = [];
_.mapKeys(result, (value, key)=>{
    let diskpath = value.diskPath.match(/CDN\d+/)[0];
    let branch = {
        portname: '' + value.port,
        branchtype: 'feature',
        branchname: value.branchName.trim(),
        servername: value.desc.trim(),
        diskpath: diskpath,
        projecturl: value.git
    };
    branchArray.push(branch);
});

/*branchArray.forEach(data=>{
    console.log(data);
});*/
let api = 'http://gitlab.intra.gomeplus.com/api/v3';

axios.get(api + '/projects', {
    params: {
        per_page: 100,
        access_token: 'dd2b309da8592b50b0d87ba0fa230b500045fe08d92c860ec5a15654dacb0717'
    }
}).then(data=>{
   let projects = data.data;
   let branches = branchArray.map(current=>{
        console.log('branchname...',current.branchname);
        for (let p of projects) {
            if (current.projecturl === p.http_url_to_repo) {
                current.projectid = p.id;
                current.groupid = p.namespace.id;
                break;
            }
        }
        current.envtype = "";
        return current;
   });
   //console.log(branches);

   for (let b of branches) {
       axios.post("http://localhost:8088/api/branch/createBatch", {
           params: b
       }).then(data=>{
           console.log(data.status);
       }).catch(err=>{
           console.log(err);
       })
   }
});

