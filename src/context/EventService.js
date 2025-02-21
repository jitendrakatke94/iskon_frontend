
const API_URL = "http://localhost:5454/admin/"; // Replace with your API

export const fetchEvents = async (user) => {
    if(user){
        let url = `${API_URL}events`;
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${user.token}`, }
        }).then((resp) => resp.json())
        .then((newQuestion) => { return newQuestion}).catch((e) => console.log(e));
        return response.response;
    }
  };

// Add a new Event
export const addEvent = async (payload, user) => {
    const response = await fetch(API_URL+'addEvent', {
        method: "POST",
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${user.token}`, },
        body: JSON.stringify(payload),
    }).then((resp) => resp.json())
    .then((newQuestion) => { return newQuestion}).catch((e) => console.log(e));
    console.log('resp', response);
    return response;
};

// Update Event
export const updateEvent = async (id, updatedData, user) => {
    const response = await fetch(`${API_URL}updateEvent?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${user.token}`, },
        body: JSON.stringify(updatedData),
    }).then((resp) => resp.json())
    .then((newQuestion) => { return newQuestion}).catch((e) => console.log(e));

    // const resp = response.json();
    return response;
};

// Delete Event
export const deleteEvent = async (id, user) => {
    const response = await fetch(`${API_URL}deleteEvent?id=${id}`, 
    { 
        method: "DELETE",
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${user.token}`, },
     }).then((resp) => resp.json())
    .then((newQuestion) => { return newQuestion}).catch((e) => console.log(e));
    console.log('response', response);
    // const resp = response.json();
    return response;
};