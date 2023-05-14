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

export default function VisitTypesDialog({open, onClose, onConfirm, visitTypes, selected}) {
    const [chosenArr, setChosenArr] = useState(selected);

    useEffect(()=>{
        setChosenArr(selected)
    },[selected])

    return (
        <SimpleDialog open={open} handleClose={onClose} title="Pick visit types">
            <FormGroup>
            {
                visitTypes.map( visitType =>
                    <FormControlLabel
                        key={visitType}
                        control={<Checkbox value={visitType} onClick={ (event) =>
                            {
                                const newElem = event.target.value
                                const newArr = [...chosenArr]
                                if (newArr.includes(newElem)) {
                                    const index = chosenArr.indexOf(newElem);
                                    newArr.splice(index, 1);
                                } else {
                                    newArr.push(newElem);
                                }
                                setChosenArr(newArr);
                            }
                        } name={visitType} checked={isChecked(visitType, chosenArr)} />}
                        label={visitType}
                    />
                )
            }
            </FormGroup>

            <div className="w-full grid justify-items-end">
                <div className="flex flex-row space-x-4 pt-4">
                <Button label="Close" color="pink outline" onClick={() => onClose()} />
                <Button label="Confirm" onClick={() => {
                    console.log(chosenArr);
                    onConfirm(chosenArr)
                    onClose()
                }} />
                </div>
            </div>
        </SimpleDialog>
    );
};


{/*checked={gilad} onChange={handleChange}*/}