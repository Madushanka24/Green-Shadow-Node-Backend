import { Prisma, PrismaClient } from '@prisma/client';
import Field from '../modle/Field';

const prisma = new PrismaClient();


export async function addField(f: Field){
    console.log("Adding Field...")
    try{
        const newField  = await prisma.field.create({
            data:{
                fieldId: f.fieldId,
                fieldName: f.fieldName,
                fieldExtent: f.fieldExtent,
                fieldLocation: f.fieldLocation,
                fieldImage1: f.fieldImage1,
                fieldImage2: f.fieldImage2
            }
        })
        console.log('Field Added store:',newField)
        console.log("Field Added successfully");
    }catch(err:any) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                throw new Error('A field with this ID already exists.');
            }
        }
        throw err;
    }
}

export async function deleteField(id:string) {
    try{
        await prisma.field.delete({
            where: {fieldId: id}
        });
        console.log('Field deleted :',id);
    }catch(err){
        console.log("error deleting Field", err);
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            if(err.code === 'P2025'){
                throw new Error("The field with this ID doesnt exists");
            }
        }
        throw err;
    }
}

export async function getAllFields(){
    try{
        return await prisma.field.findMany();
    }catch(err){
        console.log("error getting Fields from prisma data",err);
    }
}

export async function getField(fieldId: string){
    try{
        return await prisma.field.findUnique({
            where: {fieldId: fieldId}
        })
    }catch(err){
        console.log("error getting Field", err);
    }
}

export async function updateField(fieldId: string, f: Field){
    try{
        await prisma.field.update({
            where:{ fieldId : fieldId},
            data:{
                fieldId: f.fieldId,
                fieldName: f.fieldName,
                fieldExtent: f.fieldExtent,
                fieldLocation: f.fieldLocation,
                fieldImage1: f.fieldImage1,
                fieldImage2: f.fieldImage2
            }
        })
        console.log("Field updated successfully", fieldId);
    }catch(err){
        console.log("error updating Field", err);
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            if(err.code === 'P2025'){
                throw new Error("The field with this ID doesnt exists");
            }
        }
        throw err;
    }
}