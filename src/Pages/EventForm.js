import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import { EventSchema } from '../components/schema/event';
import { useFormik } from 'formik';
import { useAuth } from "../context/AuthContext";
import { format } from 'date-fns';
import '../App.css';
function EventForm() {
    const { user, logout } = useAuth();
    const [options, setOptions] = useState([]);
    const { createEvent, editEvent, events } = useEvents();
    const [initialValues, setInitialValues] = useState({
        title: "", 
        description: "", 
        date: format(new Date(), 'yyyy-MM-dd'), 
        category:'', 
        location:""
    });
    const navigate = useNavigate();
    const { id } = useParams();
    console.log('useParams', useParams());
    const isEditing = Boolean(id);

    useEffect(() => {
        if (isEditing) {
            const event = events.find((u) => u.id === Number(id));
            if (event) {
                setInitialValues({ title: event.title, description: event.description, date: format(event.date, 'yyyy-MM-dd'), category: event.category, location: event.location_id });
                // initialValues = { title: event.title, description: event.description, date: event.date, category: event.category, location: event.location };
            }
        }
        const loadData = async () => {
            const url = 'http://localhost:5454/admin/locations'
            await fetch(url, {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: { "Content-Type": "application/json" },
                redirect: "follow",
                referrerPolicy: "no-referrer",
            }).then((resp) => resp.json())
            .then((newQuestion) => setOptions(newQuestion.response)).catch((e) => console.log(e));
            };
        loadData();
        console.log('opetions', options);
    }, [id, events, isEditing]);

    const {values, errors, handleBlur, handleChange, handleSubmit, touched} = useFormik({
        enableReinitialize:true,
        initialValues: initialValues,
        validationSchema: EventSchema,
        onSubmit: async (values) => {
        const reqData = {
            title: values.title,
            description: values.description,
            date: values.date,
            location_id: values.location,
            category: values.category,
            user_role: user.role,
            user_id: user.id
        };
            if (isEditing) {
                editEvent(Number(id), reqData);
                alert("Event Updated successfully");
            }else {
                const resp = await createEvent(reqData).then((resp) => resp.json())
                .then((newQuestion) => { return newQuestion}).catch((e) => console.log(e));
                alert("Event added successfully");
            }
            navigate("/dashboard");
        }
    });
  return (
    <div style={{'text-align': 'center'}} className="card">
        <div>
            <Link to={`/dashboard`}>
                <button>Dashboard</button>
            </Link>
        </div>
      <h2>{isEditing ? "Edit events" : "Add events"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
            <input
                type="text"
                placeholder="Title"
                value={values.title}
                name="title"
                onChange={handleChange}
                touched={touched.title}
                error={errors.title}
                helperText={errors?.message}
                onBlur={handleBlur}
            />
            {errors.title && touched.title && <p>{errors.title}</p>}
        </div>
        <div>
            <input
                type="text"
                name="description"
                placeholder="Discription"
                value={values.description}
                touched={touched.description}
                error={errors.description}
                helperText={errors?.message}
                onBlur={handleBlur}
                onChange={handleChange}
                className="input-field"
            />
            {errors.description && touched.description && <p>{errors.description}</p>}
        </div>
        <div>
            <input
                type="date"
                name="date"
                placeholder="date"
                value={values.date}
                touched={touched.date}
                error={errors.date}
                helperText={errors?.message}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            {errors.date && touched.date && <p>{errors.date}</p>}
        </div>
        <div>
            {/* <input
                type="text"
                name="location"
                placeholder="location"
                value={values.location}
                touched={touched.location}
                error={errors.location}
                helperText={errors?.message}
                onBlur={handleBlur}
                onChange={handleChange}
            /> */}
            <select 
                onBlur={handleBlur}
                name="location"
                touched={touched.location}
                error={errors.location}
                helperText={errors?.message}
                onChange={handleChange}
                value={values.location}
            >
                <option>Please choose one option</option>
                {options.map((option, index) => {
                    return (
                        <option value={option.id} key={index}>
                            {option.name}
                        </option>
                    );
                })}
            </select>
            {errors.location && touched.location && <p>{errors.location}</p>}
        </div>
        <div>
            <input
                type="text"
                name="category"
                placeholder="category"
                value={values.category}
                touched={touched.category}
                error={errors.category}
                helperText={errors?.message}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            {errors.category && touched.category && <p>{errors.category}</p>}
        </div>
        <button type="submit">{isEditing ? "Update" : "Add"}</button>
      </form>
    </div>
  );
}

export default EventForm;