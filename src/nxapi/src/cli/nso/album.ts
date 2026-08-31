import Table from '../../util/table.js';
import type { Arguments as ParentArguments } from './index.js';
import createDebug from '../../util/debug.js';
import { ArgumentsCamelCase, Argv, YargsArguments } from '../../util/yargs.js';
import { initStorage } from '../../util/storage.js';
import { getToken, Login } from '../../common/auth/coral.js';

const debug = createDebug('cli:nso:album');

export const command = 'album';
export const desc = 'List Nintendo Switch 2 album';

export function builder(yargs: Argv<ParentArguments>) {
    return yargs.option('user', {
        describe: 'Nintendo Account ID',
        type: 'string',
    }).option('token', {
        describe: 'Nintendo Account session token',
        type: 'string',
    }).option('json', {
        describe: 'Output raw JSON',
        type: 'boolean',
    }).option('json-pretty-print', {
        describe: 'Output pretty-printed JSON',
        type: 'boolean',
    });
}

type Arguments = YargsArguments<ReturnType<typeof builder>>;

export async function handler(argv: ArgumentsCamelCase<Arguments>) {
    console.warn('Listing album items');

    const storage = await initStorage(argv.dataPath);

    const usernsid = argv.user ?? await storage.getItem('SelectedUser');
    const token: string = argv.token ||
        await storage.getItem('NintendoAccountToken.' + usernsid);
    const {nso, data} = await getToken(storage, token, argv.zncProxyUrl);

    const [media, [friends, chats, webservices, activeevent, announcements, current_user]] = await Promise.all([
        nso.getMedia(),

        data[Login] || true ? Promise.all([
            nso.getFriendList(),
            nso.getChats(),
            nso.getWebServices(),
            nso.getActiveEvent(),
            nso.getAnnouncements(),
            nso.getCurrentUser(),
        ]) : [],
    ]);

    if (argv.jsonPrettyPrint) {
        console.log(JSON.stringify(media, null, 4));
        return;
    }
    if (argv.json) {
        console.log(JSON.stringify(media));
        return;
    }

    const table = new Table({
        head: [
            'ID',
            'Type',
            'Title ID',
            'Title',
            'Captured at',
            'Uploaded at',
        ],
    });

    for (const item of media.media) {
        table.push([
            item.id,
            item.type,
            item.applicationId,
            item.appName,
            new Date(item.capturedAt * 1000).toISOString(),
            new Date(item.uploadedAt * 1000).toISOString(),
        ]);
    }

    console.log(table.toString());
}
