import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class WhetherHistory1598342890712 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "whether_history",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "city",
            type: "varchar",
            length: "150",
            isNullable: false,
          },
          {
            name: "country",
            type: "varchar",
            length: "150",
            isNullable: true,
          },
          {
            name: "details",
            type: "longtext",
            isNullable: true,
          },
          {
            name: "createdAt",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updatedAt",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(
      new Table({
        name: "whether_history",
      })
    );
  }
}
