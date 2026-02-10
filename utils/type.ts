export interface jwtPayload {
    _id?: string
    iat?: number
    exp?: number
    success: boolean
}

export type MessageType = "success" | "error" | "";

export interface FormData {
    image: string,
    fullname: string,
    email: string,
    confirmpassowrd: string,
    password: string,
    agree: boolean
}
export interface ButtonProps {
    loading?: boolean,
    success?: boolean,
    name?: string,
    title: string,
    successTitle?: string
}