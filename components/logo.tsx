import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import Link from "next/link";

export default function BuiltAnyCVLogo({
  className,
  ...props
}: React.ComponentProps<"a"> & {
  className?: ClassValue;
}) {
  return (
    <Link
      href={props.href || "/"}
      className={cn("-m-1.5 p-1.5 font-semibold text-xl text-slate-900", className)}
      {...props}
    >
      built<span className="text-primary">any</span>cv
    </Link>
  );
}
