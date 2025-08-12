import { createPortal } from "react-dom";
import { Bounce, ToastContainer } from "react-toastify";

const ToastifyContainer = () => {
  return createPortal(
    <ToastContainer
      // className="z-[100]"
      // style={{
      //   zIndex: 1000,
      //   marginTop: "100px",
      // }}
      // toastClassName={"z-1000 mt-100"}
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />,
    document.getElementById("toastify-container")
  );
};

export default ToastifyContainer;
