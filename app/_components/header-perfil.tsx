"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { User } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog";

interface UserPerfilProps {
    user: User;
}

export const UserPerfil = ({ user }: UserPerfilProps) => {
    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger className="flex items-center gap-2">
                <Avatar className="h-7 w-7 xl:h-9 xl:w-9">
                    <AvatarImage
                        src={user.image as string}
                        alt={user.name as string}
                    />
                </Avatar>
                <h2 className="xl:text-sm">{user.name}</h2>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Sair</AlertDialogTitle>
                    <AlertDialogDescription>
                        Deseja sair da plataforma?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSignOut}>
                        Sair
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export const LoginButton = () => {
    const handleLogin = async () => {
        await signIn("google");
    };

    return <Button onClick={handleLogin}>Logar</Button>;
};
