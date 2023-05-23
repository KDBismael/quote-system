/*
  Warnings:

  - You are about to drop the column `followerId` on the `follower` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[followedId]` on the table `Follower` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `followedId` to the `Follower` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `follower` DROP FOREIGN KEY `Follower_followerId_fkey`;

-- AlterTable
ALTER TABLE `follower` DROP COLUMN `followerId`,
    ADD COLUMN `followedId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Follower_followedId_key` ON `Follower`(`followedId`);

-- AddForeignKey
ALTER TABLE `Follower` ADD CONSTRAINT `Follower_followedId_fkey` FOREIGN KEY (`followedId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
