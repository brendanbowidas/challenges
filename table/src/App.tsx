import React from "react";
import { Table } from "./Table";
import "./App.css";
import data from "./Table/mockData";
import { TableColumn } from "./Table/types";
import { formatDate, sortByDateNumeric, sortByNumberString } from "./utils";

const columns: TableColumn[] = [
  {
    label: "Name",
    selector: "name",
  },
  {
    label: "Height",
    selector: "height",
    sort: sortByNumberString,
  },
  {
    label: "Mass",
    selector: "mass",
    sort: sortByNumberString,
  },
  {
    label: "Hair Color",
    selector: "hair_color",
  },
  {
    label: "Eye Color",
    selector: "eye_color",
  },
  {
    label: "Created",
    selector: "created",
    renderer: formatDate,
    sort: sortByDateNumeric,
  },
  {
    label: "Edited",
    selector: "edited",
    renderer: formatDate,
    sort: sortByDateNumeric,
  },
];

const App: React.FC = () => {
  return (
    <div className="TableContainer">
      <Table columns={columns} rows={data} />
    </div>
  );
};

export default App;
