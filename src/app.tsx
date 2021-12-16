import React, { ReactElement } from "react";
import {
  Box,
  Button,
  ChakraProvider,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";

interface Props {}

const data = [
  ["Alexis", "09842453", "G Sanabria 3525", "Montevideo", "1/3/1991"],
  ["Jorge", "09842453", "C Ma Ramirez 2151", "Montevideo", "1/3/1991"],
  ["Valeria", "09842453", "Bulgaria 4512", "Montevideo", "1/3/1991"],
  ["Fernando", "09842453", "Pedro Berro 3525", "Montevideo", "1/3/1991"],
];

function display(value: string) {
  return ["block", null, value];
}
function Label({ value }: { value: string }) {
  return (
    <Text as="b" display={["inline-block", null, "none"]} pr="3px">
      {value}:
    </Text>
  );
}

function Something() {
  const value = useBreakpointValue({
    base: "base",
    md: "sm",
  });
  return (
    <Box overflow="auto">
      <Table>
        <Thead as="div" display={["none", null, "table-header-group"]}>
          <Tr as="div" display="table-row">
            <Th as="div" display="table-cell">
              Name
            </Th>
            <Th as="div" display="table-cell">
              Phone
            </Th>
            <Th as="div" display="table-cell">
              Address
            </Th>
            <Th as="div" display="table-cell">
              City
            </Th>
            <Th as="div" display="table-cell">
              Birthdate
            </Th>
          </Tr>
        </Thead>
        <Tbody as="div" display={display("table-row-group")}>
          {data.map(([name, phone, address, city, birthDate]) => (
            <Tr
              as="div"
              display={display("table-row")}
              key={name}
              sx={
                value === "base"
                  ? {
                      padding: "10px",
                      margin: "10px 4px",
                      border: "1px solid #ccc",
                      borderRadius: "10px",
                    }
                  : undefined
              }
            >
              <Td as="div" display={display("table-cell")}>
                <Label value="Name" />
                {name}
              </Td>
              <Td as="div" display={display("table-cell")}>
                <Label value="Phone" />
                {phone}
              </Td>
              <Td as="div" display={display("table-cell")}>
                <Label value="Address" /> {address}
              </Td>
              <Td as="div" display={display("table-cell")}>
                <Label value="City" />
                {city}
              </Td>
              <Td as="div" display={display("table-cell")}>
                <Label value="Birthdate" /> {birthDate}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default function App({}: Props): ReactElement {
  const [value, setValue] = React.useState(0);

  return (
    <ChakraProvider>
      <div>
        <Button colorScheme="green" onClick={() => setValue(value + 1)}>
          Hi {value}
        </Button>
        <Something />
      </div>
    </ChakraProvider>
  );
}
