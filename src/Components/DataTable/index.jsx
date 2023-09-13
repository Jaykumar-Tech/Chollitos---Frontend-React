import { useEffect } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import {
  Box,
  Input,
  Button,
  Select,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  HStack,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';

const paginationOptions = [5, 10, 20, 50];

const ChollitosTable = ({
  data,
  columns,
  index = 0,
  setIndex,
  size = 5,
  setSize,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    state,
    gotoPage,
    setGlobalFilter,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
  } = useTable(
    {
      columns: columns,
      data: data,
      initialState: { pageIndex: index, pageSize: size },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );
  const { globalFilter, pageIndex, pageSize } = state;
  const pageCount = pageOptions.length;

  useEffect(() => {
    setIndex(pageIndex);
  }, [pageIndex]);

  useEffect(() => {
    setSize(pageSize);
  }, [pageSize]);

  return (
    <Box>
      <Flex>
        <Box padding={2}>
          <span>
            <strong>
              {data.length}
            </strong>
            {' '} Records in Total
          </span>
        </Box>
        <Spacer />
        <Input
          ml='20px'
          maxWidth={'300px'}
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          mb={4}
        />
      </Flex>
      <Box overflow='auto' maxH={'calc(100vh - 330px)'}>
        <Table {
          ...getTableProps()}
          size={'sm'}
          variant="striped"
        >
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {!columns.find(column => column.accessor === 'id') && <Td>{index + 1}</Td>}
                  {row.cells.map((cell) => (
                    <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
      <HStack spacing={2} mt={'12px'}>
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage} size={'sm'}>
          First
        </Button>
        <Button onClick={() => previousPage()} disabled={!canPreviousPage} size={'sm'}>
          <ChevronLeftIcon />
        </Button>
        <Input
          size={'sm'}
          maxWidth={'80px'}
          style={{ textAlign: 'center' }}
          value={pageIndex}
          onChange={(e) => gotoPage(e.target.value)}
        />
        <Button onClick={() => gotoPage(pageIndex * 1 + 1)} disabled={!canNextPage} size={'sm'}>
          <ChevronRightIcon />
        </Button>
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} size={'sm'}>
          Last
        </Button>
        <span>
          Page{' '}
          <strong>
            {pageIndex} / {Math.ceil(data.length / pageSize) - 1}
          </strong>
        </span>
        <Spacer />
        <Select
          size={'sm'}
          maxWidth={'125px'}
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {paginationOptions.map((value) => (
            <option key={value} value={value}>
              Show {value}
            </option>
          ))}
        </Select>
      </HStack>
    </Box>
  );
};

export default ChollitosTable;