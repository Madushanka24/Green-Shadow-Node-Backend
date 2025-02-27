import {Prisma, PrismaClient} from "@prisma/client";
import Staff from "../modle/Staff";
import exp = require("node:constants");

const prisma = new PrismaClient();

export async function addStaff(s: Staff){
    console.log("Adding Staff...")
    try {
        const newStaff = await prisma.staff.create({
            data: {
                staffId: s.staffId,
                firstName: s.firstName,
                lastName: s.lastName,
                designation: s.designation,
                gender: s.gender,
                joinedDate: s.joinedDate,
                dob: s.dob,
                addressLine1: s.addressLine1,
                addressLine2: s.addressLine2,
                addressLine3: s.addressLine3,
                addressLine4: s.addressLine4,
                addressLine5: s.addressLine5,
                contactNo: s.contactNo,
                email: s.email,
                role: s.role,
                staffFieldId: s.staffFieldId
            }
        })
        console.log('Staff Added store:', newStaff);
        console.log("Staff Added successfully");
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                throw new Error('A staff with this ID already exists.');
            }
        }
        throw err;
    }
}

export async function deleteStaff(id:string) {
    try{
        await prisma.staff.delete({
            where: {staffId: id}
        });
        console.log('Staff deleted :',id);
    }catch(err){
        console.log("error deleting Staff", err);
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            if(err.code === 'P2025'){
                throw new Error("The staff with this ID doesnt exists");
            }
        }
        throw err;
    }
}

export async function updateStaff(staffId: string, s: Staff){
    try{
        await prisma.staff.update({
            where:{ staffId : staffId},
            data:{
                staffId: s.staffId,
                firstName: s.firstName,
                lastName: s.lastName,
                designation: s.designation,
                gender: s.gender,
                joinedDate: s.joinedDate,
                dob: s.dob,
                addressLine1: s.addressLine1,
                addressLine2: s.addressLine2,
                addressLine3: s.addressLine3,
                addressLine4: s.addressLine4,
                addressLine5: s.addressLine5,
                contactNo: s.contactNo,
                email: s.email,
                role: s.role,
                staffFieldId: s.staffFieldId
            }
        })
        console.log("Staff updated successfully", staffId);
    }catch(err){
        console.log("error updating Staff", err);
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            if(err.code === 'P2025'){
                throw new Error("The staff with this ID doesnt exists");
            }
        }
        throw err;
    }
}

export async function getAllStaffs(){
    try{
        return await prisma.staff.findMany();
    }catch(err){
        console.log("error getting Staffs from prisma data",err);
    }
}

export async function getStaff(staffId: string){
    try{
        return await prisma.staff.findUnique({
            where: {staffId: staffId}
        })
    }catch(err){
        console.log("error getting Staff", err);
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            if(err.code === 'P2025'){
                throw new Error("The staff with this ID doesnt exists");
            }
        }
        throw err;
    }

}