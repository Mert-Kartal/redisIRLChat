/*
  Warnings:

  - A unique constraint covering the columns `[sub_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ChatType" AS ENUM ('ONE_TO_ONE', 'GROUP');

-- CreateEnum
CREATE TYPE "public"."MessageType" AS ENUM ('TEXT', 'IMAGE', 'VIDEO', 'AUDIO');

-- CreateEnum
CREATE TYPE "public"."ChatRolePermissionType" AS ENUM ('SEND_MESSAGE', 'DELETE_OTHERS_MESSAGE', 'MANAGE_MEMBERS', 'KICK_MEMBERS', 'BAN_MEMBERS', 'CHANGE_CHAT_INFO', 'MANAGE_ROLES', 'ASSIGN_ROLES');

-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('ONLINE', 'OFFLINE', 'BUSY', 'AWAY');

-- CreateEnum
CREATE TYPE "public"."FriendshipStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "public"."accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tokens" DROP CONSTRAINT "tokens_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."tokens" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "status" "public"."UserStatus" NOT NULL DEFAULT 'ONLINE',
ADD COLUMN     "sub_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."friendships" (
    "requester_id" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,
    "status" "public"."FriendshipStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "friendships_pkey" PRIMARY KEY ("requester_id","receiver_id")
);

-- CreateTable
CREATE TABLE "public"."blocked_users" (
    "blocking_user_id" TEXT NOT NULL,
    "blocked_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blocked_users_pkey" PRIMARY KEY ("blocking_user_id","blocked_user_id")
);

-- CreateTable
CREATE TABLE "public"."chats" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."ChatType" NOT NULL,
    "photo" TEXT,
    "is_private" BOOLEAN NOT NULL DEFAULT false,
    "invite_code" TEXT,
    "last_messaged_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chat_members" (
    "chat_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "chat_role_id" TEXT NOT NULL,
    "banned_at" TIMESTAMP(3),
    "left_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_members_pkey" PRIMARY KEY ("chat_id","user_id")
);

-- CreateTable
CREATE TABLE "public"."chat_roles" (
    "id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#000000',
    "is_default" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "chat_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chat_role_permissions" (
    "id" TEXT NOT NULL,
    "chat_role_id" TEXT NOT NULL,
    "permission" "public"."ChatRolePermissionType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_role_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."messages" (
    "id" TEXT NOT NULL,
    "content" TEXT,
    "media_url" TEXT,
    "type" "public"."MessageType" NOT NULL,
    "sender_id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."message_read_status" (
    "message_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "read_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "message_read_status_pkey" PRIMARY KEY ("message_id","user_id")
);

-- CreateIndex
CREATE INDEX "friendships_receiver_id_idx" ON "public"."friendships"("receiver_id");

-- CreateIndex
CREATE INDEX "friendships_requester_id_idx" ON "public"."friendships"("requester_id");

-- CreateIndex
CREATE INDEX "blocked_users_blocking_user_id_idx" ON "public"."blocked_users"("blocking_user_id");

-- CreateIndex
CREATE INDEX "blocked_users_blocked_user_id_idx" ON "public"."blocked_users"("blocked_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "chats_invite_code_key" ON "public"."chats"("invite_code");

-- CreateIndex
CREATE INDEX "chat_members_user_id_idx" ON "public"."chat_members"("user_id");

-- CreateIndex
CREATE INDEX "chat_roles_chat_id_idx" ON "public"."chat_roles"("chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "chat_roles_chat_id_name_key" ON "public"."chat_roles"("chat_id", "name");

-- CreateIndex
CREATE INDEX "chat_role_permissions_chat_role_id_idx" ON "public"."chat_role_permissions"("chat_role_id");

-- CreateIndex
CREATE UNIQUE INDEX "chat_role_permissions_chat_role_id_permission_key" ON "public"."chat_role_permissions"("chat_role_id", "permission");

-- CreateIndex
CREATE INDEX "messages_chat_id_idx" ON "public"."messages"("chat_id");

-- CreateIndex
CREATE INDEX "messages_sender_id_idx" ON "public"."messages"("sender_id");

-- CreateIndex
CREATE INDEX "messages_chat_id_created_at_idx" ON "public"."messages"("chat_id", "created_at");

-- CreateIndex
CREATE INDEX "message_read_status_message_id_idx" ON "public"."message_read_status"("message_id");

-- CreateIndex
CREATE INDEX "message_read_status_user_id_idx" ON "public"."message_read_status"("user_id");

-- CreateIndex
CREATE INDEX "tokens_user_id_idx" ON "public"."tokens"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_sub_id_key" ON "public"."users"("sub_id");

-- CreateIndex
CREATE INDEX "users_sub_id_idx" ON "public"."users"("sub_id");

-- AddForeignKey
ALTER TABLE "public"."accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."friendships" ADD CONSTRAINT "friendships_requester_id_fkey" FOREIGN KEY ("requester_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."friendships" ADD CONSTRAINT "friendships_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."blocked_users" ADD CONSTRAINT "blocked_users_blocking_user_id_fkey" FOREIGN KEY ("blocking_user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."blocked_users" ADD CONSTRAINT "blocked_users_blocked_user_id_fkey" FOREIGN KEY ("blocked_user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chat_members" ADD CONSTRAINT "chat_members_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chat_members" ADD CONSTRAINT "chat_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chat_members" ADD CONSTRAINT "chat_members_chat_role_id_fkey" FOREIGN KEY ("chat_role_id") REFERENCES "public"."chat_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chat_roles" ADD CONSTRAINT "chat_roles_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chat_role_permissions" ADD CONSTRAINT "chat_role_permissions_chat_role_id_fkey" FOREIGN KEY ("chat_role_id") REFERENCES "public"."chat_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."message_read_status" ADD CONSTRAINT "message_read_status_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "public"."messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."message_read_status" ADD CONSTRAINT "message_read_status_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tokens" ADD CONSTRAINT "tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
