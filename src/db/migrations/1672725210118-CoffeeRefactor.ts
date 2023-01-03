import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoffeeRefactor1672725210118 implements MigrationInterface {
  name = 'CoffeeRefactor1672725210118';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`,
    );
  }
}
