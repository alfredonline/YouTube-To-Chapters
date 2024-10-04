import { Button } from "@/components/ui/button";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

interface NavItemProps {
  href: string;
  label: string;
  mobile?: boolean;
}

interface NavItemsProps {
  session: Session | null;
  mobile?: boolean;
}

interface MobileNavProps {
  session: Session | null;
}
const NavItem: React.FC<NavItemProps> = ({ href, label, mobile = false }) => {
  return (
    <Link
      href={href}
      className={`${
        mobile
          ? "flex w-full items-center py-2 text-lg font-semibold hover:text-primary transition-colors"
          : "text-muted-foreground hover:text-primary transition-colors"
      }`}
      prefetch={false}
    >
      {label}
    </Link>
  );
};

const NavItems: React.FC<NavItemsProps> = ({ session, mobile = false }) => {
  const items: NavItemProps[] = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/about",
      label: "About",
    },
    {
      href: "/pricing",
      label: "Pricing",
    },
    {
      href: "/contact",
      label: "Contact",
    },
  ];

  if (session) {
    items.push(
      {
        href: "/dashboard",
        label: "Dashboard",
      },
      {
        href: "/generate-chapters",
        label: "Generate Chapters",
      }
    );
  }

  return (
    <>
      {items.map((item) => {
        return <NavItem key={item.href} {...item} mobile={mobile} />;
      })}
    </>
  );
};

const MobileNav: React.FC<MobileNavProps> = ({ session }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle mobile menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="w-[300px] sm:w-[400px]"
      >
        <nav className="flex flex-col space-y-4 mt-4">
            <NavItems session={session} mobile={true} />
        </nav>
      </SheetContent>
    </Sheet>
  );
};

const Nav = async () => {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop=filter]:bg-background/60">
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between">
          <MobileNav session={session} />
          <Link
            href="/"
            prefetch={false}
            className="flex items-center space-x-2"
          >
            <span className="text-2xl">📜</span>
            <span className="hidden font-bold sm:inline-block">
              YouTubeToChapters
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <NavItems session={session} />
          </nav>
          <div className="flex items-center space-x-4">
            {session ? (
              <form action={"/api/auth/signout"} method="POST">
                <Button variant={"outline"} size={"sm"}>
                  Sign Out
                </Button>
              </form>
            ) : (
              <Link href="/signin">
                <Button variant={"ghost"} size={"sm"}>
                  Sign in
                </Button>
              </Link>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Nav;
