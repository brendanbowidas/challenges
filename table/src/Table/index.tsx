import React, { useEffect, useState } from "react";
import * as Styles from "./styles";
import { TableProps, SortDirection } from "./types";
import orderby from "lodash.orderby";

export const Table: React.FC<TableProps> = ({ columns, rows }) => {
  const [currentSortColumn, setCurrentSortColumn] = useState<number | null>(
    null
  );
  const [sortedRows, setSortedRows] = useState<any[]>(rows);
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  useEffect(
    () => {
      if (currentSortColumn !== null) {
        sort(currentSortColumn);
      }
    },
    [currentSortColumn, sortDirection]
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

  return (
    <Styles.Table columnCount={columns.length}>
      <thead>
        <Styles.Row>
          {columns.map((col, idx) => (
            <Styles.HeaderCell
              onClick={handleHeaderCellClick(idx)}
              key={`${col.label}_${col.selector}`}
              isCurrentSortColumn={currentSortColumn === idx}
            >
              {col.label}
              {currentSortColumn === idx ? (
                <Styles.Caret direction={sortDirection} />
              ) : null}
            </Styles.HeaderCell>
          ))}
        </Styles.Row>
      </thead>

      <tbody>
        {sortedRows.map((row) => (
          <Styles.Row key={`${row.name}_row`}>
            {columns.map((col) => (
              <Styles.Cell key={`${row.name}_cell_${col.selector}`}>
                {col.renderer
                  ? col.renderer(row[col.selector])
                  : row[col.selector]}
              </Styles.Cell>
            ))}
          </Styles.Row>
        ))}
      </tbody>
    </Styles.Table>
  );
};
