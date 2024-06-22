const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster.cxuxlbv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster/code-academy-db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));