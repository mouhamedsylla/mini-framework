import fs from 'fs';
import path from 'path';
import Compiler from '../compiler/compile-mini.js';
import { evalJS } from './evalJS.js';

function compileProject(projectDir, compiler) {
    const srcDirectory = path.join(projectDir, 'src')
    const outputDirectory = path.join(projectDir, '.dist')
    const files = fs.readdirSync(srcDirectory)

    files.forEach(file => {
        console.log(file)
        const filePath = path.join(srcDirectory, file)
        if (fs.statSync(filePath).isFile() && file.endsWith('.mini')) {
            const code = fs.readFileSync(filePath, 'utf-8');
            const evaluatedCode = evalJS(code)
            compiler.setCode(evaluatedCode)
            const vdom = compiler.compile()
            console.log("-------------------------------\n\n")
            console.log(evaluatedCode)
            console.log("-------------------------------\n\n")
            const jsCode = `
            import { mountDOM } from "../../_lib/core/vdom/vdom.js";
            
            const appRoot = document.getElementById('app'); 
            mountDOM(${JSON.stringify(vdom, null, 2)}, appRoot);
            `;

            if (!fs.existsSync(outputDirectory)){
                fs.mkdirSync(outputDirectory, { recursive: true });
            }
            const outputFilePath = path.join(outputDirectory, file.replace('.mini', '.js'));
            fs.writeFileSync(outputFilePath, jsCode, 'utf-8');
        }
    })
}

const projectDir = process.argv[2]
const compiler = new Compiler()
compileProject(projectDir, compiler)
// import { compileJSX } from '../compiler/compile-mini.js';

// // Chemin par défaut pour le projet
// const defaultProjectDir = path.resolve('./todoApp');
// const srcDir = path.join(defaultProjectDir, 'src/components');
// const outDir = path.join(defaultProjectDir, 'public/js');

// function compileProject(projectDir) {
//     const srcDirectory = path.join(projectDir, 'src/components');
//     const outputDirectory = path.join(projectDir, 'public/js');

//     if (!fs.existsSync(srcDirectory)) {
//         console.error(`Le répertoire ${srcDirectory} n'existe pas.`);
//         return;
//     }

//     const files = fs.readdirSync(srcDirectory);

//     files.forEach(file => {
//         const filePath = path.join(srcDirectory, file);

//         // Vérifie si c'est un fichier avant de tenter de le lire
//         if (fs.statSync(filePath).isFile() && file.endsWith('.jsx')) {
//             console.log(`Compilation de ${filePath}`);

//             // Lire le contenu du fichier JSX
//             const code = fs.readFileSync(filePath, 'utf-8');

//             // Compilation du JSX en code JavaScript
//             const vdom = compileJSX(code);

//             // Convertir le VDOM en code JavaScript exécutable
//             const jsCode = `const appRoot = document.getElementById('app'); mountDOM(${JSON.stringify(vdom)}, appRoot);`;

//             // Écrire le code JavaScript dans un fichier
            // if (!fs.existsSync(outputDirectory)){
            //     fs.mkdirSync(outputDirectory, { recursive: true });
            // }
            // const outputFilePath = path.join(outputDirectory, file.replace('.jsx', '.js'));
            // fs.writeFileSync(outputFilePath, jsCode, 'utf-8');
//         }
//     });
// }

// // Exécuter la compilation pour le projet spécifié ou le projet par défaut
// const projectDir = process.argv[2] || defaultProjectDir;
// compileProject(projectDir);