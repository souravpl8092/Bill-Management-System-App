const formatDate = (dateString) =>
  dateString
    ? new Intl.DateTimeFormat("en-GB")
        .format(new Date(dateString))
        .replace(/\//g, "-")
    : "N/A";

export default formatDate;
