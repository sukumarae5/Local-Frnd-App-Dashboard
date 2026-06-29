const getContentValue = (contents, key) => {
  const item = contents.find(
    (x) => x.content_key === key
  );

  return item ? item.content_value : "";
};

export default getContentValue;