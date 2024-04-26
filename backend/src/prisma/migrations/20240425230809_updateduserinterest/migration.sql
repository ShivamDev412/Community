/*
  Warnings:

  - A unique constraint covering the columns `[user_id,interest_id]` on the table `UserInterest` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserInterest_interest_id_key";

-- DropIndex
DROP INDEX "UserInterest_user_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserInterest_user_id_interest_id_key" ON "UserInterest"("user_id", "interest_id");
