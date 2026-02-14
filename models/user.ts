import { model, models, Schema } from "mongoose"



interface IUser {
    fullname: string
    email: string
    password: string
    role: string
    profilePhoto: string
    resetPasswordToken: string
    resetPasswordExpires: Date
    passwordResetRequests:[Date]
    lastLogin: Date
}


const UserSchema = new Schema<IUser>({
    fullname: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required:true
    },
    password: {
        type: String,
        select: false
    },
    profilePhoto: String,
    role: {
        type: String,
        enum: ['user', 'admin', 'staff'],
        default: 'user'
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