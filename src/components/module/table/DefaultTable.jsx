import React from "react";

export default function DefaultTable({children}) {
  return (
    <>
      <table className="table">
        {children}
      </table>
    </>
  );
}

const thead = ({children}) => {
    return(
        <thead>{children}</thead>
    )
}

const tbody = ({children}) => {
    return(
        <tbody>{children}</tbody>
    )
}

const row = ({children}) => {
    return(
        <tr>{children}</tr>
    )
}

const th = ({children}) => {
    return (
        <th scope="col">{children}</th>
    )
}

const td = ({children}) => {
    return(
        <td>{children}</td>
    )
}

DefaultTable.Thead = thead
DefaultTable.Tbody = tbody
DefaultTable.Tr = row
DefaultTable.Td = td
DefaultTable.Th = th
