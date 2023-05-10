// import { Account, Avatars } from 'appwrite';
import { Client, Databases, Users } from 'node-appwrite';
import { PUBLIC_APPWRITE_PROJECT, PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_KEY } from '$env/static/public';

export const SsrHostname: string = 'svelte-kit.ssr.almostapps.eu';
export const AppwriteHostname: string = 'appwrite.svelte-kit.ssr.almostapps.eu';

export const AppwriteEndpoint = PUBLIC_APPWRITE_ENDPOINT;
export const AppwriteProject = PUBLIC_APPWRITE_PROJECT;
const serverKey = PUBLIC_APPWRITE_KEY;

const client = new Client();
client.setEndpoint(AppwriteEndpoint).setProject(AppwriteProject).setKey(serverKey);

export const ProjDatabases = new Databases(client);
export const ProjUsers = new Users(client);

