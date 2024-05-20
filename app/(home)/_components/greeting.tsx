import { authOptions } from "@/app/_lib/auth";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getServerSession } from "next-auth";

const Greeting = async () => {
    const session = await getServerSession(authOptions);

    return (
        <div>
            <h2 className="text-xl font-bold lg:text-2xl">
                {session?.user
                    ? `Olá, ${session?.user.name?.split(" ")[0]}!`
                    : `Olá, Faça seu login!`}
            </h2>
            <p className="capitalize text-sm lg:text-lg">
                {format(new Date(), "EEEE',' d 'de' MMMM", {
                    locale: ptBR,
                })}
            </p>
        </div>
    );
};

export default Greeting;
