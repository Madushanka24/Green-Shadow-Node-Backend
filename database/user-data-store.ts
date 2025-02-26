import { PrismaClient } from "@prisma/client";
import {User} from "../model/User";
import bcrypt from "bcrypt";

const prisma = new  PrismaClient();

export async function createUser(user: User){
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const addUser = await prisma.user.create({
        data: {
            username: user.username,
            password: hashedPassword
        }
    });
    console.log('User Added :',addUser);
}

export async function verifyUser(verifyUser: User) {
    const user : User | null = await prisma.user.findUnique({
        where: { username: verifyUser.username }, // Use the username as the unique identifier to find the relevant user
    });
    if (!user) { // If the user doesn't exist
        return false;
    }
    return await bcrypt.compare(verifyUser.password, user.password); // Compare the provided password with the stored hashed password
}