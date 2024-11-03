export type WorkspaceProps = {
    data: {
        subscription: {
            plan: "FREE" | "PRO"
        } | null
        workSpaces: {
            id: string,
            name :string,
            type: "PUBLIC" | "PERSONAL"
        }[]
        members: {
            Workspaces: {
                id:string,
                name : string,
                type: "PUBLIC" | "PERSONAL"
            }
        }[]
    }
}

export type NotificationProps = {
    status: number
    data: {
        _count: {
            notification:number
        }
    }
}