import React, { useEffect, useState } from "react";
import ModalUI from "../UI/ModalUI";
import { AiOutlineHome } from "react-icons/ai";
import { cleanUpScroll, disableScroll, ratesPer } from "@/app/utils/helpers";
import { Button, Drawer, Flex } from "antd";
import ContactForm from "./ContactForm";
import { useSession } from "next-auth/react";
const ContactBtn = ({
  rates,
  bottomBar,
  id,
  owner,
  hasSentMessage,
  userId,
}) => {
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);

  const handleCancel = () => {

    setOpen(false);
  };

  const [winSize, setWinSize] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 786;

      setWinSize(isMobile);

   
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    disableScroll(open, winSize);
    return () => {
      cleanUpScroll();
    };
  }, [open]);


  const [price, perPrice] = ratesPer(rates).split("/");
  return (
    <>
      <div className="">
        <div className="flex justify-between items-center  ">
          <>
            {bottomBar && (
              <Flex className="bottom-bar-price" align="center" gap={2}>
                <span className="text-lg font-semibold">{price}</span>

                <span className="mt-[2px]" style={{ color: "#555" }}>
                  {"/"}
                  {perPrice}
                </span>
              </Flex>
            )}

            <button
              onClick={() => setOpen(true)}
              className={`btn text-base  bottom-bar-btn ${
                bottomBar ? "" : "w-full"
              }`}
            >
              <AiOutlineHome className="mr-1 z-10" />
              <span data-text="Contact owner">Contact owner</span>
            </button>
          </>
        </div>
      </div>
      {!winSize ? (
        <ModalUI
          handleCancel={handleCancel}
          open={open}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
          ]}
        >
          <ContactForm
            rates={rates}
            id={id}
            owner={owner}
            hasSentMessage={hasSentMessage}
            userId={userId}
            session={session}
          />
        </ModalUI>
      ) : (
        <Drawer
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
          ]}
          height={"100%"}
          title="Contact property manager"
          placement="bottom"
          onClose={handleCancel}
          open={open}
        >
          <ContactForm
            drawer
            rates={rates}
            id={id}
            owner={owner}
            hasSentMessage={hasSentMessage}
            userId={userId}
            session={session}
          />
        </Drawer>
      )}
    </>
  );
};

export default ContactBtn;
