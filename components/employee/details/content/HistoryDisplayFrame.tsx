import { h } from "preact";
import FormatDataChange from "../utils/formatDataChange.tsx";

type HistoryDisplayFrameProps = {
  history: any[];
  expandedRows: number[];
  toggleRow: (index: number) => void;
  fields: { label: string; before: string; after: string }[];
  mappers?: { [key: string]: (value: any) => string };
};

export default function HistoryDisplayFrame({
  history,
  expandedRows,
  toggleRow,
  fields,
  mappers = {},
}: HistoryDisplayFrameProps): h.JSX.Element {
  const sortedHistory = history.sort((a, b) => {
    return new Date(b.changeDate).getTime() - new Date(a.changeDate).getTime();
  });

  return (
    <div class="mt-4">
      {sortedHistory.length > 0
        ? (
          sortedHistory.map((item, index) => {
            const changedFields = fields
              .filter((field) => item[field.before] !== item[field.after])
              .map((field) => field.label)
              .join(", ");

            return (
              <div key={index} class="border-b border-gray-200 py-2">
                <button
                  class="w-full text-left text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={() => toggleRow(index)}
                >
                  {new Date(item.changeDate).toLocaleDateString()}{" "}
                  {changedFields && `(${changedFields})`}
                </button>
                {expandedRows.includes(index) && (
                  <div class="mt-2">
                    {fields.map((field) => {
                      const beforeValue = mappers[field.before]
                        ? mappers[field.before](item[field.before])
                        : item[field.before];
                      const afterValue = mappers[field.after]
                        ? mappers[field.after](item[field.after])
                        : item[field.after];

                      return (
                        item[field.before] !== item[field.after] &&
                        (
                          <p class="flex flex-col sm:flex-row items-center mb-2" key={field.label}>
                            <strong class="w-full sm:w-auto">{field.label}:</strong>{" "}
                            <FormatDataChange
                              before={beforeValue}
                              after={afterValue}
                            />
                          </p>
                        )
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )
        : <p>Brak historii</p>}
    </div>
  );
}