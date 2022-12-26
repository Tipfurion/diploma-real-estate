-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "flat" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "maxFloor" INTEGER NOT NULL,
    "geoLat" TEXT NOT NULL,
    "geoLon" TEXT NOT NULL,
    "house" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "pricePeriod" TEXT NOT NULL,
    "rooms" TEXT NOT NULL,
    "square" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
