import { createElement } from "preact";

type WidgetConfig = {
  id: string;
  Component: () => createElement.JSX.Element;
  size: string; // e.g., 'col-span-1', 'col-span-2', 'col-span-3'
};

type WidgetsLayoutProps = {
  config: WidgetConfig[];
};

export function WidgetsLayout({ config }: WidgetsLayoutProps) {
  return (
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 h-full w-full">
      {config.map((Widget) => (
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
