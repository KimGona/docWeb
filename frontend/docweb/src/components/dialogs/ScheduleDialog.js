import React, { useState } from "react";
import SimpleDialog from "./SimpleDialog";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from "../Button";

import Dialog from '@mui/material/Dialog';

export default function ScheduleDialog({ open, onClose}) {
  const [schedule, setSchedule] = useState([]);

  return (
    <Dialog onClose={onClose} open={open}>
      <div className="py-8 px-10">
        <p className="text-xl font-medium pb-4">Work schedule</p>

        <div className="space-y-2">
          <label>
            Schedule:

          </label>
          <div className="flex flex-row space-x-4 pt-4">
            <Button label="Close" color="pink outline" onClick={onClose} />
            <Button label="Confirm" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </Dialog>
  );
}


{/*checked={gilad} onChange={handleChange}*/}