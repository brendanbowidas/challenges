import React from "react";
import { Table } from "../";
import { columns } from "../../App";
import { render } from "@testing-library/react";
import mockData from "../mockData";

describe("Table", () => {
  const Component = (props) => (
    <Table columns={columns} rows={mockData} loading={false} {...props} />
  );

  it("should render the provided columns", () => {
    const { queryByText } = render(<Component />);

    columns.forEach((col) => {
      expect(queryByText(col.label)).toBeTruthy();
    });
  });

  it("should render date values in the expected format", () => {
    const { getAllByText } = render(<Component />);

    mockData.forEach((row) => {
      expect(
        getAllByText(new Date(row.created).toLocaleDateString())
      ).toBeTruthy();
      expect(
        getAllByText(new Date(row.edited).toLocaleDateString())
      ).toBeTruthy();
    });
  });

  it("should render loading indicator", () => {
    const { queryByText, rerender } = render(<Component loading={true} />);
    expect(queryByText("Loading...")).toBeTruthy();

    rerender(<Component loading={false} />);

    expect(queryByText("Loading...")).toBeFalsy();
  });
});
