import express from "express";
import {addCrop, deleteCrop, getAllCrops, getCrop, updateCrop} from "../database/crop-data-store";
import Crop from "../modle/Crop";
const router = express.Router();

router.post("/add", async(req, res) => {
    const crop: Crop = req.body;
    console.log("Received Data", crop);
    try{
        const addedCrop = await addCrop(crop);
        console.log(addedCrop);
        res.send('Crop Added')
    }catch(err){
        console.log("error adding crop", err);
        if (err.message === 'A crop with this ID already exists.') {
            res.status(400).send(err.message);
        } else {
            res.status(500).send("An error occurred while adding the crop.");
        }
    }
})

router.delete("/delete/:cropId", async (req, res) => {
    console.log("Deleting crop...");
    const id: string  = req.params.cropId;
    try{
        await deleteCrop(id);
        console.log("Crop with id " + id +" deleted");
        res.send('Crop Deleted');
    }catch(err){
        console.log("error deleting crop", err);
        if(err.message === 'The crop with this ID doesnt exists'){
            res.status(404).send(err.message);
        } else {
            res.status(500).send("An error occurred while deleting the crop.");
        }
    }
})


router.put("/update/:cropId",async (req, res) => {
    console.log("Updating crop...")
    const id:string = req.params.cropId;
    const crop : Crop = req.body;
    try{
        await updateCrop(id, crop);
        res.send('Crop Updated');
    }catch(err){
        console.log("error updating crop", err);
        if(err.message === 'The crop with this ID doesnt exists'){
            res.status(404).send(err.message);
        } else {
            res.status(500).send("An error occurred while updating the crop.");
        }
    }
})

router.get("/get/:cropId", async (req, res) => {
    console.log("Fetching crop...");
    const id = req.params.cropId;
    try{
        const crop = await getCrop(id);
        if(crop === null){
            res.status(404).send('The crop with this ID doesnt exists');
        }
    }catch(err){
        console.log("error getting crop", err);
    }
})

router.get("/get", async (req, res) => {
    console.log("Fetching all crops");
    try{
       const crops=  await getAllCrops();
       res.json(crops);
    }catch(err){
        console.log("error getting crops", err);
    }
})
export default router;