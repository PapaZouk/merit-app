const annualLeavesHeatMap = [
    {length: 12, background: "bg-orange-700"},
    {length: 11, background: "bg-orange-600"},
    {length: 10, background: "bg-orange-500"},
    {length: 9, background: "bg-orange-400"},
    {length: 8, background: "bg-orange-300"},
    {length: 7, background: "bg-orange-200"},
    {length: 6, background: "bg-green-600"},
    {length: 5, background: "bg-green-500"},
    {length: 4, background: "bg-green-400"},
    {length: 3, background: "bg-green-300"},
    {length: 2, background: "bg-green-200"},
    {length: 1, background: "bg-green-100"},
]

export const getDayOffBackgroundColor = (length: number) => {
    const backgroundColor = annualLeavesHeatMap
        .find((item) => length >= item.length)?.background;
    console.log(length, backgroundColor);
    return backgroundColor ? backgroundColor : "bg-green-100";
}