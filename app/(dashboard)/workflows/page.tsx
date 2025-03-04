"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { GetWorkflowsForUsers } from "@/action/workflows/getWorkflowsForUsers";
import { AlertCircle, InboxIcon } from "lucide-react";
import CreateWorkflowDialog from "./_components/CreateWorkflowDialog";
import WorkflowCard from "./_components/WorkflowCard";

function Page() {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflow</h1>
          <p className="text-muted-foreground">Create a new workflow</p>
        </div>
        <CreateWorkflowDialog />
      </div>

      <div className="h-full py-6">
        <UserWorkflows />
      </div>
    </div>
  );
}

function UserWorkflowSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  );
}

function UserWorkflows() {
  const { data: workflows, error, isLoading } = useQuery({
    queryKey: ["workflows"],
    queryFn: GetWorkflowsForUsers,
  });

  if (isLoading) return <UserWorkflowSkeleton />;

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Failed to fetch workflows</AlertTitle>
        <AlertDescription>
          There was an error fetching your workflows. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!workflows || workflows.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full items-center">
        <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <InboxIcon size={40} className="stroke-primary" />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No workflow created yet</p>
          <p className="text-sm text-muted-foreground">
            Click the button below to create a new workflow
          </p>
        </div>
        <CreateWorkflowDialog triggerText="Create your first workflow" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  );
}

export default Page;
