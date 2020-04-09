import React, { useEffect, useState } from "react";
import * as Styles from "./styles";
import { TableProps, SortDirection } from "./types";
import orderby from "lodash.orderby";
import get from "lodash.get";

export const Table: React.FC<TableProps> = ({ columns, rows, loading }) => {
  const [currentSortColumn, setCurrentSortColumn] = useState<number | null>(
    null
  );
  const [sortedRows, setSortedRows] = useState<any[]>([]);
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  useEffect(
    () => {
      if (currentSortColumn !== null) {
        sort(currentSortColumn);
      }
    },
    [currentSortColumn, sortDirection]
  );

  useEffect(
    () => {
      if (rows && rows.length) {
        setSortedRows(rows);
      }
    },
    [rows]
  );

  const handleHeaderCellClick = (idx) => {
    return () => {
      if (currentSortColumn === idx) {
        toggleSortDirection();
      } else {
        setCurrentSortColumn(idx);
      }
    };
  };

  const toggleSortDirection = () => {
    if (sortDirection === "desc") {
      setSortDirection("asc");
    } else if (sortDirection === "asc") {
      setSortDirection("desc");
    }
  };

  const sort = (columnIndex: number) => {
    const customSort = columns[columnIndex].sort;

    if (customSort && typeof customSort === "function") {
      setSortedRows(
        customSort(rows, columns[columnIndex].selector, sortDirection)
      );
    } else {
      setSortedRows(
        orderby(rows, columns[columnIndex].selector, sortDirection)
      );
    }
  };

  const renderRows = () => {
    if (!loading) {
      return sortedRows.map((row) => (
        <Styles.Row key={`${row.name}_row`}>
          {columns.map((col) => {
            const cellValue = get(row, col.selector);
            return (
              <Styles.Cell key={`${row.name}_cell_${col.selector}`}>
                {col.renderer ? col.renderer(cellValue) : cellValue}
              </Styles.Cell>
            );
          })}
        </Styles.Row>
      ));
    }
    return null;
  };

  const renderTableHeader = () => {
    return columns.map((col, idx) => {
      const isCurrentSortColumn = currentSortColumn === idx;
      return (
        <Styles.HeaderCell
          onClick={handleHeaderCellClick(idx)}
          key={`${col.label}_${col.selector}`}
          isCurrentSortColumn={isCurrentSortColumn}
        >
          {col.label}
          {isCurrentSortColumn ? (
            <Styles.Caret direction={sortDirection} />
          ) : null}
        </Styles.HeaderCell>
      );
    });
  };

  return (
    <>
      <Styles.Table columnCount={columns.length}>
        <thead>
          <Styles.Row>{renderTableHeader()}</Styles.Row>
        </thead>

        <tbody>{renderRows()}</tbody>
      </Styles.Table>
      {loading ? (
        <Styles.LoadingContainer>Loading...</Styles.LoadingContainer>
      ) : null}
    </>
  );
};
