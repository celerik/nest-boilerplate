import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTokensTable1642694588300 implements MigrationInterface {
  name = 'createTokensTable1642694588300';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "token" text NOT NULL, "status" character varying(20) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer, CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" DROP CONSTRAINT "unique_fields_users"`,
    );
    await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "name" character varying(250) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" DROP COLUMN "lastname"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "lastname" character varying(250) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" DROP COLUMN "username"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "username" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD CONSTRAINT "unique_fields_users" UNIQUE ("username", "email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD CONSTRAINT "FK_8769073e38c365f315426554ca5" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tokens" DROP CONSTRAINT "FK_8769073e38c365f315426554ca5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" DROP CONSTRAINT "unique_fields_users"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" DROP COLUMN "username"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "username" character varying(40) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" DROP COLUMN "lastname"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "lastname" character varying(150) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "name" character varying(150) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD CONSTRAINT "unique_fields_users" UNIQUE ("username", "email")`,
    );
    await queryRunner.query(`DROP TABLE "tokens"`);
  }
}
