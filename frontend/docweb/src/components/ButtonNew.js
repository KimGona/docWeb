import React from "react";
import Button from "./Button";

const ButtonNew = (onClick) => {
  return (
    <div className="p-4 space-y-4">
      <Button onClick={onClick} variant="primary" size="medium">
        Primary Button
      </Button>
      <Button onClick={onClick} variant="secondary" size="large">
        Secondary Button
      </Button>
      <Button onClick={onClick} variant="danger" size="small">
        Danger Button
      </Button>
      <Button onClick={onClick} disabled>
        Disabled Button
      </Button>
    </div>
  );
};

export default ButtonNew;