import { ReactNode } from "react";

interface TableComponentProps {
  headers: string[];
  children: ReactNode;
}

function TableComponent({ headers, children }: TableComponentProps) {
  return (
    <div className="bg-white rounded-lg overflow-visible">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead className="bg-gray-100 text-gray-700 border-b border-gray-200">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={`text-left py-4 font-medium whitespace-nowrap ${index === 0 ? "px-6" : "px-4"}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-black">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

export default TableComponent;
