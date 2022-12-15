import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useDataContext } from "../../hooks/useDataContext";
import TasksItem from "./TaskItem";

export default function TasksMenu(props: { projectName: string }) {
  const { tasks } = useDataContext();

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        border={0}
        mt="1em"
        as={Button}
        rightIcon={<ChevronDownIcon fontSize="3xl" />}
      >
        <Text fontSize="lg" textAlign="left">
          Choose Tasks
        </Text>
      </MenuButton>
      <MenuList>
        <MenuOptionGroup title="Tasks">
          {tasks.map((data) => {
            if (data.project === props.projectName) {
              return (
                <TasksItem
                  name={data.name}
                  key={data.id}
                  seconds={data.seconds}
                />
              );
            }
          })}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
