import Link from "next/link";
import CarrouselHorizontalArrows from "./(components)/CarrouselHorizontalArrows";
import CarrouselDefault from "./(components)/CarrouselDefault";
import CarrouselSpacing from "./(components)/CarrouselSpacing";
import CarrouselVertical from "./(components)/CarrouselVertical";
import CarrouselWithAPI from "./(components)/CarrouselWithAPI";
import CarrouselWithPlugins from "./(components)/CarrouselWithPlugins";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full flex flex-col gap-8">
      <Link href="/">Index</Link>

      <div>
        <h1>Carrousel default</h1>
        <div className="w-full flex items-center justify-center">
          <CarrouselDefault />
        </div>
      </div>

      <div>
        <h1>Carrousel with horizontal arrows</h1>
        <div className="w-full flex items-center justify-center">
          <CarrouselHorizontalArrows />
        </div>
      </div>

      <div>
        <h1>Carrousel with spacing</h1>
        <div className="w-full flex items-center justify-center">
          <CarrouselSpacing />
        </div>
      </div>

      <div>
        <h1>Carrousel vertical</h1>
        <div className="w-full flex items-center justify-center">
          <CarrouselVertical />
        </div>
      </div>

      <div>
        <h1>Carrousel with API</h1>
        <div className="w-full flex items-center justify-center">
          <CarrouselWithAPI />
        </div>
      </div>

      <div>
        <h1>Carrousel with Pluggins</h1>
        <div className="w-full flex items-center justify-center">
          <CarrouselWithPlugins />
        </div>
      </div>
    </div>
  );
};

export default page;
