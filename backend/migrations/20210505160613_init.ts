import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('user', table => {
        table.increments('id').primary();
        table.string('email', 50).notNullable();
        table.string('password', 250).notNullable();
        table.string('name', 60).notNullable();
        table.enu('type', ['ADMIN', 'CUSTOMER', 'PROFESSIONAL', 'COMPANY']).notNullable();
        table.boolean('active').defaultTo(false).notNullable();
        table.dateTime('lastLoginAt').nullable();
        table.dateTime('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.dateTime('updatedAt').defaultTo(knex.fn.now()).notNullable();
    });

    await knex.schema.createTable('user_recover', table => {
        table.increments('id').primary();
        table.integer('userId').notNullable();
        table.string('confirmationCode', 250);
        table.enu('type', ['RECOVER', 'ACTIVATE']).notNullable();
        table.foreign('userId').references('user.id');
        table.dateTime('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.dateTime('updatedAt').defaultTo(knex.fn.now()).notNullable();
    });

    await knex.schema.createTable('work_type', table => {
        table.increments('id').primary();
        table.integer('workTypeId').notNullable();
        table.string('name', 60).notNullable();
        table.dateTime('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.dateTime('updatedAt').defaultTo(knex.fn.now()).notNullable();
        table.foreign('workTypeId').references('work_type.id');
    });

    await knex.schema.createTable('user_work_type', table => {
        table.integer('workTypeId').notNullable();
        table.integer('userId').notNullable();
        table.string('description', 500).notNullable();
        table.dateTime('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.dateTime('updatedAt').defaultTo(knex.fn.now()).notNullable();
        table.foreign('workTypeId').references('work_type.id');
        table.foreign('userId').references('user.id');
        table.primary(['workTypeId', 'userId']);
    });

    await knex.schema.createTable('work_request', table => {
        table.increments('id').primary();
        table.integer('fromUserId').notNullable();
        table.integer('toUserId').notNullable();
        table.string('description', 500).notNullable();
        table.enu('status', ['CREATED', 'DECLINED', 'ACCEPTED', 'CANCELLED', 'IN_PROGRESS', 'COMPLETED']).notNullable();
        table.dateTime('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.dateTime('updatedAt').defaultTo(knex.fn.now()).notNullable();
        table.foreign('fromUserId').references('user.id');
        table.foreign('toUserId').references('user.id');
    });

    await knex.schema.createTable('work_request_discussion', table => {
        table.increments('id').primary();
        table.integer('workRequestId').notNullable();
        table.integer('userId').notNullable();
        table.string('description', 500).notNullable();
        table.dateTime('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.foreign('workRequestId').references('work_request.id');
        table.foreign('userId').references('user.id');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('work_request_discussion');
    await knex.schema.dropTable('work_request');
    await knex.schema.dropTable('user_work_type');
    await knex.schema.dropTable('work_type');
    await knex.schema.dropTable('user_recover');
    await knex.schema.dropTable('user');
}

