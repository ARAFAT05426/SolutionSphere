import { Types } from "mongoose";

type userProps = {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    role?: string;
    username: string;
    password: string;
    status?: string
}

export default userProps