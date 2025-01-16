"use client";
import { BellIcon, HomeIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton, SignedOut, SignedIn } from "@clerk/nextjs";
import ModeToggle from "./ModeToggle";
import { getProfileByUsername, getUserPosts, updateProfile } from "@/actions/profile.action";
import { usePathname } from "next/navigation";


interface DesktopNavbarClientProps {
    username: string;
}

import { useEffect, useState } from "react";

function DesktopNavbar({ username }: DesktopNavbarClientProps ) {
    const [user, setUser] = useState<Awaited<ReturnType<typeof getProfileByUsername>> | null>(null);

    useEffect(() => {
        async function fetchUser() {
            const userProfile = await getProfileByUsername(username);
            setUser(userProfile);
        }
        fetchUser();
    }, [username]);

    if (!user) return null;
    const pathname = usePathname();
    return (
        <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />

            <Button variant="ghost" className="flex items-center gap-2" asChild>
                <Link href="/">
                    <HomeIcon className="w-4 h-4" />
                    <span className="hidden lg:inline">Home</span>
                </Link>
            </Button>

            {user ? (
            <>
                <SignedIn>
                <Button variant="ghost" className="flex items-center gap-2" asChild>
                    <Link href="/notifications">
                        <BellIcon className="w-4 h-4" />
                        <span className="hidden lg:inline">Notifications</span>
                    </Link>
                </Button>
                <Button variant="ghost" className="flex items-center gap-2">
                    <Link href={`/profile/${user.username}`} >
                    <UserIcon className="w-4 h-4" />
                    <span className="hidden lg:inline">Profile</span>
                    </Link>
                </Button>
                <UserButton />
                </SignedIn>

            </>
            ) : (
            <SignedOut>
                    <SignInButton mode="modal">
                        <Button variant="default">Sign In</Button>
                    </SignInButton>
            </SignedOut>
            )}
        </div>
    );
}
export default DesktopNavbar;