import { Helmet } from "react-helmet-async";
import {
  Flex,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  Button,
  Box,
  useMediaQuery,
  TableCaption,
} from "@chakra-ui/react";
import CreateInvoice from "./CreateInvoice";
import { useEffect } from "react";
import { useDataContext } from "../../hooks/useDataContext";
import axios from "axios";
import NavbarToggle from "../../components/NavbarToggle";

export default function Invoices({ onToggle }: Toggle) {
  const { invoices, getInvoices, getProjects, getTasks, token } =
    useDataContext();
  const [phoneSize] = useMediaQuery("(max-width: 950px)");

  useEffect(() => {
    getProjects();
    getTasks();
    getInvoices();
  }, []);

  async function deleteInvoice(id: number) {
    const accessToken = token();
    if (accessToken !== false) {
      try {
        await axios.delete(`http://localhost:3000/invoices/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
          },
        });
        getInvoices();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("not logged in");
    }
  }

  return (
    <>
      <Helmet>
        <title>Invoice dashboard - Invoices</title>
      </Helmet>
      <Flex direction="column" w="100%" h="100vh">
        <Flex justify="space-between" h="5.5em" bg="white" align="center">
          {phoneSize && <NavbarToggle onToggle={onToggle} />}
          <Heading p="1em" ml={phoneSize ? "1em" : "0"}>
            Invoices
          </Heading>
          <CreateInvoice />
        </Flex>
        <Flex direction="column" overflow="auto">
          <Box minH="min-content">
            <TableContainer m={phoneSize ? "2em 0 2em 0" : "2em"} bg="white">
              <Table variant="simple">
                <TableCaption>Invoices list</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Customer</Th>
                    <Th pl="0">Sum total</Th>
                    <Th pl="0">Expiration</Th>
                    {!phoneSize && <Th pl="0">Status</Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {invoices.map((invoice) => {
                    return (
                      <Tr
                        key={invoice.id}
                        borderTop="1px solid"
                        borderBottom="1px Solid"
                        borderColor="gray.100"
                      >
                        <Td>{invoice.customerName}</Td>
                        <Td pl="0">{invoice.sumTotal} kr</Td>
                        <Td pl="0">{invoice.expirationDate}</Td>
                        {!phoneSize && (
                          <>
                            <Td pl="0">{invoice.status}</Td>
                            <Td p="0em">
                              <Button onClick={() => deleteInvoice(invoice.id)}>
                                Delete
                              </Button>
                            </Td>
                          </>
                        )}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <Box minH="min-content">
            <TableContainer m={phoneSize ? "2em 0 2em 0" : "2em"} bg="white">
              <Table variant="simple">
                {phoneSize && (
                  <TableCaption>Continuation of Invoices list</TableCaption>
                )}
                <Thead>
                  <Tr>{phoneSize && <Th>Status</Th>}</Tr>
                </Thead>
                <Tbody>
                  {invoices.map((invoice) => {
                    return (
                      <Tr
                        key={invoice.id}
                        borderTop="1px solid"
                        borderBottom="1px Solid"
                        borderColor="gray.100"
                      >
                        {phoneSize && (
                          <>
                            <Td>{invoice.status}</Td>
                            <Td>
                              <Button onClick={() => deleteInvoice(invoice.id)}>
                                Delete
                              </Button>
                            </Td>
                          </>
                        )}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
