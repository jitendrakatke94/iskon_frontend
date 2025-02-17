import * as YUP from 'yup';

export const EventSchema = YUP.object({
    title: YUP.string().min(2).max(50).required("Please enter your Title"),
    description: YUP.string().min(2).required("please enter description"),
    date: YUP.string().required("Please enter your date"),
    location: YUP.string().required("Please enter your location"),
    category: YUP.string().required("Please enter your category")
});