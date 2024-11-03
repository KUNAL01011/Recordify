"use client";
import { getNotifications } from "@/actions/user";
import { getWorkspaces } from "@/actions/workspaces";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MENU_ITEMS } from "@/constants";
import { useQueryData } from "@/hooks/useQueryData";
import { NotificationProps, WorkspaceProps } from "@/types/index.type";
import { Menu, PlusCircle } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Modal from "../modal";
import Search from "../search";
import SidebarItem from "./sidebar-item";
import WorkspacePlaceholder from "./workspace-placeholder";
import GlobalCard from "../global-card";
import Loader from "../loader";
import InfoBar from "../info-bar";

type Props = {
  activeWorkspaceId: string;
};

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();
  const pathName = usePathname();

  // geting data form backend using react query
  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkspaces);
  const { data: notification } = useQueryData(
    ["user-notifications"],
    getNotifications
  );

  // geting data contest file
  const menuItems = MENU_ITEMS(activeWorkspaceId);

  // simply desturcture data
  const { data: workspace } = data as WorkspaceProps;
  const { data: count } = notification as NotificationProps;
  console.log(workspace);
  console.log(count);


  // if we change the workspace this will change the id in url also
  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };

  // checing which workspace is active currently
  const currentWorkspace = workspace.workSpaces.find(
    (s) => s.id == activeWorkspaceId
  );

  const SidebarSection = (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111111] p-4 flex gap-2 justify-start items-center mb-4 absolute top-0 left-0 right-0">
        <Image src="/opal-logo.svg" height={40} width={40} alt="logo" />
        <p className="text-2xl">Opal</p>
      </div>
      <Select
        defaultValue={activeWorkspaceId}
        onValueChange={onChangeActiveWorkspace}
      >
        <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
          <SelectValue placeholder="Select a workspace"></SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-[#111111] backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel>Wrokspaces</SelectLabel>
            <Separator />
            {workspace.workSpaces.map((workspace) => (
              <SelectItem key={workspace.id} value={workspace.id}>
                {workspace.name}
              </SelectItem>
            ))}
            {workspace.members.length > 0 &&
              workspace.members.map(
                (workspace) =>
                  workspace.Workspaces && (
                    <SelectItem
                      value={workspace.Workspaces.id}
                      key={workspace.Workspaces.id}
                    >
                      {workspace.Workspaces.name}
                    </SelectItem>
                  )
              )}
          </SelectGroup>
        </SelectContent>
      </Select>
      {currentWorkspace?.type === "PUBLIC" &&
        workspace.subscription?.plan == "PRO" && (
          <Modal
            trigger={
              <span className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2">
                <PlusCircle
                  size={15}
                  className="text-neutral-800/90 fill-neutral-500"
                />
                <span className="text-neutral-400 font-semibold text-xs">
                  Invite To Workspace
                </span>
              </span>
            }
            title="Invite To Workspace"
            description="Invite other user to your workspace"
          >
            <Search workspaceId={activeWorkspaceId} />
          </Modal>
        )}
      <p className="w-full text-[#9D9D9D] font-bold mt-4">Menu</p>
      <nav>
        <ul className="w-full">
          {menuItems.map((item) => (
            <SidebarItem
              href={item.herf}
              icon={item.icon}
              selected={pathName === item.herf}
              title={item.title}
              key={item.title}
              notifications={
                (item.title === "Notifications" &&
                  count._count &&
                  count._count.notification) ||
                0
              }
            ></SidebarItem>
          ))}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      <p className="w-full text-[#9D9D9D] font-bold mt-4">Workspaces</p>

      {workspace.workSpaces.length === 1 && workspace.members.length === 0 && (
        <div className="w-full mt-[-10px]">
          <p className="text-[#3c3c3c] font-medium text-sm">
            {workspace.subscription?.plan === "FREE"
              ? "Upgrade to create workspaces"
              : "No Workspaces"}
          </p>
        </div>
      )}

      <nav className="w-full">
        <ul className="h-[150px] overflow-auto overflow-x-hidden fade-layer">
          {workspace.workSpaces.length > 0 &&
            workspace.workSpaces.map(
              (item) =>
                item.type !== "PERSONAL" && (
                  <SidebarItem
                    herf={`/dashboard/${item.id}`}
                    selected={pathName === `/dashboard/${item.id}`}
                    title={item.name}
                    notification={0}
                    key={item.name}
                    icon={
                      <WorkspacePlaceholder>
                        {item.name.charAt(0)}
                      </WorkspacePlaceholder>
                    }
                  />
                )
            )}
          {workspace.members.length > 0 &&
            workspace.members.map((item) => (
              <SidebarItem
                herf={`/dashboard/${item.Workspaces.id}`}
                selected={pathName === `/dashboard/${item.Workspaces.id}`}
                title={item.Workspaces.name}
                notification={0}
                key={item.Workspaces.name}
                icon={
                  <WorkspacePlaceholder>
                    {item.Workspaces.name.charAt(0)}
                  </WorkspacePlaceholder>
                }
              />
            ))}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      {workspace.subscription?.plan === "FREE" && (
        <GlobalCard
          title="Upgrade to Pro"
          description="Unlock AI features like transcription AI summary, and more."
          footer={
            <Button className="text-sm w-full">
              <Loader color="#000" state={false}>
                Upgrade
              </Loader>
            </Button>
          }
        ></GlobalCard>
      )}
    </div>
  );
  return (
    <div className="full">
      {/* Info bar */}
      <InfoBar />
      {/* Sheet mobile and desktop */}
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTrigger asChild className="ml-2">
            <Button variant={"ghost"} className="mt-[2px]">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="p-0 w-fit h-full">
            {SidebarSection}
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden h-full">{SidebarSection}</div>
    </div>
  );
};

export default Sidebar;
