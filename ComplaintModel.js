import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  number: {
    type: String,
    required: true,
  },
  email : {
   type:String
  },
  Complaints: {
    complaint_id:{
      type:String
    },
    status:{
      type:String,

    },
    IssueCatagory:{
      type:String
    },
    photo: {
      type: String
    },
    description: {
      type: String
    },
    location: {
      type: String
    },
  }
}, { timestamps: true });

export default mongoose.model("Complaint", complaintSchema);
