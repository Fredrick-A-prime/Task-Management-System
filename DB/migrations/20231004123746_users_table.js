/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .withSchema('User')
        .createTable('Users', (table) => {
            table.uuid('uuidColumn').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.string('username').notNullable().unique();
            table.string('email').notNullable().unique();
            table.string('password').notNullable();
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .withSchema('User')
        .dropTable('Users')
};
