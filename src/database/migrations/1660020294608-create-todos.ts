import type { MigrationInterface, QueryRunner } from 'typeorm';

export class createTodos1660020294608 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE todos (
                id INT NOT NULL AUTO_INCREMENT,
                user_id INT NOT NULL,
                title VARCHAR(64) NOT NULL,
                content VARCHAR(64) NOT NULL,

                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP NOT NULL,

                PRIMARY KEY (id),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "todos"');
    }

}
