import React, { useState } from "react";
import { Table as DataTable } from "antd";

//Ant Design CSS
// import "antd/dist/antd.css";

const defaultExpandable = {
  expandedRowRender: (record) => <p>{record.description}</p>,
};

export const Table = ({ data, columns }) => {
  const tableColumns = columns.map((item) => ({ ...item, ellipsis: false }));
  const tableProps = {
    bordered: false,
    loading: false,
    size: "large",
    expandable: defaultExpandable,
    title: false,
    showHeader: true,
    footer: false,
    rowSelection: false,
  };

  console.log(data);

  return (
    <div className="p-2">
      <DataTable
        className="overflow-x-auto"
        {...tableProps}
        pagination={{
          position: "bottomRight",
        }}
        columns={tableColumns}
        dataSource={data ? data : []}
        rowKey="id"
      />
    </div>
  );
};
