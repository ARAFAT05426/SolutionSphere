import { Types } from "mongoose";

type ServiceProps = {
  _id?: Types.ObjectId;
  status: string;
  title: string;
  description: string;
  category:
    | "Beauty"
    | "Home Repair"
    | "Cleaning"
    | "Plumbing"
    | "Electrical"
    | "Gardening"
    | "Other";
  provider: Types.ObjectId;
  price: number;
  duration: number;
  availability: string[];
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

export default ServiceProps;
