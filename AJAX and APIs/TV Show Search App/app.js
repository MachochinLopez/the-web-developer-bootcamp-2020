const form = document.querySelector("#searchForm");

form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const keyword = form.elements.query.value;
    const config = { params: { q: keyword } };
    const response = await axios.get("http://api.tvmaze.com/search/shows", config);
    makeImages(response.data);
});

const makeImages = (results) => {
    for (const result of results) {
        if (result.show.image) {
            const img = document.createElement("IMG");
            img.src = result.show.image.medium;
            document.body.append(img);
        }
    }
};