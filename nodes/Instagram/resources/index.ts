import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import type { InstagramResourceType, ResourceHandler } from './types';
import { imageResource } from './image';
import { reelsResource } from './reels';
import { storiesResource } from './stories';

const handlers: Record<InstagramResourceType, ResourceHandler> = {
	image: imageResource,
	reels: reelsResource,
	stories: storiesResource,
};

export const instagramResourceHandlers = handlers;

const baseResourceOptions = Object.values(handlers).map((handler) => handler.option);

const commentResourceOption: INodePropertyOptions = {
	name: 'Comments',
	value: 'comments',
	description: 'Moderate comments on Instagram media',
};

const igUserResourceOption: INodePropertyOptions = {
	name: 'IG User',
	value: 'igUser',
	description: 'Read data for an Instagram Business or Creator account',
};

const igHashtagResourceOption: INodePropertyOptions = {
	name: 'IG Hashtag',
	value: 'igHashtag',
	description: 'Search hashtags and fetch top or recent media for a hashtag',
};

const messagingResourceOption: INodePropertyOptions = {
	name: 'Messaging',
	value: 'messaging',
	description: 'Send direct messages via the Instagram Messaging API',
};

export const instagramResourceOptions = [
	...baseResourceOptions,
	commentResourceOption,
	igUserResourceOption,
	igHashtagResourceOption,
	messagingResourceOption,
];

const fieldMap = new Map<string, INodeProperties>();
for (const handler of Object.values(handlers)) {
	for (const field of handler.fields) {
		fieldMap.set(field.name, field);
	}
}

export const instagramResourceFields = Array.from(fieldMap.values());

