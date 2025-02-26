import {addStaff, deleteStaff, getAllStaffs, getStaff, updateStaff} from "../database/staff-data-store";
import Staff from "../model/Staff";
import express from "express";
const router = express.Router();

router.post("/add", async(req, res) => {
    const staff: Staff = req.body;

    console.log("Received Data", staff);
    try{
        const addedStaff = await addStaff(staff);
        console.log(addedStaff);
        res.send('Staff Added')
    }catch(err: any){
        console.log("error adding staff\n", err);
        if (err.message === 'A staff with this ID already exists.') {
            res.status(400).send(err.message);
        } else {
            res.status(500).send("An error occurred while adding the staff.");
        }
    }
})

router.delete("/delete/:staffId", async (req, res) => {
    console.log("Deleting staff...");
    const id: string  = req.params.staffId;
    try{
        await deleteStaff(id);
        res.send('Staff Deleted');
    }catch(err: any){
        console.log("error deleting staff", err);
        if(err.message === 'The staff with this ID doesnt exists'){
            res.status(404).send(err.message);
        } else {
            res.status(500).send("An error occurred while deleting the staff.");
        }
    }
})


router.put("/update/:staffId",async (req, res) => {
    console.log("Updating staff...")
    const id:string = req.params.staffId;
    const staff : Staff = req.body;
    try{
        await updateStaff(id, staff);
        res.send('Staff Updated');
    }catch(err: any){
        console.log("error updating staff", err);
        if(err.message === 'The staff with this ID doesnt exists'){
            res.status(404).send(err.message);
        } else {
            res.status(500).send("An error occurred while updating the staff.");
        }
    }
})

router.get("/get/:staffId", async (req, res) => {
    console.log("Fetching staff...");
    const id = req.params.staffId;
    try{
        const staff = await getStaff(id);
        if(staff === null){
            res.status(400).send('The staff with this ID doesnt exists');
        }
    }catch(err){
        console.log("error getting staff", err);
    }
})

router.get("/get", async (req, res) => {
    console.log("Fetching all staffs");
    try{
       const staffs=  await getAllStaffs();
       res.json(staffs);
    }catch(err){
        console.log("error getting staffs", err);
    }
})
export default router;