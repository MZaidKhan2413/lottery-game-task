import "./Grid.css"

const Grid = ({ grid, onChange }) => {
  const handleChange = (rowIndex, colIndex, value) => {
    const num = parseInt(value, 10);

    if (value === "" || (num >= 0 && num <= 9)) {
      onChange(rowIndex, colIndex, value);
    }
  };

  return (
    <div className="game-grid">
      {grid.map((row,rowIndex) =>
        row.map((cell, colIndex) => (
          <input
            key={`${rowIndex}-${colIndex}`}
            type="number"
            min="1"
            max="9"
            value={cell}
            onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
            className="game-grid-input"
          />
        ))
      )}
    </div>
  );
};

export default Grid;
