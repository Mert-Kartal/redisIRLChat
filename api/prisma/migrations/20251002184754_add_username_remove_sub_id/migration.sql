/*
  Warnings:

  - You are about to drop the column `sub_id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."users_sub_id_idx";

-- DropIndex
DROP INDEX "public"."users_sub_id_key";

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "sub_id",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "public"."users"("username");

-- CreateIndex
CREATE INDEX "users_username_idx" ON "public"."users"("username");
