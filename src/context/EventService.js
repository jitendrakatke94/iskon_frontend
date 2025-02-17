
const API_URL = "http://localhost:5454/admin/"; // Replace with your API

export const fetchEvents = async () => {
    const response = await fetch(`${API_URL}events`).then((resp) => resp.json())
    .then((newQuestion) => { return newQuestion}).catch((e) => console.log(e));
    return response.response;
  };

// Add a new Event
export const addEvent = async (payload) => {
    const response = await fetch(API_URL+'addEvent', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    }).then((resp) => resp.json())
    .then((newQuestion) => { return newQuestion}).catch((e) => console.log(e));
    console.log('resp', response);
    return response;
};

// Update Event
export const updateEvent = async (id, updatedData) => {
    const response = await fetch(`${API_URL}updateEvent?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
    }).then((resp) => resp.json())
    .then((newQuestion) => { return newQuestion}).catch((e) => console.log(e));

    // const resp = response.json();
    return response;
};

// Delete Event
export const deleteEvent = async (id) => {
    const response = await fetch(`${API_URL}deleteEvent?id=${id}`, 
    { method: "DELETE" }).then((resp) => resp.json())
    .then((newQuestion) => { return newQuestion}).catch((e) => console.log(e));
    console.log('response', response);
    // const resp = response.json();
    return response;
};