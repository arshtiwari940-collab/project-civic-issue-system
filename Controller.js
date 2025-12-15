import ComplaintModel from './ComplaintModel.js';
import express from "express"
// import bcrypt from 'bcryptjs';

const router = express.Router();




router.post('/complaint', async (req, res) => {
    try {
        const { name, phone, email, category, address, details } = req.body

        // Function to generate unique 4-digit numbers
        function createUniqueNumberGenerator() {
            const usedNumbers = new Set();

            return function () {
                if (usedNumbers.size >= 9000) {
                    throw new Error("All unique 4-digit numbers are used!");
                }

                let num;
                do {
                    num = Math.floor(1000 + Math.random() * 9000); // generates between 1000–9999
                } while (usedNumbers.has(num));

                usedNumbers.add(num);
                return num;
            };
        }

        // Usage:
        const getUniqueNumber = createUniqueNumberGenerator();
        const complaint_id = getUniqueNumber();

        const user = await ComplaintModel.create({
            name,
            number: phone,
            email,
            Complaints: {
                complaint_id: complaint_id,
                status: "Under Review",
                IssueCatagory: category,
                photo: "Loding...",
                description: details,
                location: address
            }

        })

        res.status(201).json({
            msg: "Complaint Registerd",

        })

    } catch (error) {
        res.status(500).json({
            msg: "Somthing Went Wrong!! @",
            error
        })
        console.log(error);

    }

})


router.post("/track", async (req, res) => {
    try {
        const { mobile, complaintId } = req.body
        console.log(req.body);

        const find = await ComplaintModel.findOne({ number: mobile })
        console.log(find, "find complaint")

        if (find === null) {
            res.json({
                msg: "Invalid Number or Complaint id"
            })
            console.log("not found");

        } else {
            res.status(200).json({
                msg: "Complaint Found",
                find
            })
            console.log("found");

        }

    } catch (error) {
        res.status(500).json(
            {
                msg: "Somthing went wrong!!"
            }
        )
        console.log(error);

    }
})

router.get("/getcomplaints", async (req, res) => {
    try {
        const complaints = await ComplaintModel.find()


        res.status(200).json({
            msg: "All Complaints",
            complaints
        })
    } catch (error) {
        res.status(500).json({
            msg: "Somthing Went Wrong!!!",
        })
    }
})

router.post("/updatestatus", async (req, res) => {
    try {
        const { complaintId, status } = req.body
       
      console.log(complaintId);
      
        const upstatus = await ComplaintModel.updateOne(
           { "Complaints.complaint_id":complaintId},{$set:{"Complaints.status":status}}       )
      

        if (upstatus.matchedCount === 0) {
            res.status(404).json({
                msg: "Wrong Compliant id"
            })
        } else {
            console.log(upstatus);
            res.status(200).json({
                msg: "Complaint Status Updated"
            })

        }

    } catch (error) {
        res.status(500).json({
            msg: "Somthing Went Wrong!!!"
        })
        console.log(error);

    }
})
export default router;