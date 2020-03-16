let src;
export default function(el, binding) {
  if (el.src === src) return;
  src = el.src;

  const { value } = binding;
  const testImg = new Image();
  testImg.src = el.src;

  let loadingImgSrc = require("@/assets/images/loading.gif");
  let errorImgSrc = require("@/assets/images/error.png");

  if (typeof value === "string") {
    errorImgSrc = value || errorImgSrc;
  }
  if (value instanceof Object) {
    loadingImgSrc = value.loading || loadingImgSrc;
    errorImgSrc = value.error || errorImgSrc;
  }

  el.src = loadingImgSrc;
  testImg.onload = () => (el.src = testImg.src);
  testImg.onerror = () => (el.src = errorImgSrc);
}
