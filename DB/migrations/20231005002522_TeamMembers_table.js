/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .withSchema('Team')
        .createTable('team_members', (table) => {
            table.uuid('uuidColumn').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.uuid('user_id').references('uuidColumn').inTable('User.Users');
            table.uuid('team_id').references('uuidColumn').inTable('Team.teams');
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
        .dropTable('team_members')
};
