const useUploadmage = (data: FormData) =>
  fetch("https://api.cloudinary.com/v1_1/dquna4wzz/image/upload", {
    method: "post",
    body: data,
  })
    .then((resp) => resp.json())
    .then((data) => data.url)
    .catch((err) => console.log(err));
