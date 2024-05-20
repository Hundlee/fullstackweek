"use client";

import SideMenu from "@/app/_components/side-menu";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { BarberShop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopInfoProps {
    barbershop: BarberShop;
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
    const router = useRouter();

    const handleBackClick = () => {
        router.replace("/");
    };

    return (
        <div>
            <div className="h-[250px] w-full relative lg:hidden">
                <Button
                    variant="outline"
                    size="icon"
                    className="z-50 top-4 left-4 absolute"
                    onClick={handleBackClick}
                >
                    <ChevronLeftIcon />
                </Button>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="z-50 top-4 right-4 absolute"
                        >
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>

                    <SheetContent className="p-0">
                        <SideMenu></SideMenu>
                    </SheetContent>
                </Sheet>

                <Image
                    src={barbershop.imageUrl}
                    fill
                    alt={barbershop.name}
                    className="opacity-85 object-cover"
                />
            </div>

            <div>
                <div className="hidden lg:block w-full h-[650px] relative">
                    <Image
                        src="/barbershop.jpg"
                        fill
                        alt={barbershop.name}
                        className="object-cover lg:rounded-lg"
                    />
                </div>

                <div className="px-5 md:px-10 pt-3 pb-6 border-b border-solid border-secondary lg:px-0 lg:hidden">
                    <h1 className="text-xl font-bold">{barbershop.name}</h1>
                    <div className="flex items-center gap-1 mt-2">
                        <MapPinIcon className="text-primary" size={18} />
                        <p className="text-sm">{barbershop.address}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                        <StarIcon className="text-primary" size={18} />
                        <p className="text-sm">5,0 (389 avaliações)</p>
                    </div>
                </div>

                <div className="hidden px-5 md:px-10 pt-3 pb-6 border-b border-solid border-secondary lg:px-0 lg:flex lg:justify-between">
                    <div className=" pt-6">
                        <h1 className="text-2xl font-bold">
                            {barbershop.name}
                        </h1>
                        <div className="flex items-center gap-1 mt-2">
                            <MapPinIcon className="text-primary" size={18} />
                            <p className="text-sm">{barbershop.address}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-1 bg-secondary rounded-lg p-5 mt-6">
                        <div className="text-xl flex items-center gap-1">
                            <StarIcon
                                className="text-primary fill-primary"
                                size={18}
                            />
                            5,0
                        </div>
                        <span>389 avaliações</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BarbershopInfo;
