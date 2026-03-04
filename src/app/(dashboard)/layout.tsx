import { Header } from "@/components/layout/header";
import { DashboardSidebar } from "./dashboard-sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex gap-8">
          <DashboardSidebar />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </>
  );
}
