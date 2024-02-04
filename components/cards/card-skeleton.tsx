import { Skeleton } from "../ui/skeleton";

type CardSkeletonVariant = "small" | "medium" | "large";

export function CardSkeleton( { variant = "small", wide = false }: { variant?: CardSkeletonVariant, wide?: boolean}) {

  const smallSkeleton = (
    <>
      <div className="space-y-2">
        <Skeleton className={`h-6 ${ wide ? "w-[60vw]" : "w-[20vw]"}`} />
        <Skeleton className={`h-6 ${ wide ? "w-[40vw]" : "w-[15vw]"}`} />
      </div>
      <Skeleton className={`h-[20vh] ${ wide ? "w-[60vw]" : "w-[20vw]"} rounded-xl`} />
    </>
  )

  let mediumSkeleton = (
    <>
      <div className="space-y-2">
        <Skeleton className={`h-6 ${ wide ? "w-[60vw]" : "w-[25vw]"}`} />
        <Skeleton className={`h-6 ${ wide ? "w-[40vw]" : "w-[20vw]"}`} />
      </div>
      <Skeleton className={`h-[30vh] ${ wide ? "w-[60vw]" : "w-[25vw]"} rounded-xl`} />
    </>
  )
  
  let largeSkeleton = (
    <>
      <div className="space-y-2">
        <Skeleton className={`h-6 ${ wide ? "w-[60vw]" : "w-[30vw]"}`} />
        <Skeleton className={`h-6 ${ wide ? "w-[40vw]" : "w-[25vw]"}`} />
      </div>
      <Skeleton className={`h-[50vh] ${ wide ? "w-[60vw]" : "w-[30vw]"} rounded-xl`} />
    </>
  )

  return (
    <div className={`flex flex-col space-y-3 ${wide ? "w-[90vw]" : "w-[20vw]"}`}>
      {variant === "small" && smallSkeleton}
      {variant === "medium" && mediumSkeleton}
      {variant === "large" && largeSkeleton}
    </div>
  )
}