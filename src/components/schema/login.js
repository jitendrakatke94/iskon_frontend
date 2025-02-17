import * as YUP from 'yup';

export const LoginSchema = YUP.object({
    email: YUP.string().email().required("please enter email"),
    password: YUP.string().min(6).required("Please enter your password")
});