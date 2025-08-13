import { FormHeader } from "./_components/FormHeader";

interface Params {
    params : Promise<{formId:string}>
}

export default async function FormEdit({params}:Params){
    const {formId} = await params;

    return (
        <div className="w-full h-full">
            <FormHeader/>
        </div>
    )
}