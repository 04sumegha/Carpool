import React from 'react'
import './Navbar.css'
function Navbar(){
    return(
        <div>
         <nav class="navbar navbar-expand-lg navbar-custom">
  <div class="container">
    <a class="navbar-brand" href="#">Carpool</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="#">Book a ride</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Ongoing Rides</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Driver</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </div>
    )
}
export default Navbar