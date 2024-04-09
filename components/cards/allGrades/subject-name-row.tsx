"use client"
import { LoadingSpinner } from "@/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Subject } from "@/db/schema";
import { catchProblem } from "@/lib/problem";
import { getSubjectById } from "@/lib/services/subject-service";
import { truncateText } from "@/lib/utils";
import { useEffect, useState } from "react";

export function SubjectNameRow({row}: {row: any}) {

  const [subject, setSubject] = useState<Subject>()
  const [truncated, setTruncated] = useState<{truncated: boolean, text: string}>()
  const [loading, setLoading] = useState<boolean>(true)
  
  useEffect(()=>{
    const getSubject = async () => {
      try {
        setLoading(true)
        const subj = catchProblem(await getSubjectById(row.subject_fk!));
        setSubject(subj);
        setTruncated(truncateText(subj.name!, 20))
      }
      finally {
        setLoading(false)
      }
    };
    getSubject()
  }, [row.subject_fk])

  return (
    loading ? 
    <LoadingSpinner className="text-muted-foreground" /> :
    truncated?.truncated ?
      <Tooltip>
        <TooltipTrigger className="text-left ml-4">
          {truncated.text}
        </TooltipTrigger>
        <TooltipContent>
          <p>{subject?.name}</p>
        </TooltipContent>
      </Tooltip> :
     <p className="ml-4">{subject?.name}</p>
  )
  
}