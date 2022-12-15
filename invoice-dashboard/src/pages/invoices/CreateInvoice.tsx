import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useDisclosure,
  FormErrorMessage,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Flex,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useDataContext } from "../../hooks/useDataContext";
import { useRef, useState } from "react";
import axios from "axios";
import TasksMenu from "./TasksMenu";

export default function LogIn() {
  const { projects, invoiceTasks, setInvoiceTasks, getInvoices, token } =
    useDataContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [projectName, setProjectName] = useState("Choose Project");
  const [customerName, setCustomerName] = useState("");
  const [customerNameError, setCustomerNameError] = useState(false);

  async function postInvoice() {
    const date = handleExpirationDate();
    const amount = handleSumtotal();
    const accessToken = token();
    if (accessToken !== false) {
      try {
        await axios.post(
          "http://localhost:3000/invoices",
          {
            status: "Not paid",
            projectName: projectName,
            expirationDate: date,
            sumTotal: amount,
            customerName: customerName,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken.accessToken}`,
            },
          }
        );
        getInvoices();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("not logged in");
    }
  }

  function handleCustomerName(event: React.FormEvent<HTMLInputElement>) {
    setCustomerName(event.currentTarget.value);
  }

  function handleError(close: boolean) {
    if (customerName === "") {
      setCustomerNameError(true);
    }
    if (customerName !== "" || !close) {
      setCustomerNameError(false);
    }
  }

  function handleProjectClick(name: string) {
    setProjectName(name);
  }

  function handleExpirationDate() {
    const date = new Date().toLocaleString().slice(0, 10);
    const year = parseInt(date.slice(6, 10));

    const calenderYear = {
      January: 31,
      February: 28,
      March: 31,
      April: 30,
      May: 31,
      June: 30,
      July: 31,
      August: 31,
      September: 30,
      October: 31,
      November: 30,
      December: 31,
    };

    const calender: string[] = [];
    for (let y = year - 1; y <= year + 1; y++) {
      for (let m = 0; m <= 12; m++) {
        for (let d = 1; d <= Object.values(calenderYear)[m - 1]; d++) {
          calender.push(`${d}/${m}/${y}`);
        }
      }
    }

    const indexDate = calender.findIndex((indexDate) => {
      return indexDate === date;
    });
    return calender[indexDate + 30];
  }

  function handleSumtotal() {
    let seconds = 0;
    invoiceTasks.forEach((time) => {
      seconds += time.seconds;
    });
    const min = seconds % 60;
    const amount = min * 3;
    setInvoiceTasks([]);
    return amount;
  }

  return (
    <>
      <Button onClick={onOpen} m="2em 2em 2em 0">
        Create invoice
      </Button>
      <Modal
        onCloseComplete={() => {
          setProjectName("Choose Project");
          setCustomerName("");
          handleError(false);
        }}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent m="8em 1em auto 1em">
          <ModalHeader>Create invoice</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={customerNameError}>
              <FormLabel>Customer name</FormLabel>
              <Input
                ref={initialRef}
                onChange={handleCustomerName}
                value={customerName}
                placeholder="Customer name"
                type="text"
              />
              {customerName === "" && (
                <FormErrorMessage>Customer name is required.</FormErrorMessage>
              )}
            </FormControl>
            <Flex direction="column">
              <Menu>
                <MenuButton
                  border={0}
                  mt="2em"
                  as={Button}
                  rightIcon={<ChevronDownIcon fontSize="3xl" />}
                >
                  <Text fontSize="lg" textAlign="left">{projectName}</Text>
                </MenuButton>
                <MenuList>
                  {projects.map((data) => {
                    return (
                      <MenuItem
                        onClick={() => handleProjectClick(data.name)}
                        key={data.id}
                      >
                        {data.name}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
              <TasksMenu projectName={projectName} />
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button
              pl="50%"
              pr="50%"
              onClick={() => {
                if (customerName !== "") {
                  postInvoice();
                  handleError(true);
                  onClose();
                } else {
                  handleError(true);
                }
              }}
            >
              Create invoice
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
