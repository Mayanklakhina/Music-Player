const User = require('../models/user');

//render the sign up page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title: "MastMagan | Sign Up"
    })
}


//render the sign in page
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:"MastMagan | Sign In"
    })
}

module.exports.create=function(req,res){
    //Todo later
    //first check if the password and confirm password mathces or not
    //if not matches then redirect back to same page
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    //check if email is already present
    User.findOne({email: req.body.email},function(err,user){
        if(err){ console.log('error in finding user in signing up'); return;}
            //when user is not found
            if(!user){
                User.create(req.body,function(err,user){
                    if(err){ console.log('error in creating user while signing up'); return;}
                    return res.redirect('/users/sign-in'); 
                })
            }else{
                return res.redirect('back');
            }
    });
    
}

//get the sign in data
module.exports.createSession=function(req,res){
    //Todo later
    //steps to authenticate 
    // console.log("Hello");

    //find the user
    User.findOne({email: req.body.email},function(err,user){
        if(err){console.log("error in finding user in signing in"); return;}


    //handle user found
    if(user){
        //handle password which doesn't match
        if(user.password!=req.body.password){
            return res.redirect('back');
        }

    //handle session creation
    res.cookie('user_id',user.id);

    res.redirect('/users/profile');

    }else{
            //handle user not found
            return res.redirect('back');

    }

    });

}