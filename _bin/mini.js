#!/usr/bin/env node
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

// Fonction pour copier un répertoire
function copyFolderSync(from, to) {
    fs.mkdirSync(to, { recursive: true });
    fs.readdirSync(from).forEach(element => {
        const fromPath = path.join(from, element);
        const toPath = path.join(to, element);
        if (fs.lstatSync(fromPath).isFile()) {
            fs.copyFileSync(fromPath, toPath);
        } else {
            copyFolderSync(fromPath, toPath);
        }
    });
}

// Création d'un nouveau projet
const projectName = process.argv[2];

if (!projectName) {
    console.error('Erreur: Vous devez spécifier un nom pour votre projet.');
    process.exit(1);
}

const projectPath = path.join(process.cwd(), projectName);

// Vérifie si le projet existe déjà
if (fs.existsSync(projectPath)) {
    console.error(`Erreur: Le répertoire ${projectName} existe déjà.`);
    process.exit(1);
}

// Copie du template vers le nouveau projet
const templatePath = path.join(__dirname, '../_lib/templates/');
copyFolderSync(templatePath, projectPath);

console.log(`Projet ${projectName} créé avec succès.`);
