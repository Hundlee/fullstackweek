"use client";

import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { BarberShop } from "@prisma/client";
import { PhoneIcon } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { getBusinessHours } from "@/app/barbershops/[id]/_helpers/get-business-hours";

interface BarbershopDetailsProps {
    barbershop: BarberShop;
}

const BarbershopDetails = ({ barbershop }: BarbershopDetailsProps) => {
    const [number, setNumber] = useState("(85) 94543-3421");

    const businessHours = useMemo(() => {
        const weekDays = [
            "Segunda-feira",
            "Terça-feira",
            "Quarta-feira",
            "Quinta-feira",
            "Sexta-feira",
            "Sábado",
            "Domingo",
        ];

        return weekDays.map((day) => ({
            day,
            hours: getBusinessHours(day),
        }));
    }, []);

    const handleCopyNumber = () => {
        navigator.clipboard.writeText(number);
    };

    return (
        <Card className="rounded-lg">
            <CardContent>
                <div className="relative h-[180px] w-full mt-6">
                    <Image
                        src="/barbershop-map.png"
                        fill
                        alt={barbershop.name}
                        style={{ borderRadius: "10px" }}
                    />

                    <div className="w-full absolute bottom-4 left-0 px-5">
                        <Card className="rounded-md">
                            <CardContent className="p-3 flex gap-2">
                                <Avatar>
                                    <AvatarImage src={barbershop.imageUrl} />
                                </Avatar>

                                <div>
                                    <h2 className="font-bold">
                                        {barbershop.name}
                                    </h2>
                                    <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">
                                        {barbershop.address}
                                    </h3>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="pt-6">
                    <h2 className="font-semibold text-white uppercase">
                        Sobre nós
                    </h2>
                    <span className="text-muted-foreground text-sm">
                        Bem-vindo à {barbershop.name}, onde a tradição encontra
                        estilo. Nossa equipe de mestres barbeiros transforma
                        cortes de cabelo e barbas em obras de arte. Em um
                        ambiente acolhedor, promovemos confiança, estilo e uma
                        comunidade unida.
                    </span>
                </div>

                <div className="pt-6">
                    <Separator />
                </div>

                <div className="flex items-center justify-between pt-6">
                    <div className="flex items-center gap-2">
                        <PhoneIcon />
                        <h3 className="font-normal">{number}</h3>
                    </div>
                    <Button variant="outline" onClick={handleCopyNumber}>
                        Copiar
                    </Button>
                </div>
                <div className="flex items-center justify-between pt-3">
                    <div className="flex items-center gap-2">
                        <PhoneIcon />
                        <h3 className="font-normal">{number}</h3>
                    </div>
                    <Button variant="outline" onClick={handleCopyNumber}>
                        Copiar
                    </Button>
                </div>

                <div className="pt-6">
                    <Separator />
                </div>

                <div className="pt-6">
                    <h3 className="font-semibold text-white uppercase">
                        Horário de Funcionamento
                    </h3>

                    <div className="flex flex-col gap-3 py-3 pt-6">
                        {businessHours.map(({ day, hours }) => (
                            <div key={day} className="flex justify-between">
                                <span>{day}</span>
                                <span>
                                    {hours.open} {hours.open && <span>-</span>}
                                    {hours.close}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default BarbershopDetails;
