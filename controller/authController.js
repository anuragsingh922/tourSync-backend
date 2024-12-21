const jwt = require("jsonwebtoken");
const { jwt_secret, jwt_secret_refresh, node_env } = require("../config.js");
const refreshToken = require("../models/refreshToken.js");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel.js");
const { badRequest } = require("../response/badRequest.js");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      !email ||
      !password ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.send({ message: "Something went wrong. Try again later!" });
    }
    const user = await User.findOneAndUpdate(
      { email: email }, // Filter to find the user
      { $inc: { session_count: 1 } }, // Increment the session_count by 1
      { new: true } // Option to return the updated document
    );
    if (user) {
      const pass = await bcrypt.compare(password, user.password);
      if (pass) {
        const token = jwt.sign(
          { name: user?.name, email: user?.email, role: user?.role },
          jwt_secret,
          {
            expiresIn: 60 * 60 * 24,
          }
        );
        const refresh_token = jwt.sign(
          { name: user?.name, email: user?.email, role: user?.role },
          jwt_secret_refresh,
          {
            expiresIn: 7 * 60 * 60 * 24,
          }
        );

        await refreshToken.findOneAndDelete({ email: email });

        const newrefreshToken = new refreshToken({
          refresh_token: refresh_token,
          access_token: token,
          email: email,
        });

        await newrefreshToken.save();

        console.log(
          node_env,
          node_env === "prod" ? "tour-sync-frontend.vercel.app" : "localhost"
        );

        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          domain:
            node_env === "prod" ? "tour-sync-frontend.vercel.app" : "localhost",
          path: "/",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        const u = {
          name: user?.name,
          email: user?.email,
          role: user?.role,
        };

        return res.send({
          message: "Login in successfully!",
          success: true,
          data: u,
        });
      } else {
        return res.send({ message: "Incorrect Email or Password!" });
      }
    } else {
      return res.send({ message: "Incorrect Email or Password!" });
    }
  } catch (err) {
    console.error(err.message);
    return res.send({ message: "Something went wrong. Try again later!" });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        error: "Email is already registered.",
      });
    }
    const hashedpass = await bcrypt.hash(password, 12);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedpass,
    });

    user = await newUser.save();
    if (user) {
      return res.status(200).send({
        message: "Signed up successfully!",
        success: true,
        data: "",
      });
    } else {
      return res.status(500).send({
        message: "Something went wrong. Try again later!",
        success: false,
        data: "",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "Something went wrong. Try again later!",
      success: false,
      data: "",
    });
  }
};

const registerWithImage = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;
    const file = req?.file;

    if (!name || !email || !password || !username || !file) {
      return res.status(200).json(badRequest);
    }
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        success: false,
        error: "Already registered.",
      });
    }
    const hashedpass = await bcrypt.hash(password, 12);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedpass,
      username: username,
      profileIMG: file,
    });

    user = await newUser.save();
    if (user) {
      const token = jwt.sign(
        { username: user.username, name: user.name },
        jwt_secret,
        {
          expiresIn: 30 * 24 * 60 * 60, // 30 days
        }
      );
      res.send({
        message: "Signed up successfully!",
        success: true,
        user,
        token,
      });
    } else {
      res
        .status(500)
        .send({ message: "Something went wrong. Try again later!" });
      console.error(err);
    }
  } catch (err) {
    res.status(500).send({ message: "Something went wrong. Try again later!" });
    console.error(err);
  }
};

const verify = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        data: "",
        message: "Token not present",
      });
    }

    jwt.verify(token, jwt_secret, async (err, data) => {
      if (err) {
        console.error("Error in JWT Verification.");
        await refreshToken.findOneAndDelete({ refresh_token: token });
        if (err.name === "TokenExpiredError") {
          console.error("Token has expired.");

          const refresh_token = await refreshToken.findOne({
            access_token: token,
          });

          jwt.verify(
            refresh_token?.refresh_token,
            jwt_secret_refresh,
            async (err, data) => {
              if (err) {
                console.error("Error in refresh token");
                return res
                  .status(401)
                  .json({ status: "failed", error: "Token expired" });
              } else {
                if (!data?.email) {
                  return res.status(400).send("Token Tempered.");
                }

                const user = {
                  name: data?.name,
                  email: data?.email,
                  role: data?.role,
                };

                const token = jwt.sign(user, jwt_secret, {
                  expiresIn: 60 * 60 * 24,
                });

                refresh_token.access_token = token;
                await refresh_token.save();

                res.cookie("token", token, {
                  httpOnly: true, // Helps prevent XSS attacks
                  secure: true, // Use `true` in production for HTTPS
                  sameSite: "None",
                  domain:
                    node_env === "prod"
                      ? "tour-sync-frontend.vercel.app"
                      : "localhost",
                  path: "/",
                  maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration in milliseconds (1 hour here)
                });
                return res.status(200).json({
                  success: true,
                  message: "verify successfully",
                  data: user,
                });
              }
            }
          );
        } else {
          return res.status(401).json({ status: "failed", err: err });
        }
      } else {
        if (!data?.email) {
          return res.status(400).send("Token Tempered.");
        }
        const user = {
          name: data?.name,
          email: data?.email,
          role: data?.role,
        };
        if (user) {
          return res.status(200).json({
            success: true,
            message: "verify successfully",
            data: user,
          });
        }
      }
    });
  } catch (err) {
    console.error("Error in verify", err);
    return res
      .status(401)
      .json({ message: "Something went wrong. Try again later!" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      path: "/",
      domain:
        node_env === "prod" ? "tour-sync-frontend.vercel.app" : "localhost",
    });
    return res.status(200).json({ message: "Logout successfully." });
  } catch (error) {
    console.error("Error in logout removing the cookies : ", error);
  }
};

module.exports = {
  login,
  logout,
  register,
  verify,
  registerWithImage,
};
