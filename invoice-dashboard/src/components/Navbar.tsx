import { Flex } from "@chakra-ui/react";
import NavLink from "./NavLink";
import {
  faClipboard,
  faCalendar,
  faFolder,
  faFile,
  faHourglass,
} from "@fortawesome/free-regular-svg-icons";

export default function Navbar({ onToggle }: Toggle) {
  return (
    <Flex direction="column" mt="2em" onClick={onToggle}>
      <NavLink link={"/"} name={"Overview"} icon={faCalendar} />
      <NavLink link={"/invoices"} name={"Invoices"} icon={faFile} />
      <NavLink link={"/tasks"} name={"Tasks"} icon={faClipboard} />
      <NavLink link={"/timekeeping"} name={"Timekeeping"} icon={faHourglass} />
      <NavLink link={"/projects"} name={"Projects"} icon={faFolder} />
    </Flex>
  );
}
