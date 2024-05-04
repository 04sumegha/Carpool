import React, { useState, useEffect } from 'react';
import "./Ongoing.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Footer from '../../components/Footer/Footer';

function Ongoing() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const display = () => {
    alert("Booking created succesfully");
  }

  const fetchData = async () => {
    const userId = localStorage.getItem("userId");
    
    if (userId) {
      try {
        const result = await axios.get("http://localhost:5000/booking/list");

        const bookingsWithDriverDetails = await Promise.all(
          result.data.booking.map(async booking => {
            const driverResult = await axios.get(`http://localhost:5000/driver/get?_id=${booking.driverId}`);
            
            const driverName = driverResult.data.driver.firstname; 
            
            const startTime = moment(booking.startTime).format('YYYY-MM-DD HH:mm');
            const endTime = moment(booking.endTime).format('YYYY-MM-DD HH:mm');

            return { ...booking, driverName, startTime, endTime };
          })
        );
        setData(bookingsWithDriverDetails);
      } 

      catch (error) {
        console.error("Error fetching data:", error);
      }
    } 

    else {
      navigate('/auth');
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='table'>
      <div className='inner'>
        <table>
          <thead>
            <tr>
              <th>Driver ID</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Source</th>
              <th>Destination</th>
              <th>No of Passengers</th>
            </tr>
          </thead>
          <tbody>
            {data.map(booking => (
              <tr key={booking._id}>
                <td>{booking.driverName}</td>
                <td>{booking.startTime}</td>
                <td>{booking.endTime}</td>
                <td>{booking.source}</td>
                <td>{booking.destination}</td>
                <td>{booking.noofpassengers}</td>
                <td><button className='confirm' onClick={display}>Confirm</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default Ongoing;