// Drizzle relations — defined for completeness; queries in this app use
// the explicit select()/where() style, so these are informational.
import { relations } from "drizzle-orm";
import { users, checkIns, chatMessages, posts, partnerLinks, psychProfiles } from "./schema";

export const usersRelations = relations(users, ({ many }) => ({
  checkIns: many(checkIns),
  chatMessages: many(chatMessages),
  posts: many(posts),
  partnerLinks: many(partnerLinks),
  psychProfiles: many(psychProfiles),
}));

export const checkInsRelations = relations(checkIns, ({ one }) => ({
  user: one(users, { fields: [checkIns.userId], references: [users.id] }),
}));

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  user: one(users, { fields: [chatMessages.userId], references: [users.id] }),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, { fields: [posts.userId], references: [users.id] }),
}));
