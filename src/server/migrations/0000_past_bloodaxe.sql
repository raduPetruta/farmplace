CREATE TABLE `conversations` (
	`id` text PRIMARY KEY NOT NULL,
	`sender_id` text,
	`receiverId` text,
	`name` text NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`postId` text NOT NULL,
	`lastSentMessageDate` text DEFAULT (CURRENT_TIMESTAMP),
	`lastSentMessageId` text DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`messageText` text NOT NULL,
	`conversationId` text NOT NULL,
	`senderId` text NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`content` text NOT NULL,
	`description` text NOT NULL,
	`imagesUrl` text NOT NULL,
	`location` text NOT NULL,
	`price` text NOT NULL,
	`isNegotiable` integer,
	`condition` text NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text NOT NULL
);
