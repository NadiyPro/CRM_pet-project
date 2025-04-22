import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Final project NadiyPro",
  description: "Final project NadiyPro",
};

type Props = { children: React.ReactNode }

const ordersLayout= ({children}: Props) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default ordersLayout;