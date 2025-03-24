// import LoginButton from "@/app/components/shared/LoginButton";
// import Image from "next/image";

// export default function SignInPage({searchParams}) {
//   console.log(searchParams);
  
//   const callbackUrlParam=searchParams.callbackUrl
//   return (
//     <div className="flex justify-center items-center min-h-[90vh]  bg-gray-50 ">
//       <div className="bg-white shadow-sm border-1 rounded-lg p-10 w-full max-w-sm mb-12 ">
//         <div className="flex flex-col items-center">
//           <h1 className="text-xl font-semibold mb-4">
//             Sign in to your account
//           </h1>
//           <div className="flex items-center gap-3 w-full">
//             <Image
//               src="/logo_google_g.png"
//               alt="Google Logo"
//               height={48}
//               width={48}
//             />

//             <LoginButton callbackUrlParam={callbackUrlParam} googleBtn>Sign in with Google</LoginButton>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export const dynamic = "force-dynamic";


  import LoginButton from "@/app/components/shared/LoginButton";
  import Image from "next/image";

import React from 'react';

const page = ({searchParams}) => {
 
    const callbackUrlParam=searchParams.callbackUrl
      return (
        <div className="flex justify-center items-center min-h-[90vh]  bg-gray-50 ">
          <div className="bg-white shadow-sm border-1 rounded-lg p-10 w-full max-w-sm mb-12 ">
            <div className="flex flex-col items-center">
              <h1 className="text-xl font-semibold mb-4">
                Sign in to your account
              </h1>
              <div className="flex items-center gap-3 w-full">
                <Image
                  src="/logo_google_g.png"
                  alt="Google Logo"
                  height={48}
                  width={48}
                />
    
                <LoginButton callbackUrlParam={callbackUrlParam} googleBtn>Sign in with Google</LoginButton>
              </div>
            </div>
          </div>
        </div>
      );
 
};

export default page;
  export const dynamic = "force-dynamic";