import React from "react";
import { useEvents } from "../context/EventContext";
import EventItem from "../components/EvenItem";
import { Link } from "react-router-dom";

function Events(props) {
    const {user} = props;
    const { events } = useEvents();
    console.log('events', events);
    return (
        <div>
            <h2>Events</h2>
            <Link to="/addEvent">
                <button>Add Events</button>
            </Link>
            <EventItem user={user} items={events} />
        </div>
    );
}

export default Events;