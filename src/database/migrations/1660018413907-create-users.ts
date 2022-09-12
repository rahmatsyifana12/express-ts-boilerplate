import type { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsers1660018413907 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "email" VARCHAR(64) NOT NULL,
                "password" VARCHAR(64) NOT NULL,
                "name" VARCHAR(64) NOT NULL,
                "refresh_token" VARCHAR(255),

                "created_at" TIMESTAMP NOT NULL,
                "updated_at" TIMESTAMP NOT NULL,

                PRIMARY KEY ("id")
            )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "users"');
    }

}
