const app = require("./App");

const PORT = 3000;

app.listen(PORT, (req, res) => {
    console.log(`server is running on PORT ${PORT}`);
});

