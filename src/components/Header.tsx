import Link from "next/link";
import Dot from "./Dot";

interface NavItem {
  label: string;
  link: string;
}
const navigationStructure: NavItem[] = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Blog",
    link: "/blog",
  },
  {
    label: "About",
    link: "/about",
  },
  {
    label: "Contact",
    link: "/contact",
  },
];

function Header() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row justify-between">
      <Link href="/" className="flex items-center gap-4">
        <Dot />
        <span>Alexander MP</span>
      </Link>
      <nav>
        <ul className="flex gap-3 justify-between sm:justify-end">
          {navigationStructure.map((navItem) => (
            <li key={navItem.link}>
              <Link
                href={{
                  pathname: navItem.link,
                }}
                aria-label={navItem.label}
              >
                {navItem.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
