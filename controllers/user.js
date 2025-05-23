const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        const newUser = new User({ firstName, lastName, username, email });

        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", `Welcome to EscapeNest!`);
            res.redirect("/listings");
        });
    } catch (err) {
        if (err.name === "UserExistsError") {
            req.flash("error", err.message);
            res.redirect("/signup");
        } else {
            next(err);
        }
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success", "You are logged in!");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You're logged out!");
        res.redirect("/listings");
    });
};

module.exports.showProfile = (req, res) => {
    const user = req.user;
    res.render("users/showProfile.ejs", { user });
};

module.exports.editProfile = (req, res) => {
    const user = req.user;
    res.render("users/editProfile.ejs", { user });
};

module.exports.updateProfile = async (req, res) => {
    const user = req.user;
    await User.findByIdAndUpdate(req.user._id, req.body);
    res.redirect("/profile");
};