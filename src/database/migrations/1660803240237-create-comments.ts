import type { MigrationInterface, QueryRunner } from 'typeorm';

export class createComments1660803240237 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "comments" (
                "id" SERIAL NOT NULL,
                "todo_id" INT NOT NULL,
                "content" VARCHAR(64) NOT NULL,

                PRIMARY KEY ("id"),
                FOREIGN KEY ("todo_id") REFERENCES "todos"("id")
            )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "comments"');
    }

}
