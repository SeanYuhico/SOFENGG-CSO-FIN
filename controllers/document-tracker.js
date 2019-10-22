// const tracker = require("../models/document-tracker.js");

// function RetrieveOrgData(req, res){
//     console.log("RetrieveOrgData");
//     let org = req.body.org;
//     let user = {
//         promisify : req.session.promisify,
//         creds : req.session.credential,
//         doc : req.session.document,
//         organization : org
//     }

//     console.log(req.session.promisify);
//     console.log(req.session.credential);
//     console.log(req.session.document);

//     tracker.accessSpreadsheet(user, (data)=>{
//         if(data != null){
//             req.session.data = data;
//             res.render("documentTracker.hbs", {
//                 Header : data,
//                 Organization : req.session.Organization 
//             })
//         }else{
//             res.render("404.hbs", {
//                 org : req.session.organization
//             })
//         }
//     })
// }

// module.exports = {
//     RetrieveOrgData
// }

