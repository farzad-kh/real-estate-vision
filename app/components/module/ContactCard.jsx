
import React from "react";

import ContactBtn from "./ContactBtn";
import LocationProperty from "./LocationProperty";
import SharedBtn from "./SharedBtn";
import BookmarkBtn from "./BookmarkBtn";
import BottomBar from "./BottomBar";
const ContactCard = ({
  propertyDetails: {
    rates,
    squareCm,
    sleep,
    bedrooms,
    location,
    id,
    name,
    owner,
    hasSentMessage,
    userId,
  },
}) => {
  return (
    <>
      <div className="w-full flex justify-end contact-card-max ">
        <div className="border shadow-sm   w-3/4 min-w-[340px]   rounded-lg p-5  ">
          <div id="contact-card-btn" className="flex justify-between ">
            <SharedBtn name={name} id={id}>Shared</SharedBtn>
            <BookmarkBtn id={id}>Bookmark</BookmarkBtn>
          </div>
          <div className="w-full h-[1px] bg-slate-200 mt-2"></div>
          <ul className="flex gap-1 mt-2">
            <li className="font-semibold">{squareCm} m²</li>
            {"∙"}
            <li className=" font-semibold">{bedrooms} bedroom</li>
            {"∙"}
            <li className=" font-semibold">{sleep} sleep</li>
          </ul>
          <div className="mb-4 mt-1 flex ">
            <LocationProperty ContactCard location={location} />
          </div>
          <ContactBtn
            rates={rates}
            id={id}
            owner={owner}
            hasSentMessage={hasSentMessage}
            userId={userId}
          />
          <div className="flex justify-between items-center  mt-4">
            <span className="font-semibold text-gray-700">Price per night</span>
            <span className="font-semibold text-lg">
              ${rates?.night.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <BottomBar
        rates={rates}
        id={id}
        owner={owner}
        hasSentMessage={hasSentMessage}
        userId={userId}
      />
    </>
  );
};

export default ContactCard;
