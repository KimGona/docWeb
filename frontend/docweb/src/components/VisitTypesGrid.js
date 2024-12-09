import TextField from "./TextField";

export default function VisitTypesGrid({visitTypes, onClick, hasDescription=false}) {
    return (
        <div className="grid grid-cols-3 gap-4">
            {visitTypes.map( (visitType, index) =>
            <div key={index}>
                <TextField index={index} text={hasDescription ? visitType.description : visitType} onClick={() => onClick(visitType)}/>
            </div>
            ) }
        </div>
    );
};