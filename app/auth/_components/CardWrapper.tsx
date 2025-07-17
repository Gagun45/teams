import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import type { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  title?: string;
  linkHref?: string;
  linkLable?: string;
  cardHeading?: string;
}

const CardWrapper = ({
  children,
  linkHref,
  linkLable,
  title,
  cardHeading,
}: Props) => {
  return (
    <div className="border-2 px-8 md:px-16 rounded-md shadow-2xl min-h-96 flex gap-8 flex-col items-center py-6 max-w-xl mx-auto">
      <div className="flex text-4xl tracking-widest font-bold items-center">
        {cardHeading && <h2>{cardHeading}</h2>}
      </div>
      {title && (
        <h2 className="font-semibold text-2xl tracking-tighter">{title}</h2>
      )}
      {children}
      {linkHref && linkLable && (
        <Link
          href={linkHref}
          className={`${buttonVariants({ variant: "link" })} mt-auto`}
        >
          {linkLable}
        </Link>
      )}
    </div>
  );
};
export default CardWrapper;
