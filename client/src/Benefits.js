import React,{useEffect} from 'react';
import './Benefits.css'

function Benefits() {
    useEffect(() => {
        window.addEventListener('scroll', slideInElements);
        return () => {
          window.removeEventListener('scroll', slideInElements);
        };
      }, []);
    
      const slideInElements = () => {
        const elements = document.querySelectorAll('.slide-in');
        elements.forEach((element, index) => {
          const slideInAt = window.scrollY + window.innerHeight - element.clientHeight / 2;
          const elementBottom = element.offsetTop + element.clientHeight;
          const isHalfShown = slideInAt > element.offsetTop;
          const isNotScrolledPast = window.scrollY < elementBottom;
          if (isHalfShown && isNotScrolledPast) {
            element.classList.add('active');
          } else {
            element.classList.remove('active');
          }
        });
      };
    
      return (
        <div>
        <h1>Why carpooling?</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-6 slide-in">
              <img class="benefits curved-dark-border" src="fuel.jpg" alt="Left Image" />
            </div>
            <div className="col-md-6 slide-in">
              <h2>Reduces Fuel Consumption</h2>
              <p class="p1"> By sharing rides with others heading in the same direction, car pooling minimizes the number of vehicles on the road, resulting in fewer emissions and less fuel usage overall. This eco-friendly solution not only benefits the environment but also contributes to easing traffic congestion and reducing the financial burden of fuel costs for individuals. </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 slide-in">
              <h2>Decreases Greenhouse Gas</h2>
              <p>Fewer cars on the road lead to lower carbon emissions, contributing to a cleaner, healthier environment.</p>
            </div>
            <div className="col-md-6 slide-in">
              <img  class="benefits curved-dark-border" src="greenhouse.jpg" alt="Right Image" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 slide-in">
              <img class="benefits curved-dark-border" src="traffic.jpg" alt="Left Image" />
            </div>
            <div className="col-md-6 slide-in">
              <h2>Alleviates traffic congestion</h2>
              <p>Sharing a ride means less fuel used and fewer trips needed, which conserves energy and reduces our dependence on non-renewable resources.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 slide-in">
              <h2>Saves Money</h2>
              <p class="p2">Fewer cars on the road lead to lower carbon emissions, contributing to a cleaner, healthier environment.</p>
            </div>
            <div className="col-md-6 slide-in">
              <img  class="benefits curved-dark-border" src="money.jpg" alt="Right Image" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 slide-in">
              <img class="benefits curved-dark-border" src="stress.jpg" alt="Left Image" />
            </div>
            <div className="col-md-6 slide-in">
              <h2>Reduces Stress</h2>
              <p class="p1">Sharing a ride means less fuel used and fewer trips needed, which conserves energy and reduces our dependence on non-renewable resources.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 slide-in">
              <h2>Social Interaction</h2>
              <p class="p2">Fewer cars on the road lead to lower carbon emissions, contributing to a cleaner, healthier environment.</p>
            </div>
            <div className="col-md-6 slide-in">
              <img  class="benefits curved-dark-border" src="social.jpg" alt="Right Image" />
            </div>
          </div>
        </div>
        </div>
      )
}

export default Benefits;




