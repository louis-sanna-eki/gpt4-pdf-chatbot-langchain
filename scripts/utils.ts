import fs from 'fs';
import path from 'path';

export function loadDocDirectories() {
  /* Load all directories */
  return fs
    .readdirSync('./docs')
    .filter((file) => {
      return fs.statSync(path.join('./docs', file)).isDirectory();
    })
    .map((dir) => `./docs/${dir}`); // Add prefix 'docs/' to directory names
}
