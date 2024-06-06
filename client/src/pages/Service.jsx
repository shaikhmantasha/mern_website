// import { useAuth } from "../store/auth";

// export const Service = () => {
//   const { services } = useAuth(); // Destructure services from useAuth()

//   return (
//     <section>
//       <div className="container">
//         <h1 className="main-heading">Services</h1>
//       </div>

//       <div className="container grid grid-three-cols">
//         {services.map((curElem, index) => {
//           const { price, description, provider, name } = curElem; // Destructure the correct properties

//           return (
//             <div className="card" key={index}>
//               <div className="card-image">
//                 <img
//                   src="/images/design.png"
//                   alt="our services info"
//                   width="200"
//                 />
//                 <div className="card-details">
//                   <div className="grid grid-two-cols">
//                     <p>{provider}</p>
//                     <p>{price}</p>
//                   </div>
//                   <h2>{name}</h2> {/* Display the service name */}
//                   <p>{description}</p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

import React from 'react';
import { useAuth } from "../store/auth";

export const Service = () => {
  const { services } = useAuth(); // Destructure services from useAuth()

  return (
    <section>
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>

      <div className="container grid grid-three-cols">
        {services && services.length > 0 ? (
          services.map((curElem, index) => {
            const { price, description, provider, name } = curElem; // Destructure the correct properties

            return (
              <div className="card" key={index}>
                <div className="card-image">
                  <img
                    src="/images/design.png"
                    alt="our services info"
                    width="200"
                  />
                  <div className="card-details">
                    <div className="grid grid-two-cols">
                      <p>{provider}</p>
                      <p>{price}</p>
                    </div>
                    <h2>{name}</h2> {/* Display the service name */}
                    <p>{description}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No services available</p>
        )}
      </div>
    </section>
  );
};

