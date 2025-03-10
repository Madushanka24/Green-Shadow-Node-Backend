import jwt, {Secret} from 'jsonwebtoken';
import dotenv from 'dotenv';
import express from "express";
import {User} from "../modle/User";
import {createUser, verifyUser} from "../database/user-data-store";

dotenv.config();

const router = express.Router();

router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user : User = {username, password};

    try {
        const isVerified = await verifyUser(user);
        if(isVerified){
            const token = jwt.sign({username}, process.env.SECRET_KEY as Secret, {expiresIn: "7d"})
            const refreshToken = jwt.sign({username}, process.env.REFRESH_TOKEN as Secret, {expiresIn: "7d"})
            res.json({
                accessToken: token,
                refreshToken: refreshToken
            })
        }else {
            res.sendStatus(403).send('Invalid credentials');
        }
    }catch (error){
        console.error(error);
    }
})

router.post("/register", async (req, res) => {
    console.log('Register', req.body);

    const { username, password } = req.body;

    if (!username || !password) {
        console.log("User not given");
    }

    const user : User = {username, password};

    try{
        const registration = await createUser(user);
        res.status(201).json(registration);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
})

router.post("/refresh-token", async (req, res) => {
    const authHeader = req.headers.authorization;
    const refreshToken = authHeader?.split(' ')[1];

    if(!refreshToken)res.status(401).send('No token provided');
    try{
        const payload = jwt.verify(refreshToken as string, process.env.REFRESH_TOKEN as Secret) as {username: string, iat: number};
        const token = jwt.sign({ username: payload.username }, process.env.SECRET_KEY as Secret, {expiresIn: "1m"});
        res.json({accessToken : token});
    }catch(err){
        console.log(err);
        res.status(401).json(err);
    }
})

export function authenticateToken(req : express.Request, res : express.Response, next : express.NextFunction){
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    console.log(token);
    if(!token)res.status(401).send('No token provided');
    try{
        const payload = jwt.verify(token as string, process.env.SECRET_KEY as Secret) as {username: string, iat: number};
        console.log(payload.username);
        req.body.username = payload.username;
        next();
    }catch(error){
        res.status(401).send(error);
    }
}

export default router;