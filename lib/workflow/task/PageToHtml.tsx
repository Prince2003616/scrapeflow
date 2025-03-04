import { TaskType, TaskParamType } from "@/types/task";
import { CodeIcon, LucideProps } from "lucide-react";

export const PageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  label: "Get HTML from page",
  icon: (props: LucideProps) => (
    <CodeIcon className="stroke-rose-500" {...props} />
  ),
  isEntryPoint: true,
  inputs : [
    {
      name: "Web Page",
      type: TaskParamType.BROWSER_INSTANCE,
      required : true,
    }
  ],
};