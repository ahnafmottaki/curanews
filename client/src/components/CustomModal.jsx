import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const CustomModal = forwardRef(({ children }, ref) => {
  const modalRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      open() {
        modalRef.current.showModal();
      },
      close() {
        modalRef.current.close();
      },
    };
  });
  return createPortal(
    <dialog
      ref={modalRef}
      className="min-w-xs rounded-sm overflow-hidden sm:rounded-lg max-w-xl w-full  m-auto"
    >
      {children}
    </dialog>,
    document.getElementById("modal-container")
  );
});

export default CustomModal;
