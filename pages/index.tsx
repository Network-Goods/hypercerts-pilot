import dynamic from "next/dynamic";

const Page = dynamic(() => import("../components/Browse"), { ssr: false });
export default Page;
