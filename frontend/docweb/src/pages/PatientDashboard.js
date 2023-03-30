import React from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import PageContainer from "../components/PageContainer";

export default function PatientDashboard({}) {
    return (
        <PageContainer title="All appointments">
          <div className="mb-4 flex flex-col space-y-5">
            <Button label="Button"></Button>
            <Button label="Button" color="pink outline"></Button>
            <Button label="Button" color="green outline"></Button>
            <Button label="Button" color="pink big"></Button>
            <InputField>Input</InputField>
          </div>
        </PageContainer>
      );
}