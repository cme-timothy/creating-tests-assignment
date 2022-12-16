import { Input } from "@chakra-ui/react";

function AddProjectInput({ handleChange, handleKeyDown, inputValue }) {
  return (
    <Input
      data-testid="inputId-1"
      type="text"
      placeholder="Project name"
      borderRadius={0}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={inputValue}
    ></Input>
  );
}

export default AddProjectInput;
