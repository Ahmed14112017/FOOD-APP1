export const range = (start, end, step = 1) => {
  let output = [];
  for (let i = start; i < end; i += step) {
      output.push(i);
  }
  return output;
};

const paginate = ({ pagenumber, totalnumberofpage }) => {
  if (totalnumberofpage <= 1) {
      return [1]; // Only one page available
  }
  
  const start = Math.max(1, pagenumber - 2); // Ensure the start is at least 1
  const end = Math.min(totalnumberofpage + 1, pagenumber+1); // Ensure the end does not exceed the total pages
  
  return range(start, end); // Return the range of page numbers
};

export default paginate;