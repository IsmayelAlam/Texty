export function combineID(id1, id2) {
  return id1 > id2 ? id1 + id2 : id2 + id1;
}

export function reducer(state, action) {
  switch (action.type) {
    case "isLoading":
      return { ...state, loading: action.loading };
    case "FullName":
      return { ...state, fullName: action.fullName };
    case "isUploading":
      return { ...state, uploading: action.uploading };
    case "isProgress":
      return { ...state, progress: action.progress };
    case "isError":
      return { ...state, error: action.error };
    case "imageLink":
      return { ...state, image: action.image };
    default:
      throw Error("Unknown action.");
  }
}

export const initState = {
  loading: false,
  fullName: "",
  uploading: false,
  progress: 0,
  error: null,
  image: null,
};
