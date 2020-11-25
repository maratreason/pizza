// action creator
export const setSortBy = (name) => ({ type: "SET_SORT_BY", payload: name });

// action (отличается тем, что не принимает параметры, и возвращает объект)
// export const setSortBy = ({ type: "SET_SORT_BY", payload: name });

export const setCategory = (catIndex) => ({ type: "SET_CATEGORY", payload: catIndex });