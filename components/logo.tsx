import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import Link from "next/link";

export default function BuildAnyCVLogo({
  className,
  ...props
}: React.ComponentProps<"a"> & {
  className?: ClassValue;
}) {
  return (
    <Link
      href={props.href || "/"}
      className={cn(
        "-m-1.5 p-1.5 text-xl font-semibold text-foreground",
        className
      )}
      {...props}
    >
      build<span className="text-primary">any</span>cv
    </Link>
  );
}
