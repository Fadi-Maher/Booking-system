import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationStyle1 = () => {
  let active = 2;
  let items = [];
  for (let number = 1; number <= 10; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  return <Pagination>{items}</Pagination>;
};

export default PaginationStyle1;
