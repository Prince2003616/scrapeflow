"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { WorkflowStatus } from "@/types/workflow";
import { Workflow } from "@prisma/client";
import {
  FileTextIcon,
  MoreVerticalIcon,
  PlayIcon,
  ShuffleIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState, useCallback } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TooltipWrapper from "@/components/TooltipWrapper";
import DeleteWorkflowDialog from "./DeleteWorkflowDialog";

const statusColors: Record<WorkflowStatus, string> = {
  [WorkflowStatus.DRAFT]: "bg-primary/20 text-primary",
  [WorkflowStatus.PUBLISHED]: "bg-primary",
};

type WorkflowCardProps = {
  workflow: Workflow;
};

function WorkflowCard({ workflow }: WorkflowCardProps) {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;

  return (
    <Card className="border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30">
      <CardContent className="p-4 flex items-center justify-between h-[100px]">
        <div className="flex items-center justify-end space-x-3">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              statusColors[workflow.status as WorkflowStatus]
            )}
          >
            {isDraft ? (
              <FileTextIcon className="h-5 w-5" />
            ) : (
              <PlayIcon className="h-5 w-5 text-white" />
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-muted-foreground flex items-center">
              <Link
                href={`/workflow/editor/${workflow.id}`}
                className="flex items-center hover:underline"
              >
                {workflow.name}
              </Link>
              {isDraft && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-primary/30 text-primary rounded-full">
                  Draft
                </span>
              )}
            </h3>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              "flex items-center gap-2"
            )}
          >
            <ShuffleIcon size={16} />
            Edit
          </Link>
          <WorkflowActions workflowName={workflow.name} workflowId={workflow.id} />
        </div>
      </CardContent>
    </Card>
  );
}

type WorkflowActionsProps = {
  workflowName: string;
  workflowId: string;
};

function WorkflowActions({ workflowName, workflowId }: WorkflowActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteClick = useCallback(() => {
    setShowDeleteDialog(true);
  }, []);

  return (
    <>
      {/* Delete Confirmation Dialog */}
      <DeleteWorkflowDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        workflowName={workflowName}
        workflowId={workflowId}
      />

      {/* Dropdown Menu with Tooltip */}
      <DropdownMenu>
        <TooltipWrapper content="More options">
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <MoreVerticalIcon size={18} />
            </Button>
          </DropdownMenuTrigger>
        </TooltipWrapper>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-2 text-destructive"
            onClick={handleDeleteClick} // Use onClick instead of onSelect
          >
            <TrashIcon size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default WorkflowCard;
