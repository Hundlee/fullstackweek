import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import Header from "@/app/_components/header";
import BarbershopDetails from "./_components/barbershop-details";
import { notFound } from "next/navigation";

interface BarbershopDetailsPageProps {
    params: {
        id?: string;
    };
}

const BarbershopDetailsPage = async ({
    params,
}: BarbershopDetailsPageProps) => {
    const session = await getServerSession(authOptions);

    if (!params.id) {
        return notFound();
    }

    const barbershop = await db.barberShop.findUnique({
        where: {
            id: params.id,
        },
        include: {
            services: true,
        },
    });

    if (!barbershop) {
        return notFound();
    }

    return (
        <div>
            <div className="hidden lg:block">
                <Header />
            </div>

            <div className="flex lg:px-10 2xl:px-32 justify-between lg:gap-8 lg:pt-8">
                <div className="w-full lg:min-w-[60vw]">
                    <BarbershopInfo barbershop={barbershop} />
                    <div className="mt-6 px-5 md:px-10 lg:px-0">
                        <h2>Serviços</h2>
                    </div>
                    <div className="flex px-5 lg:px-0  md:px-10 flex-col gap-4 py-6 lg:grid lg:grid-cols-1 2xl:grid-cols-2">
                        {barbershop.services.map((service: any) => (
                            <ServiceItem
                                key={service.id}
                                barbershop={barbershop}
                                service={service}
                                isAuthenticated={!!session?.user}
                            />
                        ))}
                    </div>
                </div>

                <div className="w-full hidden lg:block ">
                    <BarbershopDetails barbershop={barbershop} />
                </div>
            </div>
        </div>
    );
};

export default BarbershopDetailsPage;
