import React, { useState, useEffect } from "react";
import { Table } from "./Table";
import "./App.css";
import mockData from "./Table/mockData";
import { TableColumn } from "./Table/types";
import { formatDate, sortByDateNumeric, sortByNumberString } from "./utils";

export const columns: TableColumn[] = [
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

const BASE_URL = "https://swapi.co/api/people";

const mockApiRequest = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData), 500);
  });
};

const App: React.FC = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // replace with "fetchData" if the real api becomes available again
    fetchMockData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(BASE_URL, { method: "GET" });
      const data = await response.json();

      setData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMockData = async () => {
    try {
      const data = await mockApiRequest();
      setData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="TableContainer">
      <Table columns={columns} rows={data} loading={isLoading} uniqueKeyField="name" />
    </div>
  );
};

export default App;
