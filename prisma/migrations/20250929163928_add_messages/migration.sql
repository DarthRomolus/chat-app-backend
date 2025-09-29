-- CreateTable
CREATE TABLE "public"."Messages" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "chatID" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);
