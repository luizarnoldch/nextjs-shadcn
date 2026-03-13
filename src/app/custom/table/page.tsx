import TableExample from "./(components)/table-example";
import TableComplex from "./(components)/table-complex";

import TableDesign from "./(components)/table-design";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full h-screen">
      <div className="w-4/5 h-screen mx-auto">
        <TableExample />
      </div>
      <div className="w-4/5 h-screen mx-auto">
        <TableComplex />
      </div>
      <div className="w-4/5 h-screen mx-auto">
        <TableDesign />
      </div>
    </div>
  );
};

export default page;
