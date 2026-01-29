import { AppSidebar } from "@/components/layout/app-sidebar";
import { ModeToggle } from "@/components/layout/ModeToggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.service";

export default async function DashBoardLayout({
  admin,
  user,
}: {
  admin: React.ReactNode;
  user: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  const userInfo = data?.user;

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
   

            <BreadcrumbList>
            
                <ModeToggle></ModeToggle>
        
            </BreadcrumbList>
    
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo.role === Roles.admin ? admin : user}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
