import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import React from 'react';
import Editor from '../../_components/Editor';

async function Page({ params }: { params: { workflowId?: string } }) {  
  if (!params?.workflowId) return <div>Invalid workflow ID</div>; // Ensure workflowId exists

  const { workflowId } = params; // ❌ Removed 'await' (Not needed)
  const { userId } = await auth(); // ✅ Await is correct here

  if (!userId) return <div>Unauthenticated</div>;

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId, // Ensuring the workflow belongs to the user
    },
  });

  if (!workflow) return <div>Workflow not found</div>;

  return <Editor workflow={workflow} />;
}

export default Page;
