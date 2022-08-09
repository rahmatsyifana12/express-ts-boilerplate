import type { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsers1660018413907 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLES "users" (
            "id" SERIAL NOT NULL,
            "email" VARCHAR(64) NOT NULL,
            "password" VARCHAR(64) NOT NULL,
            "name" VARCHAR(64) NOT NULL,

            PRIMAY KEY ("id")
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "users"');
    }

}
