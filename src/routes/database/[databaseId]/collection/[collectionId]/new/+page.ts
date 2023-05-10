import { ProjDatabases } from '$lib/AppwriteService';
import type { PageLoad } from './$types';

export const load = (async ({ params, depends }) => {
	depends("newDocuments");
	const databaseId = params.databaseId;
	const collectionId = params.collectionId;
	const attributes = await ProjDatabases.listAttributes(databaseId, collectionId);
	let attributeFormat = ['[\n\t{'];
	attributes.attributes.forEach((attr) => {
		attributeFormat.push(
			attr.array? '\t\t'+`"${attr.key}": [${attr.type}],`:'\t\t'+`"${attr.key}": ${attr.type},`
		);
	})
	attributeFormat.push('\t}\n]')
	return {
		databaseId: databaseId,
		collectionId: collectionId,
		attributes: attributes.attributes,
		attributeFormat: attributeFormat
	};
}) satisfies PageLoad;