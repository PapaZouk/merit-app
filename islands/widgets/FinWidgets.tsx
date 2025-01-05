import Widget3 from "../../components/widgets/Widget3.tsx";
import Widget2 from "../../components/widgets/Widget2.tsx";
import Widget1 from "../../components/widgets/Widget1.tsx";

export function FinWidgets() {
  const widgets = [
      { id: '0', Component: () => <Widget1 />, size: 'col-span-1 md:col-span-3' },
      { id: '1', Component: () => <Widget2 />, size: 'col-span-1 md:col-span-3' },
      { id: '2', Component: () => <Widget3 />, size: 'col-span-1 md:col-span-3' },
  ];

  return (
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 h-full w-full">
        {widgets.map((Widget) => (
            <div
                key={Widget.id}
                class={`${Widget.size} bg-white p-4 shadow rounded-lg`}
            >
              <Widget.Component />
            </div>
        ))}
      </div>
  );
}
