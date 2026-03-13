import { FC } from "react";
import Image from "next/image";
import { ToggleNavProps } from "@/types/NavItem";

const ProfileSection: FC<ToggleNavProps> = ({ isOpen }) => {
  return (
    isOpen && (
      <div className="flex items-center space-x-2 h-24">
        <Image
          src="/go.png"
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h4 className="">Matthew Jones</h4>
          <span className="text-gray-400 text-sm">mattjones@gmail.com</span>
        </div>
      </div>
    )
  );
};

export default ProfileSection;
