"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { BarberShop } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopItemProps {
    barbershop: BarberShop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
    const router = useRouter();

    const handleBookingClick = () => {
        router.push(`/barbershops/${barbershop.id}`);
    };

    return (
        <Card className="min-w-[167px] max-w-[167px] rounded-2xl sm:min-w-[250px] ">
            <CardContent className="px-1 py-0 pt-1">
                <div className="px-1 w-full h-[159px] relative sm:h-[250px]">
                    <div className="absolute top-2 left-2 z-50">
                        <Badge
                            variant="secondary"
                            className="flex gap-1 items-center top-2 left-2 opacity-90"
                        >
                            <StarIcon
                                size={12}
                                className="fill-primary text-primary"
                            />
                            <span className="text-xs">5,0</span>
                        </Badge>
                    </div>
                    <Image
                        src={barbershop.imageUrl}
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-2xl"
                        alt={barbershop.name}
                    />
                </div>

                <div className="px-2 pb-3">
                    <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">
                        {barbershop.name}
                    </h2>
                    <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">
                        {barbershop.address}
                    </p>
                    <Button
                        variant="secondary"
                        className="w-full mt-3"
                        onClick={handleBookingClick}
                    >
                        Reservar
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default BarbershopItem;
