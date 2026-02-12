import { model, models, Schema } from "mongoose"



interface IUser {
    fullname: string
    email: string
    password: string
    role: string
    profilePhoto:string
    lastLogin:Date
}


const UserSchema = new Schema<IUser>({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'staff'],
        default: 'user'
    },
    profilePhoto: String,
    lastLogin: {
        type: Date,
        default: null
    }
}, { timestamps: true })

const UserModel = models.User<IUser> || model("User", UserSchema)

export default UserModel