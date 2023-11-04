/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .withSchema('Task')
        .createTable('assignment_table', (table) => {
            table.uuid('uuidColumn').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.uuid('user_id').references('uuidColumn').inTable('User.Users');
            table.uuid('task_id').references('uuidColumn').inTable('Task.tasks');
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .withSchema('Task')
        .dropTable('assignment_table')
};
