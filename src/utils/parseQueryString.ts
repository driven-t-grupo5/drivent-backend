export default function parseQueryString(str: string) {
  const queryString = str.split("?").at(-1);
  const result: Record<string, string> = {};
  queryString.split("&").forEach((pair) => {
    const [key, value] = pair.split("=").map(decodeURIComponent);
    result[key] = value;
  });

  return result;
}
