const app = require("./App");

const PORT = process.env.PORT || 8080;

app.listen(PORT, (req, res) => {
    console.log(`server is running on PORT ${PORT}`);
});

// MONGODB_URI=mongodb://127.0.0.1:27017/VictaSoft
// mongodb+srv://laxmidharhuzaifa2004_db_user:@6EM378le@cluster0.lvevtnb.mongodb.net/VictaSoft