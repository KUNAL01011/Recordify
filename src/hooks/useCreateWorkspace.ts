import { createWorkspace } from "@/actions/workspaces";
import { useMutationData } from "./useMutationData";
import useZodForm from "./useZodForm";
import { workspaceSchema } from "@/components/forms/workspace-form/schema";

export const useCreateWorkspace = () => {
    const {mutate, isPending} = useMutationData(
        ['create-workspace'],
        (data:{name:string}) => createWorkspace(data.name),
        'user-workspace'
    )

    const {errors,onFormSubmit,register} = useZodForm(workspaceSchema,mutate);
    return {errors,onFormSubmit,register,isPending}
}