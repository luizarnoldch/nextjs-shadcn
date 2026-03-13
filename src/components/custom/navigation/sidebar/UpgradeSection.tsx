import { FC } from "react";
import { ToggleNavProps } from "@/types/NavItem";

const UpgradeSection: FC<ToggleNavProps> = ({ isOpen }) => {
  return (
    isOpen && (
      <div className="bg-gray-800 p-4 rounded mb-4">
        <p>Free trial ends soon</p>
        <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
          <div className="bg-purple-500 h-2 rounded-full w-1/2"></div>
        </div>
        <button className="mt-4 w-full bg-purple-600 py-2 rounded">
          Upgrade Plan
        </button>
      </div>
    )
  );
};

export default UpgradeSection;
