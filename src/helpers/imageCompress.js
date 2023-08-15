export default function imageCompress(file, maxWidth) {
  if (!file) return;

  const reader = new FileReader();

  reader.readAsDataURL(file);

  const imgElement = document.createElement("img");

  return new Promise((resolve) => {
    reader.onload = function (event) {
      imgElement.src = event.target.result;

      imgElement.onload = function (e) {
        const canvas = document.createElement("canvas");

        const scaleSize = maxWidth / e.target.width;
        canvas.width = maxWidth;
        canvas.height = e.target.height * scaleSize;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

        ctx.canvas.toBlob(
          (blob) =>
            resolve(
              new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              })
            ),
          "image/jpeg",
          1
        );
      };
    };
  });
}
