const API_KEY = "test";
const SHOW_FIELDS = ['thumbnail', 'headline'];
const SHOW_TAGS = ['keyword'];
const URI = "https://content.guardianapis.com/search";

export const getArticles = async (query='', page=1, size=10) => {
  const response = await fetch(
    `${URI}?api-key=${API_KEY}&q=${query}&show-fields=${SHOW_FIELDS.join(',')}&show-tags=${SHOW_TAGS.join(',')}&page=${page}&page-size=${size}`
  );
  const json = await response.json();
  return json;
};