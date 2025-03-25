// import React from "react";
// import Header from "./Header";
// import Footer from "./Footer";
// import NextAuthProvider from "@/app/provider/NextAuthProvider";

// const Layout = ({ children }) => {
//   return (
//     <NextAuthProvider>

//       <Header />
//       <main className="min-h-screen container max-w-screen-2xl  m-auto max-md:p-4 p-7 ">
//         {children}
//       </main>
//       <Footer />

//     </NextAuthProvider>
//   );
// };

// export default Layout;

// "use client";
// import React from "react";
// import Header from "./Header";
// import Footer from "./Footer";
// import NextAuthProvider from "@/app/provider/NextAuthProvider";

// import { usePathname } from "next/navigation";
// import { NotificationProvider } from "@/app/context/NotificationContext";

// const Layout = ({ children }) => {
//   const layoutPages = ["/properties", "/dashboard/bookmarks", "/property/"];
//   const pathname = usePathname();
//   const showNotificationProvider = layoutPages.some((route) =>
//     pathname.startsWith(route),

//   );

//   return (
//     <NextAuthProvider>
//       <Header />
//       {showNotificationProvider ? (
//         <NotificationProvider>
//           <main className="min-h-screen container max-w-screen-2xl  m-auto max-md:p-4 p-7 ">
//             {children}
//           </main>
//         </NotificationProvider>
//       ) : (
//         <main className="min-h-screen container max-w-screen-2xl  m-auto max-md:p-4 p-7 ">
//           {children}
//         </main>
//       )}

//       <Footer />
//     </NextAuthProvider>
//   );
// };

// export default Layout;

"use client";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import NextAuthProvider from "@/app/provider/NextAuthProvider";

import { usePathname } from "next/navigation";
import { NotificationProvider } from "@/app/context/NotificationContext";
import { MessageStatusProvider } from "@/app/context/MessageStatusContext";
import { MessageReadStatusProvider } from "@/app/context/MessageReadStatusContext";
import QueryProvider from "@/app/provider/QueryProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import theme from "../theme/themeConfig";
import { ConfigProvider } from "antd";

const Layout = ({ children }) => {
 
 
const pathname=usePathname()
const isPropertyPage = pathname.startsWith("/property/")


  return (
    <AntdRegistry>
      <ConfigProvider theme={theme}>
        <QueryProvider>
          <NextAuthProvider>
            <MessageStatusProvider>
              <MessageReadStatusProvider>
                <Header />

                <main className={`${pathname==="/" || isPropertyPage ?"":"min-h-[90vh] container max-w-screen-2xl   m-auto mt-2 max-md:p-4 p-7"}`}>
                  {children}
                </main>

                <Footer />
              </MessageReadStatusProvider>
            </MessageStatusProvider>
          </NextAuthProvider>
        </QueryProvider>
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default Layout;
