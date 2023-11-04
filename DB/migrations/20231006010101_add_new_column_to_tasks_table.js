/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .withSchema('Task')
        .table('tasks', (table) => {
            table.uuid('team_id').references('uuidColumn').inTable('Team.teams');
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .withSchema('Task')
        .alterTable('tasks', (table) => {
            table.dropColumn('team_id')
        })
};
