import { NavItem } from "@/lib/types";
import { FileStack, MessageCircleHeart, Settings } from "lucide-react";

export const marketingNav: NavItem[] = [
  {
    name: "Templates",
    href: "/templates",
    variant: "ghost"
  },
  { name: "Pricing", href: "/pricing", variant: "ghost" },
  {
    name: "Guides",
    href: "/guides",
    variant: "ghost"
  }
];

export const dashboardNav: NavItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    variant: "ghost",
    icon: FileStack
  },
  {
    name: "Account Settings",
    href: "/dashboard/account",
    variant: "ghost",
    icon: Settings
  },
  {
    name: "Feedback",
    href: "https://builtanycv.userjot.com/",
    variant: "ghost",
    icon: MessageCircleHeart
  }
];

export const sidebarNav: NavItem[] = [
  {
    name: "My Profiles",
    href: "/dashboard",
    variant: "ghost",
    icon: FileStack
  },
  {
    name: "Account Settings",
    href: "/dashboard/account",
    variant: "ghost",
    icon: Settings
  }
];
