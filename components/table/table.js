import styles from "./table.module.css";

export const Table = ({ headings, rows }) => {
  return (
    <table className={styles.container}>
      <tr>
        {headings.map((heading) => (
          <th key={`heading-${heading}`}>{heading}</th>
        ))}
      </tr>
      {rows.map((row) => (
        <tr key={`row-${row[0]}`}>
          {row.map((cell) => (
            <td key={`cell-${cell}`}>{cell}</td>
          ))}
        </tr>
      ))}
    </table>
  );
};
