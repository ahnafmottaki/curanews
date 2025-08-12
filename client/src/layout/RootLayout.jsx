import { Outlet } from "react-router";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import ToastifyContainer from "../components/ToastifyContainer";
import { useState } from "react";
import SubscriptionPromptModal from "../components/Homepage/SubscriptionPromptModal";

const RootLayout = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <SubscriptionPromptModal
        showModal={showModal}
        setShowModal={setShowModal}
      />

      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ToastifyContainer />
    </>
  );
};

export default RootLayout;
