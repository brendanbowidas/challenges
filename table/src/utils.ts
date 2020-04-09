import orderby from "lodash.orderby";

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString();
};

export const sortByDateNumeric = (rows, columnSelector, sortDirection) => {
  return [...rows].sort((a, b) => {
    const aTime = new Date(a[columnSelector]).getTime();
    const bTime = new Date(b[columnSelector]).getTime();

    let comparison = 0;
    if (aTime > bTime) {
      comparison = 1;
    } else if (aTime < bTime) {
      comparison = -1;
    }

    return sortDirection === "desc" ? comparison * -1 : comparison;
  });
};

export const sortByNumberString = (rows, columnSelector, sortDirection) =>
  orderby(rows, (o) => new Number(o[columnSelector]), sortDirection);
