import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

type Props = {};

const DefaultHero = (props: Props) => {
  return (
    <section
      className="h-dvh flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg-hero.png')" }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-6">
        <div className="text-left max-w-lg">
          <h1 className="">Your Hero Title</h1>
          <p className="mt-4 text-lg text-white">
            Your subtitle or a brief description that supports the title.
          </p>
          <Button
            variant={"ghost"}
            size={"lg"}
            className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Call to Action
          </Button>
        </div>
        <div className="mt-8 md:mt-0 md:ml-6">
          <Image
            src="/images/hero.png"
            alt="Reference Image"
            width={500}
            height={500}
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default DefaultHero;
