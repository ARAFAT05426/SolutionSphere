import { Types } from "mongoose";

type userProps = {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    username: string;
    password: string;
}

export default userProps