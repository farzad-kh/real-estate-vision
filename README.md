# Real Estate Homevision 🏠

A full-featured real estate listing platform for posting and discovering properties.

![Homepage Screenshot](https://res.cloudinary.com/drjhkyxst/image/upload/v1744280536/homevision_k7vnvh.png)

Users can:

- Post property ads with images (hosted via **Cloudinary**)
- Contact property owners via messages
- Mark messages as read / delete them
- Receive notifications when their messages are read (real-time via **Socket.IO**)
- Bookmark properties
- Edit or delete their own listings
- Access full message & bookmark history via a personal dashboard

Advanced server-side filtering is implemented using **Prisma**, and search is handled through a combination of **SSR and CSR** using **React Query**. Pagination is implemented across all key sections.  
All UI/UX design and backend development were fully implemented by me.

---

## 🛠 Tech Stack

- **Next.js** (App Router)
- **React Query**
- **NextAuth**
- **MongoDB** + **Prisma**
- **Cloudinary** (image CDN)
- **TailwindCSS**
- **Ant Design**
- **React Hook Form** + **Zod**
- **REST API** with **Axios**
- **Node.js**
- **Socket.IO** (for real-time notifications)

---

## ✨ Features

- **Post & Search Listings** – Users can create and search real estate listings.
- **Image Upload via Cloudinary** – Fast and reliable CDN image hosting.
- **Messaging System** – Users can contact property owners and receive real-time read receipts.
- **Real-time Notifications** – Built with Socket.IO (Available in local dev only due to Vercel limitations).
- **Edit/Delete Listings** – Full control over user-created listings.
- **Bookmarking** – Save properties for later.
- **Message History** – Keep track of all sent and received messages.
- **Advanced Filtering** – Server-side filtering powered by Prisma.
- **SSR + CSR Search** – Smart search via React Query & Next.js.
- **Pagination** – Implemented across all key sections.
- **User Dashboard** – Manage listings, bookmarks, and messages.

---

## 🚀 Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/farzad-kh/real-estate-vision.git
cd real-estate-vision
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
