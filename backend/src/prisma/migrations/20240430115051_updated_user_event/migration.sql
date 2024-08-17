/*
  Warnings:

  - A unique constraint covering the columns `[user_id,event_id]` on the table `UserEvent` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserEvent_event_id_key";

-- DropIndex
DROP INDEX "UserEvent_user_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserEvent_user_id_event_id_key" ON "UserEvent"("user_id", "event_id");
