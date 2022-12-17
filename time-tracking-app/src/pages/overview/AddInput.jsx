import { Input } from "@chakra-ui/react";

function AddInput({ handleChange, handleKeyDown, inputValue, name }) {
  return (
    <Input
      data-testid="inputId-1"
      type="text"
      placeholder={name}
      borderRadius={0}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={inputValue}
    ></Input>
  );
}

export default AddInput;
