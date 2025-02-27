import {Prisma, PrismaClient} from "@prisma/client";
import Crop from "../modle/Crop";

const prisma = new PrismaClient();

export async function addCrop(c: Crop){
    console.log("Adding Crop...")
    try{
        const newCrop  = await prisma.crop.create({
            data:{
                cropId: c.cropId,
                cropName: c.cropName,
                cropScientificName: c.cropScientificName,
                cropCategory: c.cropCategory,
                cropSeason: c.cropSeason,
                cropImage1: c.cropImage1,
                cropFieldId: c.cropFieldId
            }
        })
        console.log('Crop Added store:',newCrop)
        console.log("Crop Added successfully");
    }catch(err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                throw new Error('A crop with this ID already exists.');
            }
        }
        throw err;
    }
}

export async function deleteCrop(id:string) {
    try{
        await prisma.crop.delete({
            where: {cropId: id}
        });
        console.log('Crop deleted :',id);
    }catch(err){
        console.log("error deleting Crop", err);
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            if(err.code === 'P2025'){
                throw new Error("The crop with this ID doesnt exists");
            }
        }
        throw err;
    }
}

export async function getAllCrops(){
    try{
        return await prisma.crop.findMany();
    }catch(err){
        console.log("error getting Crops from prisma data",err);
    }
}

export async function getCrop(cropId: string){
    try{
        return await prisma.crop.findUnique({
            where: {cropId: cropId}
        })
    }catch(err){
        console.log("error getting Crop", err);
    }
}

export async function updateCrop(cropId: string, c: Crop){
    try{
        await prisma.crop.update({
            where:{ cropId : cropId},
            data:{
                cropId: c.cropId,
                cropName: c.cropName,
                cropScientificName: c.cropScientificName,
                cropCategory: c.cropCategory,
                cropSeason: c.cropSeason,
                cropImage1: c.cropImage1,
                cropFieldId: c.cropFieldId
            }
        })
        console.log("Crop updated successfully", cropId);
    }catch(err){
        console.log("error updating Crop", err);
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            if(err.code === 'P2025'){
                throw new Error("The crop with this ID doesnt exists");
            }
        }
        throw err;
    }
}