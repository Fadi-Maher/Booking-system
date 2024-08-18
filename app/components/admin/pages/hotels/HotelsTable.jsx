"use client";
import React, { Fragment } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { MdEditSquare } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";
import PaginationStyle1 from "../../ui/paginators/PaginationStyle1";

const HotelsTable = () => {
  /**
   * hate3melo state esmaha hotels
   * hate3melo useEffect bet fetch el hotels w bet set el state el esmaha hotels
   * w t7t hate3melo map 3ala el hotels state w traga3o mn kol map <tr> tag
   */

  return (
    <Fragment>
      <div className="d-flex justify-content-between mb-3">
        <Form.Control
          type="text"
          className="w-75"
          placeholder="search for hotels..."
        />
        <Button variant="success">Add new hotel</Button>
      </div>
      <Table responsive hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Title 1</td>
            <td>Image 1</td>
            <td>Price 1</td>
            <td>
              <Button size="sm" variant="primary" className="me-2">
                <MdEditSquare size={16} />
              </Button>
              <Button size="sm" variant="danger">
                <IoTrashBin size={16} />
              </Button>
            </td>
          </tr>
          <tr>
            <td>Title 2</td>
            <td>Image 2</td>
            <td>Price 2</td>
            <td>
              <Button size="sm" variant="primary" className="me-2">
                <MdEditSquare size={16} />
              </Button>
              <Button size="sm" variant="danger">
                <IoTrashBin size={16} />
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <div className="d-flex justify-content-center mt-3">
        <PaginationStyle1 />
      </div>
    </Fragment>
  );
};

export default HotelsTable;
