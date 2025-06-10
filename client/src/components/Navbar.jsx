import { Menu, School } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  // State to track scroll position to show Explore button
  const [showExploreBtn, setShowExploreBtn] = useState(false);

  // Scroll handler to toggle button visibility after 300px scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowExploreBtn(true);
      } else {
        setShowExploreBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 bg-white text-black border-b border-gray-200
      dark:bg-gradient-to-r dark:from-pink-600 dark:to-indigo-800 dark:text-white dark:border-transparent
      duration-300 h-16 flex items-center px-4"
    >
      {/* Left - Logo */}
      <div className="flex items-center gap-2 flex-1">
        <School size={30} />
        <Link to="/">
          <h1 className="hidden md:block font-extrabold text-2xl">E-Learning</h1>
        </Link>
      </div>

      {/* Center - Explore Courses Button (shows only after scroll) */}
      <div className="flex-1 flex justify-center">
        {showExploreBtn && (
          <Button
            onClick={() => navigate(`/course/search?query`)}
            className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200 px-6 py-2"
          >
            Explore Courses
          </Button>
        )}
      </div>

      {/* Right - User, DarkMode, etc */}
      <div className="flex items-center gap-8 flex-1 justify-end">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={user?.photoUrl || "https://github.com/shadcn.png"}
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link to="my-learning">My learning</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="profile">Edit Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logoutHandler}>Log out</DropdownMenuItem>
              </DropdownMenuGroup>
              {user?.role === "instructor" && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/admin/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button onClick={() => navigate("/login")}>Signup</Button>
          </div>
        )}
        <DarkMode />
      </div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden items-center justify-between px-4 h-full absolute right-4 top-0">
        <MobileNavbar user={user} />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="rounded-full hover:bg-gray-200" variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>
            <Link to="/">E-Learning</Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4">
          <Link to="/my-learning">My Learning</Link>
          <Link to="/profile">Edit Profile</Link>
          <p>Log out</p>
        </nav>
        {user?.role === "instructor" && (
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" onClick={() => navigate("/admin/dashboard")}>
                Dashboard
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
