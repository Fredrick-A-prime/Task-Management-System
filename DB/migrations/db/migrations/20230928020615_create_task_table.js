/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.withSchema('Task').createTable('tasks', (table) => {
        table.increments('id');
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('completed').defaultTo(false);
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.withSchema('Task').dropTable('tasks');
};
