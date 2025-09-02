import { Schema , model  , Document } from "mongoose";

export interface IUser extends Document {
    firstName : string ;
    lastName : string ;
    email : string ;
    password : string ;
    role : "user" | "admin";
}

const userSchema : Schema<IUser> = new Schema({

    firstName : {
        type : String ,
        required : true ,
        trim : true,
        minlength : [2, "First name must be at least 2 characters long"],
    } , 

    lastName : {
        type : String ,
        required : true ,
        trim : true,
        minlength : [2, "Last name must be at least 2 characters long"],
    } ,

    email : {
        type : String ,
        required : true ,
        unique : true ,
        trim : true,
        lowercase : true,
        validate : {
            validator : function(v: string) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message : props => `${props.value} is not a valid email address!`
        }
    } ,

    password : {
        type : String ,
        required : true ,
        minlength : [8, "Password must be at least 8 characters long"],
    } ,

    role : {
        type : String ,
        required : true ,
        enum : ["user", "admin"],
        default : "user"
    }


})


export const User = model<IUser>("User", userSchema);