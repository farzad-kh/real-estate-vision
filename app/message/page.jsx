import MessageContainer from "../components/template/MessageContainer";

const Page = () => {
  return <MessageContainer />;
};
export const revalidate = 60;
export default Page;
export const metadata = {
  title: 'Inbox - Received Messages | Home Vision',
  description: 'Check your received messages from property owners and renters on Home Vision. Stay connected and manage your conversations.',
  robots: 'noindex, nofollow',
};
