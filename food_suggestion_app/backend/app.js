import express from 'express';
import bodyParser from 'body-parser';
import { exec } from 'child_process';
import { createDiffieHellmanGroup } from 'crypto';

const app = express();
app.use(express.json());

app.post('/suggest', (req, res) => {
    const ingredients = req.body.ingredients;
    console.log(ingredients)
    const formattedIngredients = `[${ingredients.map(i => "'" + i.toLowerCase() + "'").join(',')}]`;
    console.log(formattedIngredients)
    const query = `swipl -q -s recipes.pl -g "findall(X, suggest_recipe(${formattedIngredients}, X), L), writeln(L), halt."`;

    exec(query, (error, stdout, stderr) => {
        if (error) {
            console.error(`Prolog error: ${error}`);
            return res.status(500).json({ error: 'Internal error' });
        }

        const cleanOutput = stdout
            .trim()
            .replace(/[\[\]\s]/g, '')
            .split(',')
            .filter(Boolean);

        res.json({ suggestions: cleanOutput });
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
