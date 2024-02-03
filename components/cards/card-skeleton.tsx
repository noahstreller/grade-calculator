import { Skeleton } from "../ui/skeleton";

type CardSkeletonVariant = "small" | "medium" | "large";

export function CardSkeleton( { variant = "small" }: { variant?: CardSkeletonVariant }) {

  if (variant === "small") {
    return (
      <div className="flex flex-col space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-6 w-[20vw]" />
          <Skeleton className="h-6 w-[15vw]" />
        </div>
        <Skeleton className="h-[20vh] w-[20vw] rounded-xl" />
      </div>
    )
  }

  if (variant === "medium") {
    return (
      <div className="flex flex-col space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-6 w-[25vw]" />
          <Skeleton className="h-6 w-[20vw]" />
        </div>
        <Skeleton className="h-[30vh] w-[25vw] rounded-xl" />
      </div>
    )
  }

  if (variant === "large") {
    return (
      <div className="flex flex-col space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-6 w-[30vw]" />
          <Skeleton className="h-6 w-[25vw]" />
        </div>
        <Skeleton className="h-[50vh] w-[30vw] rounded-xl" />
      </div>
    )
  }
}