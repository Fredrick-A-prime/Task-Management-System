/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .withSchema('Profile')
        .createTable('profiles', (table) => {
            table.uuid('uuidColumn').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.uuid('user_id').references('uuidColumn').inTable('User.Users');
            table.string('first_name').notNullable();
            table.string('last_name').notNullable();
            table.binary('profile_picture');
            table.string('profile_picture_mime_type');
            table.timestamps(true, true);
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .withSchema('Profile')
        .dropTable('profiles');
};
