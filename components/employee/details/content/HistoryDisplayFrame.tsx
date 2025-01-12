import { h } from "preact";
import FormatDataChange from "../utils/formatDataChange.tsx";

type HistoryDisplayFrameProps = {
  history: any[];
  expandedRows: number[];
  toggleRow: (index: number) => void;
  fields: { label: string; before: string; after: string }[];
};

export default function HistoryDisplayFrame({
  history,
  expandedRows,
  toggleRow,
  fields,
}: HistoryDisplayFrameProps): h.JSX.Element {
  return (
    <div class="mt-4">
      {history.length > 0
        ? (
          history.map((item, index) => (
            <div key={index} class="border-b border-gray-200 py-2">
              <button
                class="w-full text-left text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={() =>
                  toggleRow(index)}
              >
                {new Date(item.changeDate).toLocaleDateString()}
              </button>
              {expandedRows.includes(index) && (
                <div class="mt-2">
                  {fields.map((field) => (
                    <p class="flex items-center mb-2" key={field.label}>
                      <strong>{field.label}:</strong>{" "}
                      <FormatDataChange
                        before={item[field.before]}
                        after={item[field.after]}
                      />
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))
        )
        : <p>Brak historii</p>}
    </div>
  );
}
