export default (values) => {
  let decompressedValues = [];
  values.forEach((value) => {
    const props = value.split("_");
    let frequency = parseInt(props[0]);
    const color = props[1];
    while (frequency > 0) {
      decompressedValues.push(color);
      frequency--;
    }
  });
  return decompressedValues;
};
