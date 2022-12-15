import { MenuItemOption } from "@chakra-ui/react";
import { useState } from "react";
import { useDataContext } from "../../hooks/useDataContext";

export default function TasksItem(props: { name: string; seconds: number }) {
  const { setInvoiceTasks } = useDataContext();
  const [checked, setChecked] = useState(false);

  function handleChecked() {
    setChecked(!checked);
    setInvoiceTasks((prevItems) => {
      return [
        ...prevItems,
        {
          seconds: props.seconds,
        },
      ];
    });
  }

  return (
    <MenuItemOption isChecked={checked} onClick={handleChecked}>
      {props.name}
    </MenuItemOption>
  );
}
