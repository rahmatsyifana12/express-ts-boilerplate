import { argv } from 'process';
import {
    DATASOURCE_PATH, executeCommand, MIGRATIONS_DIR_PATH, ORM_CMD
} from '.';

const args = argv.slice(2);
if (!args) {
    throw Error('Invalid sub-command . . .');
}

const subCommand = args.shift();
let command;

switch (subCommand) {
    case 'CREATE':
        if (!args.length) {
            throw Error('Migration name is required!');
        }
        command = `migration:create ${MIGRATIONS_DIR_PATH}/${args[0]}`;
        break;
    case 'SHOW':
        command = `migration:show ${DATASOURCE_PATH}`;
        break;
    case 'RUN':
        command = `migration:run ${DATASOURCE_PATH}`;
        break;
    case 'REVERT':
        command = `migration:revert ${DATASOURCE_PATH}`;
        break;
    default:
        throw Error('Invalid sub-command . . .');
}

executeCommand(`${ORM_CMD} ${command}`);