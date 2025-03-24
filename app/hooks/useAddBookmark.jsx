import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddBookmark = ({ id, openNotification, pathname, router }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/bookmarks", { id });

      if (res.data === true) {
        openNotification({
          status: "Property added successfully",
          type: "success",
        });
      }
      if (res.data === false) {
        openNotification({
          status: "Property removed successfully",
          type: "warning",
        });
        pathname === "/dashboard/bookmarks" && router.refresh();
      }

      return res.data;
    },
    onSuccess: () => {

    
        // queryClient.invalidateQueries({ queryKey: ["bookmarks"], exact: true });
 
      
   
    },
  });
};



// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";

// export const useAddBookmark = ({ id, openNotification, pathname, router }) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async () => {
//       const res = await axios.post("/api/bookmarks", { id });

//       if (res.data === true) {
//         openNotification({
//           status: "Property added successfully",
//           type: "success",
//         });
//       }
//       if (res.data === false) {
//         openNotification({
//           status: "Property removed successfully",
//           type: "warning",
//         });
//         pathname === "/dashboard/bookmarks" && router.refresh();
//       }

//       return res.data;
//     },
//     onMutate: async () => {
//       await queryClient.cancelQueries({ queryKey: ["bookmarks"] });
//       const previousBookmarks = queryClient.getQueryData(["bookmarks"]);
     
//       queryClient.setQueryData(["bookmarks"], (old) => {
//         const optimisticBookmark = old?.some((item) => item.propertyId === id);
//         return optimisticBookmark
//           ? old.filter((item) => item.propertyId !== id)
//           : [...(old || []), { propertyId: id }];
//       });

//       return { previousBookmarks };
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["bookmarks"]);
//     },
//   });
// };
