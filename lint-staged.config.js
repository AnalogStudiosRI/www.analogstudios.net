export default {
  "*.js": ["npm run lint:js --"],
  "*.css": ["npm run lint:css --"],
  // TODO: '*.ts': ['npm run check --'],
  "*.*": ["npm run lint:ls --", "npm run format --"],
};
