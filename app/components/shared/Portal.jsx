// import React from "react";
// import { createPortal } from "react-dom";
// const Portal = ({ children }) => {
//   return <div>{createPortal(children, document.body)}</div>;
// };

// export default Portal;

import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  return createPortal(children, document.body);
};

export default Portal;
