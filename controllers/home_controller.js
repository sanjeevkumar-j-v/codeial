module.exports.home = function(req, res){
    // return res.end('<h1>Express is up for Codeial!</h1>')
    return res.render('home',{
        title: 'Home'
    });
}

// module.exports.play = function(req, res){
//     return res.end('<h1>This is playGround for express</h1>')
// }