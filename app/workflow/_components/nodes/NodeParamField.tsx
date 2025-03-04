"use client";

import { TaskParam } from '@/types/task';

function NodeParamField({param}: {param: TaskParam}) {
  switch (param.type) {
    default: 
    return <div className="w-full">
      <p className="text-xs text-muted-foreground">Not Implenmented</p>
    </div>
  }
}

export default NodeParamField