import User from "../models/user.js";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../services/auth.js";

async function handleUserSignUp(req,res) {
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password,
    })
    return res.redirect('/')
}
async function handleUserLogin(req,res) {
    const {email, password} = req.body;
    const user =await User.findOne({email, password});
    if(!user) {
        return res.status(400).json({error: "Invalid email or password"});
    }
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie('uid', sessionId)

    return res.redirect('/')
}
export { handleUserSignUp,handleUserLogin };
