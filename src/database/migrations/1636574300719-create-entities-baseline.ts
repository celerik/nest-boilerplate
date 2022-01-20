import { MigrationInterface, QueryRunner } from 'typeorm';

export class createEntitiesBaseline1636574300719 implements MigrationInterface {
  name = 'createEntitiesBaseline1636574300719';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "lastname" character varying(150) NOT NULL, "username" character varying(40) NOT NULL, "email" character varying NOT NULL, "phone" character varying, "password" character varying NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "unique_fields_users" UNIQUE ("username", "email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(25) NOT NULL, "description" text NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "name" character varying(25) NOT NULL, "description" text NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles" ("usersId" integer NOT NULL, "rolesId" integer NOT NULL, CONSTRAINT "PK_38ffcfb865fc628fa337d9a0d4f" PRIMARY KEY ("usersId", "rolesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_99b019339f52c63ae615358738" ON "user_roles" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_13380e7efec83468d73fc37938" ON "user_roles" ("rolesId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "role_permissions" ("rolesId" integer NOT NULL, "permissionsId" integer NOT NULL, CONSTRAINT "PK_7931614007a93423204b4b73240" PRIMARY KEY ("rolesId", "permissionsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0cb93c5877d37e954e2aa59e52" ON "role_permissions" ("rolesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d422dabc78ff74a8dab6583da0" ON "role_permissions" ("permissionsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_99b019339f52c63ae6153587380" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_13380e7efec83468d73fc37938e" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_0cb93c5877d37e954e2aa59e52c" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_d422dabc78ff74a8dab6583da02" FOREIGN KEY ("permissionsId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_d422dabc78ff74a8dab6583da02"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_0cb93c5877d37e954e2aa59e52c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_13380e7efec83468d73fc37938e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_99b019339f52c63ae6153587380"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_d422dabc78ff74a8dab6583da0"`);
    await queryRunner.query(`DROP INDEX "IDX_0cb93c5877d37e954e2aa59e52"`);
    await queryRunner.query(`DROP TABLE "role_permissions"`);
    await queryRunner.query(`DROP INDEX "IDX_13380e7efec83468d73fc37938"`);
    await queryRunner.query(`DROP INDEX "IDX_99b019339f52c63ae615358738"`);
    await queryRunner.query(`DROP TABLE "user_roles"`);
    await queryRunner.query(`DROP TABLE "permissions"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
