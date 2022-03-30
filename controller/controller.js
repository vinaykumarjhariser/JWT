exports.signup = async (req, res, next) => {
    // console.log(req.userData);
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    if (password !== confirmpassword) {
        res.json({
            msg: "Password Not Matched!"
        })
    } else {
        bcrypt.hash(password, 10, function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                return res.json({
                    result: "Something went Wrong",
                    error: err
                })
            } else {
                const userDeatils = new JWT({
                    _id: new mongoose.Types.ObjectId(),
                    username: username,
                    email: email,
                    password: hash,
                })
                userDeatils.save()
                    .then(function (doc) {
                        res.status(201).json({
                            msg: "User Registered Sucessfully",
                            result: doc
                        })
                    }).catch(function (err) {
                        res.json(err)
                    })
            }
        });
    }
}

exports.signin = function (req, res, next) {
    res.json(req.userData);

    let email = req.body.email;
    let password = req.body.password;
    JWT.find({
            email: email
        })
        .exec()
        .then(function (user) {
            if (user.length < 1) {
                res.json("Authantication Failed")
            } else {
                bcrypt.compare(password, user[0].password, function (err, result) {
                    if (result) {
                        const token = jwt.sign({
                            email: user[0].email,
                            username: user[0].username
                        }, '0123456789', {
                            expiresIn: "1h"
                        });

                        res.status(200).json({
                            message: "User found",
                            token: token
                        })
                    } else {
                        res.json("Authantication Failed");
                    }
                });

            }
        })
        .catch(function (err) {
            res.json({
                err: err
            })
        })
}