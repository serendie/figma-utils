const REM_TO_PX_RATIO = 16;

export const parseDimension = (inputDimension: string): number => {
  if (!inputDimension.match(/^\d+(\.\d+)?(px|rem)$/)) {
    throw new Error("Invalid dimension format");
  }

  const [value, unit] = inputDimension.split(/(px|rem)/);
  const parsedValue = parseFloat(value);

  if (unit === "px") {
    return parsedValue;
  }

  return parsedValue * REM_TO_PX_RATIO;
};

export const parseDimensionObject = (inputDimension: {
  value: number;
  unit: string;
}): number => {
  return (
    inputDimension.value * (inputDimension.unit === "rem" ? REM_TO_PX_RATIO : 1)
  );
};
