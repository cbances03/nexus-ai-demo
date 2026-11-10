import type { Metadata } from "next";
import { Dashboard } from "@/components/dashboard";
import { toolIds, type ToolId } from "@/lib/data";
export const metadata: Metadata = { title: "Workspace demo" };
export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ tool?: string }>;
}) {
  const { tool } = await searchParams;
  return (
    <Dashboard
      initialTool={
        tool && toolIds.includes(tool) ? (tool as ToolId) : undefined
      }
    />
  );
}
