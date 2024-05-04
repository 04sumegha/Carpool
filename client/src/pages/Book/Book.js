import React from 'react'
import "./Book.css"
import Footer from '../../components/Footer/Footer'
import { Link } from 'react-router-dom'

function Book() {

  return (
    <div className='page'>
        <h1 className='heading'>Hop In. Let's Go</h1>
      <div className='box'>
        <form className='form'>
            <div className='form-item'>
                <label>Source</label>
                <input type="text" placeholder='Enter your Source'/>
            </div>
            <div className='form-item'>
                <label>Destination</label>
                <input type="text" placeholder='Enter your Destination'/>
            </div>
            <div className='form-item'>
                <label>Start Time</label>
                <input type="text" placeholder='Enter your Start Time'/>
            </div>
            <div className='form-item'>
                <label>Number of Passengers</label>
                <input type="text" placeholder='Enter number of passengers'/>
            </div>
            <button className='button'><Link to="/ongoing" className='link'>Lock Your Preferences</Link></button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Book
