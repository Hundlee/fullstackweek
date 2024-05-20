import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import { CalendarDaysIcon, MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./side-menu";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { LoginButton, UserPerfil } from "./header-perfil";
import { User } from "@prisma/client";

const Header = async () => {
    const session = await getServerSession(authOptions);

    return (
        <header>
            <Card>
                <CardContent className="p-5 justify-between flex flex-row items-center md:px-10 xl:px-32">
                    <Link href={"/"}>
                        <Image
                            src="/logo.png"
                            alt="FSW Barber"
                            height={22}
                            width={120}
                        />
                    </Link>
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant={"outline"} size="icon">
                                    <MenuIcon size={16} />
                                </Button>
                            </SheetTrigger>

                            <SheetContent className="p-0">
                                <SideMenu></SideMenu>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <div className="hidden md:flex md:gap-2">
                        <Button
                            className="gap-2 text-white xl:text-sm font-normal hover:bg-transparent"
                            variant="ghost"
                            asChild
                        >
                            <Link href="/bookings">
                                <CalendarDaysIcon />
                                Agendamentos
                            </Link>
                        </Button>

                        <div className="flex items-center gap-2">
                            {session?.user ? (
                                <UserPerfil user={session.user as User} />
                            ) : (
                                <LoginButton />
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </header>
    );
};

export default Header;
