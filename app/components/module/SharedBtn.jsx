"use client";
import { Button, Dropdown, Space } from "antd";
 
import { IoShareSocialOutline } from "react-icons/io5";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
 
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import { FaXTwitter } from "react-icons/fa6";
const SharedBtn = ({ title, defaultType, children, id, name }) => {
  // const [url, setUrl] = useState("");

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setUrl(`${window.location.origin}/${id}`);
  //   }
  // }, [id]);
  const url = `${process.env.NEXT_PUBLIC_URL}/property/${id}`;
  console.log(name);

  const items = [
    {
      key: 0,

      label: (
        <FacebookShareButton url={url} quote={name}>
          <div className="flex items-center gap-2">
            <FacebookIcon size={22} round />
            <span>Share on Facebook</span>
          </div>
        </FacebookShareButton>
      ),
    },
    {
      key: 1,

      label: (
        <TwitterShareButton url={url} title={name}>
          <div className="flex items-center gap-2">
            <FaXTwitter size={22} round />
            <span className="text-sm">Share on X</span>
          </div>
        </TwitterShareButton>
      ),
    },
    {
      key: 2,

      label: (
        <TelegramShareButton url={url} title={name}>
          <div className="flex items-center gap-2">
            <TelegramIcon size={22} round />
            <span className="text-sm">Share on Telegram</span>
          </div>
        </TelegramShareButton>
      ),
    },
  ];

  return (
    <>
      <Dropdown overlayClassName={"share-btn"} menu={{ items }} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Button
              className="!font-semibold"
              type={defaultType ? "default" : "text"}
            >
              <IoShareSocialOutline className="items-center text-base" />
              {children}
            </Button>
          </Space>
        </a>
      </Dropdown>
    </>
  );
};

export default SharedBtn;
