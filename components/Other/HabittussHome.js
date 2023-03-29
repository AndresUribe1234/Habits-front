import Link from "next/link";

const HabittusHome = () => {
  return (
    <div>
      <h1>Home page</h1>
      <Link href={"/termsofservice"}>Terms of service</Link>
    </div>
  );
};

export default HabittusHome;
