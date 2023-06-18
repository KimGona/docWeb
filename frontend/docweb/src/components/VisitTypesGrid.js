import TextField from "./TextField";

export default function VisitTypesGrid({visitTypes, onClick}) {
    return (
        <div className="grid grid-cols-3 gap-4">
            {visitTypes.map( visitType =>
                <TextField key={visitType.id} text={visitType.description} onClick={() => onClick(visitType)}/>
            ) }
        </div>
    );
};