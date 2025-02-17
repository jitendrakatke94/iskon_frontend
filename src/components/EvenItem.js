import React, { useState } from "react";
import { useEvents } from "../context/EventContext";
import { Link } from "react-router-dom";
import { format } from 'date-fns';
// import Pagination from '../Pages/pagination';

function EventItem({ users, items }) {
  // const [currentPage, setCurrentPage] = useState();
  const { removeEvent } = useEvents();
  // const handlePagination = (pageNumber) => {
  //     setCurrentPage (pageNumber);
  // };
  return (
      <>
        <table>
          <thead>
            <tr>
              <th align="center">Title</th>
              <th align="center">Discription</th>
              <th align="center">date</th>
              <th align="center">Location</th>
              <th align="center">Category</th>
              <th align="center">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              items.map((item, index) => {
                return (
                  // <div >
                    <tr key={index}>
                      <td align="center"> {item.title} </td>
                      <td align="center"> {item.description} </td>
                      <td align="center"> {format(item.date, "yyyy-MM-dd")} </td>
                      <td align="center"> {item.name} </td>
                      <td align="center"> {item.category} </td>
                      <td align="center">
                        <Link to={`/addEvent/${item.id}`}>
                          <button>Edit</button>
                        </Link>
                        <button onClick={() => removeEvent(item.id)}>Delete</button>
                      </td>
                    </tr>
                  // </div>
                )
              })
            }
          </tbody>
        </table>
        {/* <Pagination
          length={items.length}
          postsPerPage={10}
          handlePagination={handlePagination}
          currentPage={currentPage}
      /> */}
      </>
  );
}

export default EventItem;