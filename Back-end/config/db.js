const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster.cxuxlbv.mongodb.net/code-academy-db?retryWrites=true&w=majority&appName=Cluster")
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

