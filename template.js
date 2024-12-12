import {
  existsSync,
  mkdirSync,
  writeFile,
  readFileSync,
  writeFileSync,
} from 'fs';
//import { readFile } from 'fs/promises';
import { resolve } from 'path';

let [year, day] = process.argv.slice(2);

const _year = Number(year); // Used for validations
const _day = Number(day); // Used for validations

const showError = (errorNumber) => {
  const errors = [];
  errors[0] =
    'Please, use: npm run YEAR DAY\nWhere: YEAR is year in full number (YYYY) and DAY is the number of the day xD.';
  errors[1] = 'YEAR must be greater than 2015.';
  errors[2] = 'DAY must be between 1 and 31.';
  errors[3] = 'Error writing files.';
  errors[4] = 'Cannot read/write packages.json file.';
  console.log(errors[errorNumber]);
  process.exit(0);
};

if (Number.isNaN(_year) || Number.isNaN(_day)) showError(0);
if (_year < 2015) showError(1);
if (_day < 1 || _day > 31) showError(2);

day = day.padStart(2, '0');

const writePackagesJson = (scriptToInsert) => {
  const { scriptName, scriptCommand } = scriptToInsert;
  const packageJsonPath = './package.json';

  try {
    const packageData = readFileSync(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageData);

    packageJson.scripts = packageJson.scripts || {};
    packageJson.scripts[scriptName] = scriptCommand;

    const updatedPackageData = JSON.stringify(packageJson, null, 2);
    writeFileSync(packageJsonPath, updatedPackageData, 'utf-8');
  } catch (error) {
    showError(4);
  }
};

const createYearDirectory = (dirPath) => {
  const fullPath = resolve(process.cwd(), dirPath);
  if (!existsSync(fullPath)) mkdirSync(fullPath, { recursive: true });
};

const createFile = (filename, input = '') => {
  writeFile(filename, input, (err) => {
    if (err) showError(3);
  });
};

const templateString = `/*

*/

import { _readInput } from '../../lib.js'


const day${day} = (fileInput) => {
  const _data = _readInput(fileInput)

  return _data
}


// --------------------------------------------------------


const day${day}Two = (fileInput) => {
  const _data = _readInput(fileInput)

  return _data
}



const fileInput = './${year}/day${day}/example.txt'
//const fileInput = './${year}/day${day}/input.txt'

console.log(day${day}(fileInput));
console.log(day${day}Two(fileInput));`;

const exampleFilename = 'example.txt';
const inputFilename = 'input.txt';
const scriptFilename = 'index.js';
const scriptDir = `${year}/day${day}`;

const newScriptPackagesJson = {
  scriptName: `${year}:${day}`,
  scriptCommand: `nodemon ${year}/day${day}/index.js`,
};

createYearDirectory(scriptDir); // Create destination directory
createFile(`${scriptDir}/${exampleFilename}`); // Create example file
createFile(`${scriptDir}/${inputFilename}`); // Create input file
createFile(`${scriptDir}/${scriptFilename}`, templateString); // Create script file
writePackagesJson(newScriptPackagesJson); // Write new packages script section

console.log(`Created script.\nYou can run 'npm run ${year}:${day}'`);
