import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
function UserManagement() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        const loadData = async () => {
            const url = 'http://localhost:5454/admin/userList'
            await fetch(url, {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: { "Content-Type": "application/json" },
                redirect: "follow",
                referrerPolicy: "no-referrer",
            }).then((resp) => resp.json())
            .then((newQuestion) => setItems(newQuestion.response)).catch((e) => console.log(e));
            };
          loadData();
      }, []);

  return (
      <>
      <div>
        <Link to={`/dashboard`}>
            <button>Dashboard</button>
        </Link>
      </div>
        <table cellPadding={'5px'} border={'1px'}>
          <thead>
            <tr>
              <th align="center">Name</th>
              <th align="center">Email</th>
              <th align="center">Role</th>
              <th align="center">Event Name</th>
              <th align="center">Location</th>
            </tr>
          </thead>
          <tbody>
            {
              items.map((item, index) => {
                return (
                    <tr key={index}>
                      <td align="center"> {item.username} </td>
                      <td align="center"> {item.email} </td>
                      <td align="center"> {item.role} </td>
                      <td align="center"> {item.event ? item.event : 'Not Available'} </td>
                      <td align="center"> {item.location_name ? item.location_name : 'Not Available'} </td>
                    </tr>
                )
              })
            }
          </tbody>
        </table>
      </>
  );
}

export default UserManagement;