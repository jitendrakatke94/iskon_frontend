import * as YUP from 'yup';

export const RegisterationSchema = YUP.object({
    name: YUP.string().min(2).max(50).required("Please enter your name"),
    email: YUP.string().email().required("please enter email"),
    password: YUP.string().min(6).required("Please enter your password"),
    confirm_password: YUP.string().required().oneOf([YUP.ref('password'), null, "Password must match"])
});