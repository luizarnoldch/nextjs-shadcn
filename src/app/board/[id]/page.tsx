import Link from "next/link";
import React from "react";

type Props = { params: { id: string } };

const page = ({ params }: Props) => {
  return (
    <div className="w-full flex flex-col gap-8">
      <Link href="/">Index</Link>

      <p>My Post: {params.id}</p>
    </div>
  );
};

export default page;
