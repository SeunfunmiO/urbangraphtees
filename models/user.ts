import { model, models, Schema } from "mongoose"



interface IUser {
    name?: string
    fullname?: string
    email: string
    password?: string
    role: string
    profilePhoto: string
    provider: string
    resetPasswordToken: string
    resetPasswordExpires: Date
    passwordResetRequests: [Date]
    lastLogin: Date
}


const UserSchema = new Schema<IUser>({
    name: { type: String },
    fullname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: false,
        select: false
    },
    profilePhoto: String,
    role: {
        type: String,
        enum: ['user', 'admin', 'staff'],
        default: 'user'
    },
    provider: {
        type: String,
        default: "credentials",
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    passwordResetRequests: {
        type: [Date],
        default: [],
    },
    lastLogin: {
        type: Date,
        default: null
    }
}, { timestamps: true })

const UserModel = models.User<IUser> || model("User", UserSchema)

export default UserModel