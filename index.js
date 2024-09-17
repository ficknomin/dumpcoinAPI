import express from "express"
import axios from "axios"
import bodyParser from "body-parser";


const port = 3000;
const app = express();
const coinapi = "81A2E296-9AB4-4319-ACC4-07A094084F79";
const config = {
    headers: {
        'Accept': 'text/plain', 
        "X-CoinAPI-Key": coinapi,  
    },
}

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.post("/coin", async (req, res) => {
    const coinId = req.body.coinId;

    try{
        const response = await axios.get(`https://rest.coinapi.io/v1/assets?filter_asset_id=${coinId}`, config);
        const data = JSON.stringify(response.data);

        console.log(response.data);

        res.render("coin.ejs", { data });
    } catch(error){
        console.log(error);
    }
});

app.get("/", async (req, res) => {

    res.render("index.ejs");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});