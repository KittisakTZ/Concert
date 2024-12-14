-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL,
    "category_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" UUID NOT NULL,
    "product_name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "category_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_Id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "user_fname" TEXT NOT NULL,
    "user_lname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_Id")
);

-- CreateTable
CREATE TABLE "venues" (
    "venue_Id" UUID NOT NULL,
    "venue_name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "venues_pkey" PRIMARY KEY ("venue_Id")
);

-- CreateTable
CREATE TABLE "concerts" (
    "concert_Id" UUID NOT NULL,
    "concert_name" TEXT NOT NULL,
    "date_time" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "rounds" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "venue_id" UUID NOT NULL,
    "artist_id" UUID NOT NULL,

    CONSTRAINT "concerts_pkey" PRIMARY KEY ("concert_Id")
);

-- CreateTable
CREATE TABLE "artists" (
    "artist_Id" UUID NOT NULL,
    "artist_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "artists_pkey" PRIMARY KEY ("artist_Id")
);

-- CreateTable
CREATE TABLE "payment" (
    "payment_Id" UUID NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "payment_method" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "transaction_ref" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("payment_Id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "bookings_Id" UUID NOT NULL,
    "bookings_date" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "total_amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" UUID NOT NULL,
    "payment_id" UUID NOT NULL,
    "seat_id" UUID NOT NULL,
    "concert_id" UUID NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("bookings_Id")
);

-- CreateTable
CREATE TABLE "seat" (
    "seat_Id" UUID NOT NULL,
    "seat_number" TEXT NOT NULL,
    "zone_name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "capacity" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "concert_id" UUID NOT NULL,

    CONSTRAINT "seat_pkey" PRIMARY KEY ("seat_Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_category_name_key" ON "categories"("category_name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "concerts" ADD CONSTRAINT "concerts_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venues"("venue_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "concerts" ADD CONSTRAINT "concerts_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artists"("artist_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("payment_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "seat"("seat_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_concert_id_fkey" FOREIGN KEY ("concert_id") REFERENCES "concerts"("concert_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seat" ADD CONSTRAINT "seat_concert_id_fkey" FOREIGN KEY ("concert_id") REFERENCES "concerts"("concert_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
