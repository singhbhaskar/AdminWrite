// import { Account, Avatars } from 'appwrite';
import { Client, Databases, Users } from 'node-appwrite';

export const SsrHostname: string = 'svelte-kit.ssr.almostapps.eu';
export const AppwriteHostname: string = 'appwrite.svelte-kit.ssr.almostapps.eu';

export const AppwriteEndpoint = 'http://localhost/v1';
export const AppwriteProject = '12345';
const serverKey = "87fbc7e3fa2094ead23915c220c2190da308245c3e2fdcb77802d3d4129387492cd37b806319fd16d8b4e2b8fcce3642c672f62551a008b5f341ff0187939a6b7cc8a85e19e193ca9379c4d9c61295d7f81809c47ee253827e2a1165c88b8f54e80de15aca0218146bb0344099db35d78d97e3a990fae35deefd12d7fb202788";

const client = new Client();
client.setEndpoint(AppwriteEndpoint).setProject(AppwriteProject).setKey(serverKey);

export const ProjDatabases = new Databases(client);
export const ProjUsers = new Users(client);

