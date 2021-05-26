const User = require("../model/User");

exports.registerNewUser = async (req, res) => {
    try {
        const isUser = await User.findOne({
            $or: [{
                email: req.body.email
            }, {
                name: req.body.name
            }]
        })
        if (isUser) {
            let errors = {};
            if (isUser.name === req.body.name) {
                errors.name = "User Name already exists";
            } else {
                errors.email = "Email already exists";
            }
            console.log(errors)
            return res.status(400).json(errors);
        } else {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            let data = await user.save();
            const token = await user.generateAuthToken(); // here it is calling the method that we created in the model
            res.status(201).json({ data, token });
        }
    } catch (err) {
        //     console.log({"yy_error": err });
        //   };
        res.status(400).json({ err: err });
    }
};

exports.loginUser = async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await User.findByCredentials(email, password);
      if (!user) {
        return res.status(401).json({ error: "Login failed! Check authentication credentials" });
      }
      const token = await user.generateAuthToken();
      res.status(201).json({ user, token });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  };
  exports.getUserDetails = async (req, res) => {
    await res.json(req.userData);
  };