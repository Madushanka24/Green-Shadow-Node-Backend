import express from "express";
import {addField, deleteField, getAllFields, getField, updateField} from "../database/field-data-store";
import Field from "../modle/Field";
const router = express.Router();

router.post("/add", async(req, res) => {
    const field: Field = req.body;
    console.log("Received Data", field);
    try{
        const addedField = await addField(field);
        console.log(addedField);
        res.send('Field Added')
    }catch(err){
        console.log("error adding field", err);
        if (err.message === 'A field with this ID already exists.') {
            res.status(400).send(err.message);
        } else {
            res.status(500).send("An error occurred while adding the field.");
        }
    }
})

router.delete("/delete/:fieldId", async (req, res) => {
    console.log("Deleting field...");
    const id: string  = req.params.fieldId;
    try{
        await deleteField(id);
        console.log("Field with id " + id +" deleted");
        res.send('Field Deleted');
    }catch(err){
        console.log("error deleting field", err);
        if(err.message === 'The field with this ID doesnt exists'){
            res.status(404).send(err.message);
        } else {
            res.status(500).send("An error occurred while deleting the field.");
        }
    }
})


router.put("/update/:fieldId",async (req, res) => {
    console.log("Updating field...")
    const id:string = req.params.fieldId;
    const field : Field = req.body;
    try{
        await updateField(id, field);
        res.send('Field Updated');
    }catch(err){
        console.log("error updating field", err);
        if(err.message === 'The field with this ID doesnt exists'){
            res.status(404).send(err.message);
        } else {
            res.status(500).send("An error occurred while updating the field.");
        }
    }
})

router.get("/get/:fieldId", async (req, res) => {
    console.log("Fetching field...");
    const id = req.params.fieldId;
    try{
        const field = await getField(id);
        if(field === null){
            res.status(400).send('The field with this ID doesnt exists');
        }
    }catch(err){
        console.log("error getting field", err);
    }
})

router.get("/get", async (req, res) => {
    console.log("Fetching all fields");
    try{
       const fields=  await getAllFields();
       res.json(fields);
    }catch(err){
        console.log("error getting fields", err);
    }
})
export default router;