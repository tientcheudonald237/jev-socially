import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { getUserByClerkId } from "@/actions/user.action";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { LinkIcon, MapPinIcon } from 'lucide-react';

async function Sidebar() {
    let authUser  = null;
        try {
            authUser = await currentUser();
        } catch (error) {
            console.error("Failed to fetch current user:", error);
        }
    if (!authUser) return <UnAuthenticatedSidebar />;

    const user = await getUserByClerkId(authUser.id);
    if (!user) return null;

    return (
        <div className="sticky top-20">
            <Card className="bg-white bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-easternBlue/10 via-turquoiseBlue/5 to-fountainBlue/10">
                <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                        <Link
                            href={`/profile/${user.username}`}
                            className="flex flex-col items-center justify-center"
                        >
                            <Avatar className="w-20 h-20 border-2">
                                <AvatarImage src={user?.image || "/avatar.png"} />
                            </Avatar>

                            <div className="mt-4 space-y-1">
                                <h3 className="font-semibold text-genoa">{user.name}</h3>
                                <p className="text-sm text-atoll">@{user.username}</p>
                            </div>
                        </Link>

                        {user.bio && <p className="mt-3 text-sm text-halfBaked">{user.bio}</p>}

                        <div className="w-full">
                            <Separator className="my-4 bg-botticelli" />
                            <div className="flex justify-between">
                                <div>
                                    <p className="font-medium text-genoa">{user._count.following}</p>
                                    <p className="text-xs text-lima">Following</p>
                                </div>
                                <Separator orientation="vertical" className="bg-botticelli" />
                                <div>
                                    <p className="font-medium text-genoa">{user._count.followers}</p>
                                    <p className="text-xs text-lima">Followers</p>
                                </div>
                            </div>
                            <Separator className="my-4 bg-botticelli" />
                        </div>

                        <div className="w-full space-y-2 text-sm">
                            <div className="flex items-center text-orange">
                                <MapPinIcon className="w-4 h-4 mr-2" />
                                {user.location || "No location"}
                            </div>
                            <div className="flex items-center text-orange">
                                <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
                                {user.website ? (
                                    <a href={`${user.website}`} className="hover:underline truncate text-scooter" target="_blank">
                                        {user.website}
                                    </a>
                                ) : (
                                    "No website"
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Sidebar;

const UnAuthenticatedSidebar = () => (
    <div className="sticky top-20">
        <Card className="bg-white bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-easternBlue/10 via-turquoiseBlue/5 to-fountainBlue/10">
            <CardHeader>
                <CardTitle className="text-center text-xl font-semibold text-genoa">Welcome Back!</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-center text-atoll mb-4">
                    Login to access your profile and connect with others.
                </p>
                <SignInButton mode="modal">
                    <Button className="w-full bg-easternBlue hover:bg-scooter text-white" variant="default">
                        Login
                    </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                    <Button className="w-full mt-2 bg-orange hover:bg-orange/90 text-white" variant="default">
                        Sign Up
                    </Button>
                </SignUpButton>
            </CardContent>
        </Card>
    </div>
);