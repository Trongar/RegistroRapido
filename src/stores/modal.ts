import { map } from "nanostores";

export const modalMap = map({
  isOpen: false,
  title: "",
  content: "",
  onOpenfn: () => {},
  onClosefn: () => {},
  onCancelfn: () => {},
  onAceptfn: () => {},
});
