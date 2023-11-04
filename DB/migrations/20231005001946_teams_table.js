/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .withSchema('Team')
        .createTable('teams', (table) => {
            table.uuid('uuidColumn').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.string('name').notNullable();
            table.timestamps(true, true);
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .withSchema('Team')
        .dropTable('teams')
};
