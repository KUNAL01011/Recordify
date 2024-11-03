'use server'

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"



export const verifyAccessToWorkspace = async (wrokspaceId: string) => {
    try {
        const user = await currentUser();
        if (!user) return { status: 403 };

        const isUserInWorkspace = await client.workSpace.findUnique({
            where: {
                id: wrokspaceId,
                OR: [
                    {
                        user: {
                            clerkId: user.id,
                        }
                    },
                    {
                        members: {
                            every: {
                                user: {
                                    clerkId: user.id,
                                }
                            }
                        }
                    }
                ]
            }
        })
        return {
            status: 200,
            data: { workspace: isUserInWorkspace },
        }
    } catch (error) {
        console.log(error)
        return {
            status: 403,
            data: { workspace: null }
        }
    }
}

export const getWorkspaceFolders = async (workspaceId: string) => {
    try {
        const isFolders = await client.folder.findMany({
            where: {
                workSpaceId: workspaceId
            },
            include: {
                _count: {
                    select: {
                        videos: true
                    }
                }
            }
        })

        if (isFolders && isFolders.length > 0) {
            return {
                status: 200,
                data: isFolders,
            }
        }
        return { status: 404, data: [] }
    } catch (error) {
        console.log(error)
        return {
            status: 403,
            data: []
        }
    }
}

export const getAllUserVideos = async (workspaceId: string) => {
    try {
        const user = await currentUser();
        if (!user) return { status: 404 }
        const videos = await client.video.findMany({
            where: {
                OR: [{ workSpaceId: workspaceId }, { folderId: workspaceId }]
            },
            select: {
                id: true,
                title: true,
                createdAt: true,
                source: true,
                processing: true,
                folder: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        avatar: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'asc'
            },
        })

        if (videos && videos.length > 0) {
            return { status: 200, data: videos };
        }
        return { status: 404 };
    } catch (error) {
        console.log(error)
        return { status: 404 };
    }
}

export const getWorkspaces = async () => {
    try {
        const user = await currentUser();
        if (!user) return { status: 404 };

        const workSpace = await client.user.findUnique({
            where: {
                clerkId: user.id
            },
            select: {
                subscription: {
                    select: {
                        plan: true,
                    }
                },
                workSpaces: {
                    select: {
                        id: true,
                        name: true,
                        type: true
                    }
                },
                members: {
                    select: {
                        workSpace: {
                            select: {
                                id: true,
                                name: true,
                                type: true,
                            }
                        }
                    }
                }
            }
        })
        if (workSpace) {
            return { status: 200, data: workSpace };
        }
        return { status: 404 };
    } catch (error) {
        console.log(error)
        return { status: 400 };
    }
}


export const createWorkspace = async (name: string) => {
    try {
        const user = await currentUser();
        if (!user) return { status: 404 };

        const authorized = await client.user.findUnique({
            where: {
                clerkId: user.id
            },
            select: {
                subscription: {
                    select: {
                        plan: true
                    }
                }
            }
        })

        if (authorized?.subscription?.plan === 'PRO') {
            const workSpace = await client.user.update({
                where: {
                    clerkId: user.id,
                },
                data: {
                    workSpaces: {
                        create: {
                            name,
                            type: "PUBLIC"
                        }
                    }
                }
            })
            if (workSpace) {
                return { status: 401, data: "Worksapce Created" };
            }
        }
        return {
            status: 401,
            data: "You are not authorized to create a worksapce",
        }
    } catch (error) {
        console.log(error)
        return { status: 400 }
    }
}