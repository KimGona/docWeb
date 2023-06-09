import React, { useState, useEffect } from "react";
import SimpleDialog from "./SimpleDialog";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from "../Button";

function isChecked(visitType, chosen) {
    if (chosen.includes(visitType)) return true;
    else return false;
}

function isEqual(object1, object2) {
    return object1.description === object2.description;
}

export default function VisitTypesDialog({ open, onClose, onConfirm, visitTypes, selected }) {
    const [chosenArr, setChosenArr] = useState(selected);
    
    useEffect(() => {
        setChosenArr(selected)
    }, [selected])

    return (
        <SimpleDialog open={open} handleClose={onClose} title="Pick visit types">
            <FormGroup>
                {
                    visitTypes.map(visitType =>
                        <FormControlLabel
                            key={visitType.description}
                            control={<Checkbox value={visitType.description} onClick={(event) => {
                                let indexMain = visitTypes.map(l => l.description).indexOf(event.target.value)
                                const newElem = visitTypes[indexMain]
                                const newArr = [...chosenArr]

                                const descriptions = [...chosenArr].map(l => l.description)
                                if (descriptions.length > 0 && descriptions.includes(newElem.description)) {
                                    const index = descriptions.indexOf(newElem.description);
                                    newArr.splice(index, 1);
                                } else {
                                    newArr.push(newElem);
                                }
                                setChosenArr(newArr);
                            }
                            } name={visitType.description} checked={isChecked(visitType.description, [...chosenArr].map(l => l.description))} />}
                            label={visitType.description}
                        />
                    )
                }
            </FormGroup>

            <div className="w-full grid justify-items-end">
                <div className="flex flex-row space-x-4 pt-4">
                    <Button label="Close" color="pink outline" onClick={() => onClose()} />
                    <Button label="Confirm" onClick={() => {
                        onConfirm(chosenArr);
                        onClose();
                    }} />
                </div>
            </div>
        </SimpleDialog>
    );
};


{/*checked={gilad} onChange={handleChange}*/ }