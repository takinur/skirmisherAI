import React, { useState } from "react";

// Import tanstack table
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

export const Table = ({ ...props }) => {
  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //
    debugTable: true,
  });

  return (
    <>
      <div className="min-w-screen min-h-screen">
        <div className="w-full bg-gray-100">
          <div className="bg-hite w-full shadow-md rounded my-6 bg-gray-100">
            <table className="min-w-max w-full table-auto">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          key={header.id}
                          colSpan={header.colSpan}
                          className="py-3 px-6 text-left"
                        >
                          {header.isPlaceholder ? null : (
                            <div>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {header.column.getCanFilter() ? (
                                <div>
                                  <Filter
                                    column={header.column}
                                    table={table}
                                  />
                                </div>
                              ) : null}
                            </div>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody class="text-gray-600 ">
                {table.getRowModel().rows.map((row) => {
                  return (
                    <tr
                      key={row.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            className="py-3 px-6 text-left whitespace-nowrap"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

function Filter({ column, table }) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);
  //Don't show filter if first value is undefined
  return typeof firstValue === "undefined" ? (
    <span className="flex items-center gap-1"> </span>
  ) : (
    <input
      type="text"
      value={column.getFilterValue() ?? ""}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
    />
  );
}
