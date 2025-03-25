"use client";
import React, { useEffect, useState } from "react";

import { Dropdown, Space, Avatar, Badge, Drawer, Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import navBarIcon from "@/app/asset/navigation/index";
import { useMessageReadStatusContext } from "@/app/context/MessageReadStatusContext";
import MessageStatus from "./MessageStatus";
import { useMessageStatusContext } from "@/app/context/MessageStatusContext";
const Navbar = ({ session }) => {
  const router = useRouter();
  const { notif, setNotif } = useMessageReadStatusContext();

  const [windowSize, setWindowSize] = useState(false);
  const [open, setOpen] = useState(false);
  const getNotif = async () => {
    const res = await axios.get("/api/notifications");
    return res.data;
  };
  const { data: notifications } = useQuery({
    queryKey: ["notification"],
    queryFn: getNotif,
    retry: 2,
    staleTime: 5 * 60 * 1000,
    // refetchInterval: 5000,
    enabled: !!session?.user.id,
  });

  const haveNotif = notifications?.some((item) => item.notified);
  useEffect(() => {
    setNotif(haveNotif);
  }, [notifications]);
  const { count } = useMessageStatusContext();

  const items = [
    {
      label: <Link href="/dashboard">Dashboard</Link>,
      icon: navBarIcon.profile,
      key: "1",
    },
    {
      label: <Link href="/dashboard/properties">My properties</Link>,
      icon: navBarIcon.properties,
      key: "2",
    },
    {
      label: (
        <a
          onClick={() => {
            router.push("/dashboard/bookmarks");
            router.refresh();
          }}
        >
          Bookmarks
        </a>
      ),
      icon: navBarIcon.bookmarks,
      key: "3",
    },
    {
      label: (
        <Link href="/dashboard/messages-sent">
          {notif && <Badge offset={[-10, -12]} dot={1}></Badge>}
          Messages sent
        </Link>
      ),
      icon: navBarIcon["messages-sent"],
      key: "4",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link className="!transition-none" href="/api/auth/signout">
          Log out
        </Link>
      ),
      icon: navBarIcon.logout,
      danger: true,
      key: "5",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 786;

      setWindowSize(isMobile);
      setOpen(false);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDropdownClick = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log(open);

    if (open && windowSize) {
      document.body.classList.add("lock");
    } else {
      document.body.classList.remove("lock");
    }
  }, [open]);
  const itemsDrawer = [
    {
      label: <MessageStatus onClose={onClose} responsive />,
      icon: null,
      key: "0",
    },
    {
      label: (
        <Link onClick={onClose} href="/dashboard">
          Dashboard
        </Link>
      ),
      icon: navBarIcon.profile,
      key: "1",
    },
    {
      label: (
        <Link onClick={onClose} href="/dashboard/properties">
          My properties
        </Link>
      ),
      icon: navBarIcon.properties,
      key: "2",
    },
    {
      label: (
        <a
          onClick={() => {
            router.push("/dashboard/bookmarks");
            router.refresh();
            onClose();
          }}
        >
          Bookmarks
        </a>
      ),
      icon: navBarIcon.bookmarks,
      key: "3",
    },
    {
      label: (
        <Link onClick={onClose} href="/dashboard/messages-sent">
          {notif && <Badge offset={[-18, -13]} dot={1}></Badge>}
          Messages sent
        </Link>
      ),
      icon: navBarIcon["messages-sent"],
      key: "4",
    },
    { type: "divider" },
    {
      label: (
        <Link className="!transition-none" href="/api/auth/signout">
          Log out
        </Link>
      ),
      icon: navBarIcon.logout,
      danger: true,
      key: "5",
    },
  ];
  return (
    <>
      {!windowSize ? (
        <Dropdown
          overlayStyle={{ width: "200px" }}
          menu={{ items }}
          trigger={["click"]}
        >
          <a onClick={handleDropdownClick}>
            <Space>
              <Badge
                style={{ right: "4px", top: "4px" }}
                dot={notif || (count && windowSize)}
              >
                <Avatar size="large" className="!bg-transparent">
                  <Image
                    alt="g-avatar"
                    className="rounded-full"
                    width={60}
                    height={60}
                    src={session?.user?.image}
                  />
                </Avatar>
              </Badge>
            </Space>
          </a>
        </Dropdown>
      ) : (
        <>
          <a onClick={handleDropdownClick}>
            <Space>
              <Badge
                style={{ right: "4px", top: "4px" }}
                dot={notif || (count && windowSize)}
              >
                <Avatar size="large" className="!bg-transparent">
                  <Image
                    alt="g-avatar"
                    className="rounded-full"
                    width={60}
                    height={60}
                    src={session?.user?.image}
                  />
                </Avatar>
              </Badge>
            </Space>
          </a>
          <Drawer
            width={"300px"}
            styles={{ body: { padding: "14px" } }}
            title="Basic Drawer"
            onClose={onClose}
            open={open}
          >
            <Menu items={itemsDrawer} />
          </Drawer>
        </>
      )}
    </>
  );
};

export default Navbar;

// "use client";
// import React, { useEffect, useState } from "react";
// import { DownOutlined } from "@ant-design/icons";
// import { Dropdown, Space, Avatar, Badge } from "antd";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import navBarIcon from "@/app/asset/navigation/index";
// import { useMessageReadStatusContext } from "@/app/context/MessageReadStatusContext";
// import MessageStatus from "./MessageStatus";
// import { useMessageStatusContext } from "@/app/context/MessageStatusContext";
// const Navbar = ({ session }) => {
//   const router = useRouter();
//   const { notif, setNotif } = useMessageReadStatusContext();
//   const [messageCount, setMessageCount] = useState(0);
//   const [WindowSize, setWindowSize] = useState(false);

//   const getNotif = async () => {
//     const res = await axios.get("/api/notifications");
//     return res.data;
//   };
//   const { data: notifications } = useQuery({
//     queryKey: ["notification"],
//     queryFn: getNotif,
//     retry: 2,
//     staleTime: 5 * 60 * 1000,
//     // refetchInterval: 5000,
//     enabled: !!session?.user.id,
//   });

//   const haveNotif = notifications?.some((item) => item.notified);
//   useEffect(() => {
//     setNotif(haveNotif);
//   }, [notifications]);
//   const { count, setCount } = useMessageStatusContext();

//   //  const items = [
//   //    {
//   //      label: <Link href="/dashboard">Dashboard</Link>,
//   //      icon: navBarIcon.profile,
//   //      key: "1",
//   //    },
//   //    {
//   //      label: <Link href="/dashboard/properties">My properties</Link>,
//   //      icon: navBarIcon.properties,
//   //      key: "2",
//   //    },
//   //    {
//   //      label: <Link href="/dashboard/bookmarks">Bookmarks</Link>,
//   //      icon: navBarIcon.bookmarks,
//   //      key: "3",
//   //    },
//   //    {
//   //      label: (
//   //        <Link href="/dashboard/messages-sent">
//   //          {notif && (
//   //            <span className="w-[6px] h-[6px] bg-red-500 rounded-full absolute left-[1px] top-[15px] pointer-events-none"></span>
//   //          )}
//   //          Messages sent
//   //        </Link>
//   //      ),
//   //      icon: navBarIcon["messages-sent"],
//   //      key: "4",
//   //    },
//   //    {
//   //      type: "divider",
//   //    },
//   //    {
//   //      label: <Link className="!transition-none" href="/api/auth/signout">Log out</Link>,
//   //      icon: navBarIcon.logout,
//   //      danger: true,
//   //      key: "5",
//   //    },
//   //  ];

//   const handleDropdownClick = (e, href, name) => {
//     e.preventDefault();
//     if (!href) return;
//     if (name === "bookmarks") {
//       router.push(href);
//       router.refresh();
//     } else {
//       router.push(href);
//     }
//   };

//   const items = [
//     {
//       label: (
//         <a
//           role="button"
//           onClick={(e) => handleDropdownClick(e,"/dashboard")}
//         >
//           Dashboard
//         </a>
//       ),

//       icon: navBarIcon.profile,
//       key: "1",
//     },
//     {
//       label: (
//         <a
//           role="button"
//           onClick={(e) =>
//             handleDropdownClick(e, "/dashboard/properties")
//           }
//         >
//           My properties
//         </a>
//       ),

//       icon: navBarIcon.properties,
//       key: "2",
//     },
//     {
//       label: (
//         <a
//           role="button"
//           onClick={(e) =>
//             handleDropdownClick(
//               e,
//               "/dashboard/bookmarks",
//               "bookmarks"
//             )
//           }
//         >
//           Bookmarks
//         </a>
//       ),
//       icon: navBarIcon.bookmarks,
//       key: "3",
//     },
//     {
//       label: (
//         <a
//           role="button"
//           onClick={(e) =>
//             handleDropdownClick(e, "/dashboard/messages-sent")
//           }
//         >
//           {notif && (
//             <span className="w-[6px] h-[6px] bg-red-500 rounded-full absolute left-[1px] top-[15px] pointer-events-none"></span>
//           )}
//           Messages sent
//         </a>
//       ),

//       icon: navBarIcon["messages-sent"],
//       key: "4",
//     },
//     {
//       type: "divider",
//     },
//     {
//       label: (
//         <a
//           role="button"
//           danger="true"
//           onClick={(e) => handleDropdownClick(e,"/api/auth/signout")}
//         >
//           Log out
//         </a>
//       ),
//       icon: navBarIcon.logout,
//       key: "5",
//     },
//   ];

//   if (WindowSize) {
//     items.unshift({
//       label: <MessageStatus setMessageCount={setMessageCount} responsive />,
//       icon: null,
//       key: "0",
//     });
//   }

//   useEffect(() => {
//     const handleResize = () => {
//       const isMobile = window.innerWidth < 786;

//       setWindowSize(isMobile);
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // const messageCount=WindowSize
//   return (
//     <Dropdown menu={{ items }} trigger={["click"]}>
//       <a role="button" onClick={handleDropdownClick}>
//         <Space>
//           <Badge
//             style={{ right: "4px", top: "4px" }}
//             dot={notif || (count && WindowSize)}
//           >
//             <Avatar size="large" className="!bg-transparent">
//               <Image
//                 alt="g-avatar"
//                 className="rounded-full"
//                 width={60}
//                 height={60}
//                 src={session?.user?.image}
//               />
//             </Avatar>
//           </Badge>
//         </Space>
//       </a>
//     </Dropdown>
//   );
// };

// export default Navbar;
