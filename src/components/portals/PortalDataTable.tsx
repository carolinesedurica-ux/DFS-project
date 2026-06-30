import React from 'react';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

interface PortalDataTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export function PortalDataTable<T extends { id: string | number }>({ columns, data }: PortalDataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm text-gray-700">
        <thead className="bg-gray-50/50 text-xs uppercase text-gray-500 border-b border-gray-200">
          <tr>
            {columns.map((col, index) => (
              <th key={String(col.key) + index} className="px-6 py-4 font-medium">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {columns.map((col, index) => (
                  <td key={String(col.key) + index} className="px-6 py-4 whitespace-nowrap">
                    {col.render ? col.render(row) : String(row[col.key as keyof T] || '')}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-400">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
