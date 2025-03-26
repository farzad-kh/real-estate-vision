"use client";
import { Button, Popconfirm, Spin, Tooltip } from "antd";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { useAddBookmark } from "@/app/hooks/useAddBookmark";
import { useSession } from "next-auth/react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useNotificationContext } from "@/app/context/NotificationContext";
import { QuestionCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const BookmarkBtn = ({ id, defaultType, children, btnStyle }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || pathname || "/";
  const [loading, setLoading] = useState(false);

  const openNotification = useNotificationContext(); //context Notification wrap
 
  const fetchBookMarks = async () => {
    if (!session) return [];
    const res = await axios.get("/api/bookmarks");
    return await res.data;
  };

  const { data: bookmarks = [], refetch } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: fetchBookMarks,
    staleTime: 50000,
  });

  const useAddBookmarkHook = useAddBookmark({
    id,
    openNotification,
    pathname,
    router,
  });
  const { mutateAsync } = useAddBookmarkHook;

  const bookmarkHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!session) {
      signIn(undefined, { callbackUrl });
      return;
    }

    setLoading(true);
    try {
      await mutateAsync();
      await refetch();
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };
  const isBookmarked = bookmarks.some((item) => item.propertyId === id);
  return (
    <div>
      {isBookmarked ? (
        <BookmarkDeleteBtn
          bookmarkHandler={bookmarkHandler}
          loading={loading}
          defaultType={defaultType}
          pathname={pathname}
          btnStyle={btnStyle}
        >
          {children}
        </BookmarkDeleteBtn>
      ) : (
        pathname !== "/dashboard/bookmarks" && (
          <BookmarkAddBtn
            btnStyle={btnStyle}
            bookmarkHandler={bookmarkHandler}
            defaultType={defaultType}
            loading={loading}
            children={children}
          >
            {children}
          </BookmarkAddBtn>
        )
      )}
    </div>
  );
};

export default BookmarkBtn;

export const BookmarkDeleteBtn = ({
  bookmarkHandler,
  loading,
  defaultType,
  children,
  pathname,
  btnStyle,
}) => {
  return (
    <Tooltip placement="topLeft" title={"❌ Remove Bookmark"}>
      {pathname === "/dashboard/bookmarks" ? (
        <Popconfirm
          placement="topLeft"
          description="Are you sure to delete this bookmark?"
          icon={
            <QuestionCircleOutlined
              style={{
                color: "red",
              }}
            />
          }
          onConfirm={bookmarkHandler}
          onCancel={(event) => event.preventDefault()}
        >
          <Button
            onClick={(event) => event.preventDefault()}
            className={`!font-semibold !p-2 !h-8 ${
              btnStyle && "!bg-white/90 !rounded-full !border-none"
            }`}
            type={defaultType ? "default" : "text"}
            disabled={loading}
          >
            {loading ? (
              <Spin />
            ) : (
              <BsFillBookmarkFill className="items-center text-[1.05rem] fill-[#E63946]  " />
            )}
            {children}
          </Button>
        </Popconfirm>
      ) : (
        <Button
          onClick={bookmarkHandler}
          className={`!font-semibold !p-2 !h-8 ${
            btnStyle && "!bg-white/90 !rounded-full !border-none"
          }`}
          type={defaultType ? "default" : "text"}
          disabled={loading}
        >
          {loading ? (
            <Spin />
          ) : (
            <BsFillBookmarkFill className="items-center text-[1.05rem] fill-[#E63946]  " />
          )}
          {children}
        </Button>
      )}
    </Tooltip>
  );
};

export const BookmarkAddBtn = ({
  bookmarkHandler,
  defaultType,
  loading,
  children,
  btnStyle,
}) => {
  return (
    <Tooltip placement="topRight" title={"Add Bookmark"}>
      <Button
        onClick={bookmarkHandler}
        className={`!font-semibold !p-2 !h-8 ${
          btnStyle && "!bg-white/90 !rounded-full !border-none"
        }`}
        type={defaultType ? "default" : "text"}
        disabled={loading}
      >
        {loading ? (
          <Spin />
        ) : (
          <BsBookmark className="items-center text-[1.05rem]" />
        )}
        {children}
      </Button>
    </Tooltip>
  );
};
