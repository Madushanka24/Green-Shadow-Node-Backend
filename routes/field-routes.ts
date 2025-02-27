import {addField, deleteField, getAllFields, getField, updateField} from "../database/field-data-store";
import Field from "../modle/Field";
import Express from "express";
import {upload} from "../libraries/MulterConfig";
// @ts-ignore

const router = express.Router();


router.post("/add", upload.fields([{ name: 'fieldImage1', maxCount: 1 }, { name: 'fieldImage2', maxCount: 1 },]), async(req, res) => {
    const field: Field = req.body;
    // Access uploaded files
    const files = req.files as { [fieldName: string]: Express.Multer.File[] };
    const img1 = files['fieldImage1']?.[0]?.buffer.toString('base64'); // Convert to base64
    const img2 = files['fieldImage2']?.[0]?.buffer.toString('base64'); // Convert to base64

    // Add image data to the fields object
    field.fieldImage1 = img1 || '';
    field.fieldImage2 = img2 || '';
    console.log("Received Data", field);
    try{
        const addedField = await addField(field);
        console.log(addedField);
        res.send('Field Added')
    }catch(err: any){
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
    }catch(err: any){
        console.log("error deleting field", err);
        if(err.message === 'The field with this ID doesnt exists'){
            res.status(404).send(err.message);
        } else {
            res.status(500).send("An error occurred while deleting the field.");
        }
    }
})


router.put("/update/:fieldId", upload.fields([{ name: 'fieldImage1', maxCount: 1 }, { name: 'fieldImage2', maxCount: 1 },]), async (req, res) => {

    console.log("Updating field...")
    const id:string = req.params.fieldId;
    const field : Field = req.body;

    const files = req.files as { [fieldName: string]: Express.Multer.File[] };
    const img1 = files['fieldImage1']?.[0]?.buffer.toString('base64'); // Convert to base64
    const img2 = files['fieldImage2']?.[0]?.buffer.toString('base64'); // Convert to base64

    // Add image data to the fields object
    field.fieldImage1 = img1 || '';
    field.fieldImage2 = img2 || '';
    console.log("Received Data", field);
    try{
        await updateField(id, field);
        res.send('Field Updated');
    }catch(err: any){
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

router.get("/get", async (req, res) => {
    console.log("Fetching all field IDs");
    try{
        const fields=  await getAllFields();
        res.json(fields);
    }catch(err){
        console.log("error getting fields", err);
    }
})

export default router;