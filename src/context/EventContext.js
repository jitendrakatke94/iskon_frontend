import React, { createContext, useState, useEffect, useContext } from "react";
import { fetchEvents, addEvent, updateEvent, deleteEvent } from "./EventService";
import { useAuth } from "./AuthContext";
// Create Context
const EventContext = createContext();

// Provider Component
export function EventProvider({ children }) {
  const { user, logout } = useAuth();
  const [events, setEvents] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  // Fetch events when app loads
  useEffect(() => {
    const loadData = async () => {
        setUsersLoading(true);
        const result = await fetchEvents(user);
        setEvents(result);
        setUsersLoading(false);
      };
  
      // then call it here
      loadData();
  }, []);
  
  // Add event
  const createEvent = async (eventData) => {
    const newEvent = await addEvent(eventData, user);
    // if (newEvent) setEvents([...events, newEvent]);
    // return newEvent;
    const result = await fetchEvents();
    setEvents(result);
  };

  // Edit event
  const editEvent = async (id, updatedData) => {
    const updatedEvent = await updateEvent(id, updatedData, user);
    // if (updatedEvent) {
    //   setEvents(events.map((event) => (event.id === id ? updatedEvent : event)));
    // }
    const result = await fetchEvents();
    setEvents(result);
  };

  // Delete event
  const removeEvent = async (id) => {
    if (await deleteEvent(id, user)) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  return (
    <EventContext.Provider value={{ events, createEvent, editEvent, removeEvent }}>
      {children}
    </EventContext.Provider>
  );
}
export function useEvents() {
    return useContext(EventContext);
}