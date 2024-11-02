'use server'

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const onAuthenticateUser = async () => {
    try {
        //To check user session is exist or not in the borwser
        const user = await currentUser();
        if (!user) {
            return { status: 403 }
        }
        const userExist = await client.user.findUnique({
            where: {
                clerkId: user.id,
            },
            include: {
                workSpaces: {
                    where: {
                        user: {
                            clerkId: user.id
                        }
                    },
                },
            }
        })

        if (userExist) {
            return { status: 200, user: userExist };
        }

        // creation of new user in not exist then
        const newUser = await client.user.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: user.imageUrl,
                studio: {
                    create: {},
                },
                subscription: {
                    create: {}
                },
                workSpaces: {
                    create: {
                        name: `${user.firstName}'s Workspace`,
                        type: "PERSONAL"
                    }
                },
            },
            include: {
                workSpaces: true,
                subscription: true
            },
        });

        if (newUser) {
            return { status: 201, user: newUser }
        }
        return { status: 400 }
    } catch (error) {
        console.log(error)
        return { status: 500 }
    }
}