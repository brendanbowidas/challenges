import styled, { css } from "styled-components";
import { SortDirection } from "./types";

export const Table = styled.table<{ columnCount: number }>`
  width: 100%;
  background: #fff;
  border: 1px solid #e7ebf1;
  padding: 12px 8px;
  border-radius: 4px;
  display: grid;
  grid-template-columns: ${({ columnCount }) =>
    css`repeat(${columnCount}, 1fr)`};
  grid-auto-rows: 1fr;
  overflow-y: scroll;

  thead,
  tbody {
    display: contents;
  }
`;

export const Row = styled.tr`
  display: contents;
`;

export const HeaderCell = styled.th<{ isCurrentSortColumn?: boolean }>`
  padding: 8px 4px;
  align-self: center;
  font-weight: bold;
  cursor: pointer;
  color: ${({ isCurrentSortColumn }) =>
    isCurrentSortColumn ? "#5D3AD7" : "#100730"};
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  align-items: center;
  justify-content: flex-start;
`;

export const Cell = styled.td`
  padding: 16px 4px;
  align-self: center;
  text-align: center;
  color: #455676;
  height: 100%;
  border-top: 1px solid #e7ebf1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Caret = styled.span<{ direction: SortDirection }>`
  position: relative;
  width: 5px;
  height: ${({ direction }) => (direction === "desc" ? "3px" : "6px")};
  left: 5px;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    border-top: 7px solid #5d3ad7;
    border-top: ${({ direction }) =>
      direction === "desc" ? "7px solid #5d3ad7" : "none"};
    border-bottom: ${({ direction }) =>
      direction === "asc" ? "7px solid #5d3ad7" : "none"};
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
  }

  &:after {
    content: "";
    position: absolute;
    left: 3px;
    top: ${({ direction }) => (direction === "desc" ? 0 : "3px")};
    border-top: ${({ direction }) =>
      direction === "desc" ? "4px solid #fff" : "none"};
    border-bottom: ${({ direction }) =>
      direction === "asc" ? "4px solid #fff" : "none"};
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
  }
`;

export const LoadingContainer = styled.div`
  text-align: center;
  margin-top: 12px;
`;
