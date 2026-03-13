import {
  Home,
  Search,
  Inbox,
  Activity,
  User,
  Bookmark,
  DollarSign,
  Settings,
  HelpCircle,
  Mail,
} from "lucide-react";
import { NavItemProps } from "@/types/NavItem";

const navItems: NavItemProps[] = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/search", icon: Search, label: "Search" },
  { href: "/inbox", icon: Inbox, label: "Inbox" },
  { href: "/activity", icon: Activity, label: "Activity" },
  { href: "/accounts", icon: User, label: "Accounts" },
  { href: "/saved", icon: Bookmark, label: "Saved" },
  { href: "/expenses", icon: DollarSign, label: "Expenses" },
  { href: "/billing", icon: Mail, label: "Billing" },
  { href: "/feedback", icon: HelpCircle, label: "Feedback" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default navItems;
