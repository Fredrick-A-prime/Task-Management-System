/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .withSchema('Task')
        .createTable('tasks', (table) => {
            table.uuid('uuidColumn').primary().defaultTo(knex.raw('gen_random_uuid()'));
            table.string('Title').notNullable();
            table.date('Due Date').nullable
            table.enu('Status', ['Not Started', 'In Progress', 'Completed', 'Postponed'], { useNative: true, enumName: 'task_status' }).defaultTo('Not Started');
            table.timestamp('Completed At')
            table.uuid('category_id').references('uuidColumn').inTable('Category.categories')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .deferrable('deferred');
            table.timestamps(true, true);

        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .withSchema('Task')
        .dropTable('tasks')
};
