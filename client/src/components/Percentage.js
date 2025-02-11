export const Percentage = (profit, paid) => {
  let percent = 0;

  if (!paid || paid === 0) {
    return <span style={{ color: "gray" }}>N/A</span>;
  }

  percent = ((profit / paid) * 100).toFixed(0);

  return (
    <span
      style={{
        color: percent <= 0 ? "rgb(252, 122, 0)" : "rgb(115, 255, 0)",
      }}
    >
      {percent <= 0 ? ` ⬇ ${percent}%` : ` ⬆ +${percent}%`}
    </span>
  );
};
