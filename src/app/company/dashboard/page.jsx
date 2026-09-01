import { redirect } from "next/navigation";

// The dashboard lives at /company; this path only ever held a placeholder.
const Page = () => {
  redirect("/company");
};

export default Page;
