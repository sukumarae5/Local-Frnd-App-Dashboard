// import React, {  useEffect, useState} from "react";

// const DashboardContent = () => {
//   const [screen, setScreen] =useState("desktop");

//   // ⭐ Detect screen size correctly
//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;
//       if (width <= 580) setScreen("mobile");
//       else if (width <= 954) setScreen("tablet");
//       else setScreen("desktop");
//     };

//     handleResize(); // run on load
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

 

//   return (
//     <div style={welcomeBoxStyles}>
//       <h1>Welcome to AdminDashboard</h1>
//     </div>
//   );
// };

// export default DashboardContent;
