import {
    Bell,
    CreditCard,
    FileDuoToneBlack,
    Home,
    Settings,
  } from "@/components/icons";
  
  export const MENU_ITEMS = (
    workspaceId: string
  ): { title: string; herf: string; icon: React.ReactNode }[] => [
    { title: "Home", herf: `/dashboard/${workspaceId}/home`, icon: <Home /> },
    {
      title: "My Library",
      herf: `/dashboard/${workspaceId}/`,
      icon: <FileDuoToneBlack />,
    },
    {
      title: "Notifications",
      herf: `/dashboard/${workspaceId}/notification`,
      icon: <Bell />,
    },
    {
      title: "Billing",
      herf: `/dashboard/${workspaceId}/billing`,
      icon: <CreditCard />,
    },
    {
      title: "Settings",
      herf: `/dashboard/${workspaceId}/settings`,
      icon: <Settings />,
    },
  ];
  