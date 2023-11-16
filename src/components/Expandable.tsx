import { ExternalLink } from "lucide-react";
import Link from "next/link";
import {
  Children,
  FunctionComponent,
  PropsWithChildren,
  ReactNode,
  isValidElement,
} from "react";

export default function Expandable({
  href,
  badges,
  children,
}: {
  href?: string;
  badges?: string[];
  children: ReactNode;
}) {
  let Title: ReactNode;
  let Content: ReactNode;
  Children.forEach(children, (child) => {
    if (isValidElement(child) && typeof child.type === "function") {
      if ((child.type as FunctionComponent).displayName === "ExpandableTitle") {
        Title = child;
      } else if (
        (child.type as FunctionComponent).displayName === "ExpandableContent"
      ) {
        Content = child;
      }
    }
  });

  return (
    <div className="group py-6">
      <LinkOrDiv
        href={href}
        linkProps={{ href, target: "__blank" }}
        className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center"
      >
        <div className="flex gap-2 items-center">
          {Title}
          {href && (
            <ExternalLink className="w-4 sm:onlyhover:opacity-0 sm:onlyhover:group-hover:opacity-100 sm:onlyhover:transition-opacity" />
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          {badges &&
            badges.map((badge, i) => (
              <div
                key={i}
                className="inline-block py-1 px-3 text-xs bg-gray-100 rounded-full"
              >
                {badge}
              </div>
            ))}
        </div>
      </LinkOrDiv>
      {Content}
    </div>
  );
}

function LinkOrDiv({
  href,
  linkProps,
  divProps,
  className,
  children,
}: {
  href?: string;
  linkProps?: Record<string, unknown>;
  divProps?: Record<string, unknown>;
  className?: string;
  children: ReactNode;
}) {
  if (href) {
    return (
      <Link href={href} {...linkProps} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <div {...divProps} className={className}>
      {children}
    </div>
  );
}

export function ExpandableTitle({ children }: PropsWithChildren) {
  return <h3 className="text-lg font-medium">{children}</h3>;
}
ExpandableTitle.displayName = "ExpandableTitle";

export function ExpandableContent({ children }: PropsWithChildren) {
  return (
    <div className="pt-2 sm:onlyhover:max-w-4xl sm:grid sm:onlyhover:grid-rows-[0fr] sm:onlyhover:group-hover:grid-rows-[1fr] sm:onlyhover:transition-all">
      <div className="sm:overflow-hidden">{children}</div>
    </div>
  );
}
ExpandableContent.displayName = "ExpandableContent";
