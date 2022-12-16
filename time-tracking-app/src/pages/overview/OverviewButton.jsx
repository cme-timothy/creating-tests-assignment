import { Button, Tooltip } from "@chakra-ui/react";

function OverviewButton({ name, menuClick, menuToggle, projects }) {
  function handleMenuClick() {
    if (name === "Tasks") {
      menuClick(false);
    } else {
      menuClick(true);
    }
  }

  return (
    <Tooltip
      label={
        name === "Tasks" && projects.length === 0 && "Create a Project first"
      }
    >
      <Button
        data-testid={"buttonId"}
        isDisabled={
          name === "Tasks" ? (projects.length === 0 ? true : false) : false
        }
        fontSize="xl"
        onClick={handleMenuClick}
        borderRadius={0}
        w="100%"
        bg={
          menuToggle
            ? name === "Tasks"
              ? "gray.100"
              : "gray.400"
            : name === "Tasks"
            ? "gray.400"
            : "gray.100"
        }
        _active={
          menuToggle
            ? {
                bg: name === "Tasks" ? "gray.100" : "gray.400",
              }
            : {
                bg: name === "Tasks" ? "gray.400" : "gray.100",
              }
        }
        _hover={{ bg: "gray.400" }}
      >
        {name}
      </Button>
    </Tooltip>
  );
}

export default OverviewButton;
