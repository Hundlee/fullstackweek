import Header from "../_components/header";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import Greeting from "./_components/greeting";

export default async function Home() {
    const session = await getServerSession(authOptions);

    const [
        barbershops,
        recommendedBarbershops,
        popularBarbershops,
        confirmedBookings,
    ] = await Promise.all([
        db.barberShop.findMany({}),
        db.barberShop.findMany({
            orderBy: {
                id: "asc",
            },
        }),
        db.barberShop.findMany({
            orderBy: {
                id: "desc",
            },
        }),
        session?.user
            ? db.booking.findMany({
                  where: {
                      userId: (session.user as any).id,
                      date: {
                          gte: new Date(),
                      },
                  },
                  include: {
                      service: true,
                      barbershop: true,
                  },
              })
            : Promise.resolve([]),
    ]);

    return (
        <div>
            <Header />

            <div className="pt-5 md:hidden">
                <div className="px-5">
                    <Greeting />
                </div>
                <div className="px-5 mt-6">
                    <Search />
                </div>

                <div className="mt-6 ">
                    {confirmedBookings.length > 0 && (
                        <>
                            <h2 className="pl-5 text-xs mb-3 uppercase text-gray-400 font-bold">
                                Agendamentos
                            </h2>
                            <div className="px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                                {confirmedBookings.map((booking: any) => (
                                    <BookingItem
                                        key={booking.id}
                                        booking={booking}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="hidden md:gap-6 md:flex md:justify-between py-10 px-10 xl:px-32">
                <div className="flex flex-col justify-between">
                    <Greeting />
                    <div className=" w-[40vw]">
                        <Search />
                    </div>

                    <div className=" w-[40vw]">
                        {confirmedBookings.length > 0 && (
                            <>
                                <h2 className=" text-xs mb-3 uppercase text-gray-400 font-bold">
                                    Agendamentos
                                </h2>
                                <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                                    {confirmedBookings.map((booking: any) => (
                                        <BookingItem
                                            key={booking.id}
                                            booking={booking}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="max-w-[40vw]">
                    <h2 className="text-md mb-3 uppercase text-gray-400 font-bold ">
                        Mais visitadas
                    </h2>

                    <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                        {popularBarbershops.map((barbershop: any) => (
                            <div key={barbershop.id}>
                                <BarbershopItem barbershop={barbershop} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-6 px-5 md:px-10 xl:px-32">
                <h2 className="text-xs mb-3 uppercase text-gray-400 font-bold lg:text-lg">
                    Recomendados
                </h2>

                <div className="flex gap-4 overflow-x-scroll scrollbar-none md:scrollbar-thin md:scrollbar-thumb-primary md:scrollbar-track-transparent">
                    {recommendedBarbershops.map((barbershop: any) => (
                        <div key={barbershop.id} className="duration-100">
                            <BarbershopItem barbershop={barbershop} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 px-5 mb-[4.5rem] md:px-10 xl:px-32 relative">
                <h2 className=" text-xs mb-3 uppercase text-gray-400 font-bold lg:text-lg">
                    Populares
                </h2>

                <div className="flex gap-4 overflow-x-scroll scrollbar-none md:scrollbar-thin md:scrollbar-thumb-primary md:scrollbar-track-transparent md:[&::-webkit-scrollbar]:mt-10">
                    {barbershops.map((barbershop: any) => (
                        <div key={barbershop.id}>
                            <BarbershopItem barbershop={barbershop} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
